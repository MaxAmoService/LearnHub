import { describe, expect, it } from "vitest";
import {
  createLocalJWKSet,
  exportJWK,
  generateKeyPair,
  SignJWT,
  type JWK,
} from "jose";
import { getFirebaseIssuer, verifyFirebaseIdToken } from "@/lib/server/idToken";

const PROJECT_ID = "learnhub-eca26";
const ISSUER = getFirebaseIssuer(PROJECT_ID);
const KID = "test-key";

async function buildKeyMaterial() {
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const jwk = (await exportJWK(publicKey)) as JWK;
  jwk.kid = KID;
  jwk.alg = "RS256";
  jwk.use = "sig";
  const getKey = createLocalJWKSet({ keys: [jwk] });
  return { privateKey, getKey };
}

function signToken(
  privateKey: Parameters<SignJWT["sign"]>[0],
  claims: {
    iss?: string;
    aud?: string | string[];
    sub?: string;
    expSeconds?: number;
    alg?: string;
    kid?: string;
  } = {}
) {
  const jwt = new SignJWT({});
  if (claims.iss !== undefined) jwt.setIssuer(claims.iss);
  if (claims.aud !== undefined) jwt.setAudience(claims.aud);
  if (claims.sub !== undefined) jwt.setSubject(claims.sub);
  if (claims.expSeconds !== undefined) jwt.setExpirationTime(claims.expSeconds);
  jwt.setProtectedHeader({
    alg: claims.alg ?? "RS256",
    kid: claims.kid ?? KID,
  });
  return jwt.sign(privateKey);
}

describe("getFirebaseIssuer", () => {
  it("baut den Issuer aus der Project ID", () => {
    expect(getFirebaseIssuer(PROJECT_ID)).toBe(
      `https://securetoken.google.com/${PROJECT_ID}`
    );
  });
});

describe("verifyFirebaseIdToken", () => {
  it("akzeptiert ein gültiges Token und liefert die uid (sub)", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toEqual({ uid: "user-123" });
  });

  it("lehnt einen falschen Issuer ab", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: "https://securetoken.google.com/anderes-projekt",
      aud: PROJECT_ID,
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt eine falsche Audience ab", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: "fremde-app",
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt ein abgelaufenes Token ab", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) - 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("toleriert Clock-Skew bis 300 s (Parität zum Admin-SDK)", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) - 60,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toEqual({ uid: "user-123" });
  });

  it("lehnt ein Token ab, das mit einem fremden Schlüssel signiert wurde", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const other = await generateKeyPair("RS256");
    const token = await signToken(other.privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      sub: "user-123",
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt ein Token ohne sub ab", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt eine zu lange sub ab", async () => {
    const { privateKey, getKey } = await buildKeyMaterial();
    const token = await signToken(privateKey, {
      iss: ISSUER,
      aud: PROJECT_ID,
      sub: "x".repeat(129),
      expSeconds: Math.floor(Date.now() / 1000) + 3600,
    });
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt einen anderen Algorithmus als RS256 ab", async () => {
    const { getKey } = await buildKeyMaterial();
    const secret = new Uint8Array(32);
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256", kid: KID })
      .setIssuer(ISSUER)
      .setAudience(PROJECT_ID)
      .setSubject("user-123")
      .setExpirationTime(Math.floor(Date.now() / 1000) + 3600)
      .sign(secret);
    await expect(
      verifyFirebaseIdToken(token, { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });

  it("lehnt einen ungültigen Token-String ab", async () => {
    const { getKey } = await buildKeyMaterial();
    await expect(
      verifyFirebaseIdToken("nicht.ein.token", { projectId: PROJECT_ID, getKey })
    ).resolves.toBeNull();
  });
});
