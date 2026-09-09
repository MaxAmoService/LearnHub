// ENTWURF — Diese Datenschutzerklärung ersetzt keine rechtliche Beratung.
// Vor Veröffentlichung vom Betreiber zu prüfen:
// - TODO(1): Firestore-Region (eur3/Frankfurt) in der Firebase-Console verifizieren
// - TODO(2): Google-Analytics-Nutzungsbedingungen (enthalten eine Vereinbarung
//   zur Auftragsverarbeitung — ggf. den Wortlaut oben prüfen/anpassen)
// - TODO(3): Umgang mit minderjährigen Nutzern (Art. 8 DSGVO) — bewusste
//   Entscheidung des Betreibers, hier bewusst NICHT vorweggenommen
export default function Datenschutz() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Datenschutzerklärung</h1>

      <div className="space-y-6 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Datenschutz auf einen Blick</h2>
          <h3 className="font-semibold text-white mt-4 mb-2">Allgemeine Hinweise</h3>
          <p className="text-sm">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
            Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
            denen Sie persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Verantwortliche Stelle</h2>
          <p className="text-sm">
            Moritz Knieper<br />
            Schlader Weg 24<br />
            58809 Neuenrade<br />
            E-Mail: learnhub.official.app@gmail.com
          </p>
          <p className="text-sm mt-2">
            Der Betreiber dieser Plattform ist eine Privatperson; ein Datenschutzbeauftragter ist nicht
            bestellt (nicht erforderlich).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Hosting und Server-Log-Dateien</h2>
          <p className="text-sm">
            Die Plattform wird über Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
            bereitgestellt. Vercel verarbeitet beim Abruf der Seiten automatisch Zugriffsdaten in
            sogenannten Server-Log-Dateien: IP-Adresse, Browsertyp und -version, verwendetes
            Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners sowie Uhrzeit der
            Serveranfrage. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
            Verarbeitungszweck ist die technische Bereitstellung und Sicherheit der Plattform
            (Art. 6 Abs. 1 lit. f DSGVO). Vercel ist unter dem EU-US Data Privacy Framework
            zertifiziert.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Firebase (Authentifizierung & Datenspeicherung)</h2>
          <p className="text-sm">
            Wir nutzen Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland)
            für die Registrierung, Anmeldung und Speicherung der Nutzerdaten. Die Datenbank wird in der
            Region eur3 (Frankfurt am Main, Deutschland) gehostet.
          </p>
          <p className="text-sm mt-2">
            Gespeichert werden bei einem Konto:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li><strong>Kontodaten:</strong> E-Mail-Adresse, eindeutige Nutzer-ID (UID), Benutzername, Anzeigename, Avatar-Auswahl, Status der E-Mail-Verifizierung</li>
            <li><strong>Lernfortschritt:</strong> abgeschlossene Module und Lektionen, XP, Level, Streak (Serie aktiver Lerntage), Datum des letzten Lerntags</li>
            <li><strong>Lehrpläne:</strong> angelegte Pläne, deren Plan-Items (inkl. Wiederholungszustand nach SM-2) sowie Tages-Aktivitätsprotokolle und Tagesquiz-Ergebnisse</li>
            <li><strong>Lern-Clicker:</strong> Spielstand, Punkte, Upgrades (nur bei Nutzung des Clickers)</li>
            <li><strong>Aktivitätsstatus:</strong> Solange Sie angemeldet sind und die Seite geöffnet ist, aktualisiert die Plattform etwa alle 20 Sekunden einen Aktivitätsstatus sowie den Zeitpunkt der letzten Aktivität in Ihrem Profil</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Rechtsgrundlage:</strong> Die Verarbeitung der Kontodaten und des Lernfortschritts
            erfolgt zur Erfüllung des Nutzungsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO). Die Verarbeitung
            technischer Daten (z. B. Server-Logs, Aktivitätsstatus) beruht auf unserem berechtigten
            Interesse am sicheren und funktionierenden Betrieb der Plattform (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="text-sm mt-2">
            API-Schlüssel werden ausschließlich als SHA-256-Hash gespeichert; der Klartext wird Ihnen nur
            einmalig bei der Erstellung angezeigt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Feedback-Formular</h2>
          <p className="text-sm">
            Beim freiwilligen Absenden von Feedback zu einer Lektion speichern wir: Nachricht,
            Kategorie (z. B. „Fehler gefunden"), das betroffene Modul und die Lektion sowie —
            falls Sie angemeldet sind — Ihre Nutzer-ID und Ihren Anzeigenamen. Ohne Anmeldung wird das
            Feedback anonym gespeichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO), die Sie durch das Absenden erteilen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Google Analytics</h2>
          <p className="text-sm">
            Diese Website nutzt den Webanalysedienst Google Analytics (Google Ireland Limited, Gordon
            House, Barrow Street, Dublin 4, Irland). <strong>Wichtig:</strong> Das Analytics-Skript wird
            erst geladen, nachdem Sie im Cookie-Banner „Alle akzeptieren" gewählt haben. Vor Ihrer
            Einwilligung findet keinerlei Datenübermittlung an Google statt.
          </p>
          <p className="text-sm mt-2">
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), § 25 Abs. 1
            TTDSG. Die Einwilligung können Sie jederzeit widerrufen — klicken Sie dazu auf
            „Cookie-Einstellungen" im Footer und wählen Sie „Nur notwendige".
          </p>
          <p className="text-sm mt-2">
            Google Analytics 4 speichert nach Angaben von Google keine vollständigen IP-Adressen;
            die IP-Adresse wird vor der Weiterverarbeitung gekürzt. Zusätzlich verwenden wir den Google
            Consent Mode v2 als technische Absicherung der Einwilligungsentscheidung.
          </p>
          <p className="text-sm mt-2">
            <strong>Datenübertragung in die USA:</strong> Die Datenübertragung in die USA erfolgt auf
            Grundlage des EU-US Data Privacy Frameworks (DPF), für das die USA von der EU-Kommission als
            angemessen eingestuft wurden. Google LLC ist unter dem DPF zertifiziert. Weitere Informationen:{" "}
            <a
              href="https://www.dataprivacyframework.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              dataprivacyframework.gov
            </a>
          </p>
          <p className="text-sm mt-2">
            <strong>Widerspruch:</strong> Sie können die Erfassung verhindern, indem Sie im Cookie-Banner
            „Nur notwendige" wählen oder das Browser-Add-on zur Deaktivierung von Google Analytics
            installieren.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Eingebettete Inhalte Dritter</h2>
          <p className="text-sm">
            <strong>YouTube-Videos (datenschutzfreundlicher Modus):</strong> Einige Lektionen betten
            Lernvideos über youtube-nocookie.com ein (erweiterter Datenschutzmodus von YouTube/Google).
            Beim Öffnen einer solchen Lektion wird eine Verbindung zu Servern von Google hergestellt,
            wobei Google Ihre IP-Adresse und ggf. weitere technische Daten erhält.
          </p>
          <p className="text-sm mt-2">
            <strong>Lofi-Radio:</strong> Der Musik-Player streamt einen Internetradiosender über
            play.streamafrica.net. Eine Verbindung zum Streamanbieter wird erst hergestellt, wenn Sie
            den Player einschalten (oder wenn er bei Ihrem letzten Besuch eingeschaltet war).
          </p>
          <p className="text-sm mt-2">
            <strong>Code-Editor (CodeSandbox-Tool):</strong> Das interaktive Code-Tool lädt bei Nutzung
            die Bibliothek Babel von unpkg.com nach.
          </p>
          <p className="text-sm mt-2">
            Diese Einbindungen sind optional; sie erfolgen nur, wenn Sie die jeweilige Funktion
            verwenden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Cookies & lokale Speicherung</h2>
          <p className="text-sm">
            Die Plattform setzt keine eigenen Cookies. Die Anmeldung über Firebase Auth nutzt den
            lokalen Speicher (localStorage/IndexedDB) Ihres Browsers — das ist technisch notwendig,
            damit Sie angemeldet bleiben (§ 25 Abs. 2 Nr. 2 TTDSG). Google Analytics setzt erst nach
            Ihrer Einwilligung Cookies.
          </p>
          <p className="text-sm mt-2">
            Zusätzlich speichert die Plattform rein lokal in Ihrem Browser (diese Daten verlassen Ihr
            Gerät nicht):
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Theme-Einstellung (Hell/Dunkel) und Hintergrund-Auswahl</li>
            <li>Ton-Einstellung und Lautstärke des Musik-Players</li>
            <li>Verlauf des Taschenrechners und Skizzen im Lern-Clicker</li>
            <li>Zwischenstand des Lern-Clickers (zusätzlich zu Firestore als Cache)</li>
            <li>Ansichtsmodus des Skill Trees und Karteikarten-Deck-Status</li>
            <li>Anzeigestatus von Achievements</li>
            <li>Ihre Cookie-Einwilligung sowie ein zeitlicher Schutz gegen Mehrfach-Absenden von Feedback</li>
          </ul>
          <p className="text-sm mt-2">
            Sie können Ihre Cookie-Einstellungen jederzeit ändern — klicken Sie dazu auf
            &quot;Cookie-Einstellungen&quot; im Footer der Website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Ihre Rechte</h2>
          <p className="text-sm">
            Sie haben jederzeit das Recht:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
            <li>Eine erteilte Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO)</li>
            <li>Bei einer Aufsichtsbehörde Beschwerde einzulegen (Art. 77 DSGVO)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Kontakt</h2>
          <p className="text-sm">
            Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:<br />
            E-Mail: learnhub.official.app@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
