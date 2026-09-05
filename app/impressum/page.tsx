export default function Impressum() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

      <div className="space-y-6 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Angaben gemäß § 5 DDG</h2>
          <p>
            Moritz Knieper<br />
            Schlader Weg 24<br />
            58809 Neuenrade
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Kontakt</h2>
          <p>
            E-Mail: learnhub.official.app@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Moritz Knieper<br />
            Schlader Weg 24<br />
            58809 Neuenrade
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">EU-Streitschlichtung</h2>
          <p className="text-sm text-slate-400">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br /><br />
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Haftung für Inhalte</h2>
          <p className="text-sm text-slate-400">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Haftung für Links</h2>
          <p className="text-sm text-slate-400">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Urheberrecht</h2>
          <p className="text-sm text-slate-400">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>
      </div>
    </div>
  );
}
