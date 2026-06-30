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
            Inhaber: Moritz Knieper<br />
            Schlader Weg 24<br />
            58809 Neuenrade<br />
            E-Mail: learnhub.official.app@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Datenerfassung auf dieser Website</h2>

          <h3 className="font-semibold text-white mt-4 mb-2">Server-Log-Dateien</h3>
          <p className="text-sm">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
            Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des
            zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Diese Daten werden nicht
            mit anderen Datenquellen zusammengeführt.
          </p>

          <h3 className="font-semibold text-white mt-4 mb-2">Google Analytics</h3>
          <p className="text-sm">
            Diese Website nutzt den Webanalysedienst Google Analytics. Anbieter ist die Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet sogenannte
            &quot;Cookies&quot;. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website
            werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
            Die Datenübertragung in die USA erfolgt auf Grundlage des EU-US Data Privacy Frameworks.
          </p>
          <p className="text-sm mt-2">
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Nutzung
            von Google Analytics erfolgt nur nach Ihrer ausdrücklichen Zustimmung über unseren
            Cookie-Banner.
          </p>
          <p className="text-sm mt-2">
            <strong>IP-Anonymisierung:</strong> Wir haben auf dieser Website die Funktion
            IP-Anonymisierung aktiviert. Ihre IP-Adresse wird von Google innerhalb von
            Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens
            über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
          </p>
          <p className="text-sm mt-2">
            <strong>Datenübertragung in die USA:</strong> Die Datenübertragung in die USA erfolgt
            auf Grundlage des EU-US Data Privacy Frameworks (DPF), für das die USA von der
            EU-Kommission als angemessen eingestuft wurden. Google LLC ist unter dem DPF zertifiziert.
            Weitere Informationen:{" "}
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
            <strong>Auftragsverarbeitung:</strong> Wir haben mit Google einen Vertrag zur
            Auftragsverarbeitung (AVV) abgeschlossen. Dieser stellt sicher, dass Google die Daten
            unserer Nutzer nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
          </p>
          <p className="text-sm mt-2">
            <strong>Widerspruch:</strong> Sie können die Erfassung Ihrer Daten durch Google Analytics
            verhindern, indem Sie im Cookie-Banner &quot;Nur notwendige&quot; wählen oder das
            Browser-Add-on zur Deaktivierung von Google Analytics installieren.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Firebase & Hosting (Vercel)</h2>
          <p className="text-sm">
            Wir nutzen Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland)
            für Authentifizierung und Datenspeicherung. Firebase speichert folgende Daten:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li><strong>Profil-Daten:</strong> Benutzername, Anzeigename, E-Mail, Avatar, XP, Level, Lernfortschritt</li>
            <li><strong>Feedback:</strong> Nachrichten, Kategorie, Lektions-Kontext (bei Nutzung der Feedback-Funktion)</li>
            <li><strong>Lern-Clicker:</strong> Spielstand, Punkte, Upgrades, Pets, Prestige-Daten</li>
            <li><strong>Online-Status:</strong> Ob du gerade aktiv bist (nur wenn Bestenliste aktiviert)</li>
          </ul>
          <p className="text-sm mt-2">
            Die Firestore-Datenbank wird in der Region <strong>eur3 (Frankfurt)</strong> gehostet.
            Firebase kann dabei bestimmte Geräteinformationen und technische Daten erfassen.
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b und f DSGVO.
          </p>
          <p className="text-sm mt-2">
            <strong>Hosting:</strong> Die Plattform wird über Vercel Inc. (340 S Lemon Ave #4133,
            Walnut, CA 91789, USA) bereitgestellt. Vercel ist unter dem EU-US Data Privacy Framework
            zertifiziert. Vercel verarbeitet Zugriffsdaten (IP-Adressen, User-Agent)
            in Server-Log-Dateien gemäß unseren Weisungen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
          <p className="text-sm">
            Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
            gespeichert werden. Wir unterscheiden zwischen:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li><strong>Notwendige Cookies:</strong> Für Login und Grundfunktionen (immer aktiv)</li>
            <li><strong>Analytics-Cookies:</strong> Google Analytics (nur mit Ihrer Einwilligung)</li>
          </ul>
          <p className="text-sm mt-2">
            Sie können Ihre Cookie-Einstellungen jederzeit ändern — klicken Sie dazu auf
            &quot;Cookie-Einstellungen&quot; im Footer der Website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Lokale Speicherung</h2>
          <p className="text-sm">
            Wir nutzen den lokalen Speicher (localStorage) Ihres Browsers, um Ihren Lernfortschritt,
            Cookie-Einstellungen und Karteikarten-Status zu speichern. Diese Daten verlassen Ihren
            Browser nicht und werden nicht an Dritte übermittelt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Ihre Rechte</h2>
          <p className="text-sm">
            Sie haben jederzeit das Recht:
          </p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
            <li>Bei einer Aufsichtsbehörde Beschwerde einzulegen (Art. 77 DSGVO)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Kontakt</h2>
          <p className="text-sm">
            Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:<br />
            E-Mail: learnhub.official.app@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
