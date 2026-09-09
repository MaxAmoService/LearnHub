"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-7GQD24BRCR";
const CONSENT_KEY = "learnhub-cookie-consent";
const CONSENT_EVENT = "learnhub-consent-updated";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Lädt Google Analytics erst NACH erteilter Einwilligung ("all").
 * Vor der Einwilligung wird kein einziger Request an Google geschickt
 * (kein gtag-Script, keine cookieless Pings) — DSGVO/TTDSG-konform,
 * entspricht dem Text der Datenschutzerklärung.
 */
function loadGtag() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga-gtag-script")) return;

  const s = document.createElement("script");
  s.id = "ga-gtag-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  // Consent Mode v2 als Baseline — Consent liegt hier bereits vor ("all").
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function GoogleAnalytics() {
  useEffect(() => {
    const hasConsent = () => {
      try {
        return localStorage.getItem(CONSENT_KEY) === "all";
      } catch {
        return false;
      }
    };

    if (hasConsent()) loadGtag();

    const onConsentChange = () => {
      if (hasConsent()) loadGtag();
    };
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  return null;
}
