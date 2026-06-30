"use client";

import { useState, useEffect, useMemo } from "react";

// ============================================================================
// Phishing Detector — E-Mails analysieren und Phishing erkennen
// ============================================================================

interface Email {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  redFlags: string[];
  explanation: string;
}

const emails: Email[] = [
  {
    id: 1,
    from: "service@sparkasse-de.com",
    to: "max@firma.de",
    subject: "⚠️ Ihr Konto wurde gesperrt!",
    body: `Sehr geehrter Kunde,

Ihr Konto wurde aufgrund verdächtiger Aktivitäten temporär gesperrt. 
Bitte bestätigen Sie Ihre Identität umgehend, um eine dauerhafte Sperrung zu vermeiden.

Klicken Sie hier: http://sparkasse-konto-verifizierung.de/login

Mit freundlichen Grüßen,
Ihr Sparkasse Sicherheitsteam`,
    isPhishing: true,
    redFlags: [
      "Falsche Domain: sparkasse-de.com statt sparkasse.de",
      "Dringende Handlungsaufforderung (Angstmacherei)",
      "Link führt zu fremder Domain (sparkasse-konto-verifizierung.de)",
      "Generische Anrede ('Sehr geehrter Kunde') statt Name",
      "HTTP statt HTTPS im Link",
    ],
    explanation: "Die Sparkasse würde niemals per E-Mail zur Eingabe von Zugangsdaten auffordieren. Die Domain 'sparkasse-de.com' ist gefälscht — das Original ist 'sparkasse.de'.",
  },
  {
    id: 2,
    from: "h.mueller@firma.de",
    to: "max@firma.de",
    subject: "Meeting morgen 10 Uhr",
    body: `Hi Max,

kurze Info: Das Meeting findet morgen um 10 Uhr statt, nicht um 14 Uhr wie ursprünglich geplant.

Raum 3.02, Agenda siehe Anhang.

Bis morgen!
Hans`,
    isPhishing: false,
    redFlags: [],
    explanation: "Legitime interne E-Mail: Bekannter Absender aus der eigenen Domäne, natürlicher Schreibstil, keine verdächtigen Links oder Aufforderungen.",
  },
  {
    id: 3,
    from: "support@amaz0n-kundenservice.de",
    to: "max@firma.de",
    subject: "Ihre Bestellung #38291 — Problem mit der Bezahlung",
    body: `Sehr geehrter Kunde,

wir konnten Ihre letzte Bestellung (Nr. #38291) nicht bearbeiten, da Ihre Zahlungsdaten nicht verifiziert werden konnten.

Bitte aktualisieren Sie Ihre Daten innerhalb von 24 Stunden:
https://amazon-zahlung-verifizieren.com/update

Andernfalls wird Ihr Account gesperrt.

Amazon Kundenservice`,
    isPhishing: true,
    redFlags: [
      "Domain 'amaz0n-kundenservice.de' — Zahl 0 statt Buchstabe O",
      "Gefälschte Bestellnummer erzeugt Dringlichkeit",
      "Fremde URL 'amazon-zahlung-verifizieren.com'",
      "24-Stunden-Frist erzeugt Zeitdruck",
      "Generische Anrede, keine persönliche Ansprache",
    ],
    explanation: "Amazon nutzt die Domain 'amazon.de' — nicht 'amaz0n-kundenservice.de'. Die Zahl 0 statt O ist ein klassischer Tipptrick. Amazon würde nie per E-Mail zur Eingabe von Zahlungsdaten auffordern.",
  },
  {
    id: 4,
    from: "l.schmidt@lieferant-gmbh.de",
    to: "max@firma.de",
    subject: "Rechnung 2024-0847 — Zahlungserinnerung",
    body: `Guten Tag,

anbei die Rechnung 2024-0847 über 2.340,00 €. 
Die Zahlungsfrist ist der 15.05.2024.

Bankverbindung: IBAN DE89 3704 0044 0532 0130 00

Bei Fragen stehe ich gerne zur Verfügung.

Liebe Grüße
Lisa Schmidt
Lieferant GmbH`,
    isPhishing: false,
    redFlags: [],
    explanation: "Legitime E-Mail von bekanntem Geschäftspartner. Natürlicher Schreibstil, konkrete Rechnungsnummer, vertraute IBAN. Keine verdächtigen Links oder Aufforderungen.",
  },
  {
    id: 5,
    from: "ceo@firm4-de.com",
    to: "max@firma.de",
    subject: "DRINGEND: Überweisung benötigt",
    body: `Hallo Max,

ich bin gerade in einer wichtigen Besprechung und kann nicht ans Telefon. 
Ich brauche dringend eine Überweisung auf folgendes Konto:

IBAN: FR76 3000 6000 0112 3456 7890 189
Betrag: 15.000,00 €
Verwendungszweck: Dringender Projektkauf

Bitte SOFORT erledigen und mir per E-Mail bestätigen!
Danke!

Geschäftsführer`,
    isPhishing: true,
    redFlags: [
      "CEO-Fraud / Business Email Compromise (BEC)",
      "Domain 'firm4-de.com' statt 'firma.de'",
      "Dringende Überweisung ohne offiziellen Prozess",
      "Fremde IBAN (FR = Frankreich, nicht Deutschland)",
      "'Kann nicht ans Telefon' — verhindert Rückfrage",
      "SOFORT in Großbuchstaben — Druck erzeugen",
    ],
    explanation: "Das ist ein CEO-Fraud: Der Geschäftsführer wird impersoniert, um eine Überweisung zu erpressen. Echte Geschäftsführer verlangen nie per E-Mail dringende Überweisungen ohne offizielle Freigabe.",
  },
  {
    id: 6,
    from: "noreply@github.com",
    to: "max@firma.de",
    subject: "[GitHub] A new sign-in to your account",
    body: `A new sign-in to your GitHub account was detected.

Device: Chrome on Windows
Location: Berlin, Germany
Time: May 27, 2024, 10:42 AM UTC

If this was you, no further action is required.
If you didn't sign in, please secure your account immediately:
https://github.com/settings/security

GitHub Security`,
    isPhishing: false,
    redFlags: [],
    explanation: "Legitime GitHub-Benachrichtigung: Korrekte Domain (github.com), sachlicher Ton, Link führt zur echten GitHub-Settings-Seite. Keine Aufforderung zur Eingabe von Passwörtern in der E-Mail selbst.",
  },
  {
    id: 7,
    from: "gewinn@lotterie-gewinn24.de",
    to: "max@firma.de",
    subject: "🎉 HERZLICHEN GLÜCKWUNSCH! Sie haben 500.000€ gewonnen!",
    body: `HERZLICHEN GLÜCKWUNSCH!!!

Sie sind als glücklicher Gewinner der INTERNATIONALEN LOTTERIE 2024 ausgewählt worden!

Gewinnsumme: 500.000,00 € (Fünfhunderttausend Euro)

Um Ihren Gewinn zu erhalten, senden Sie bitte folgende Daten:
- Vollständiger Name
- Adresse
- Telefonnummer
- Kopie des Personalausweises

Antworten Sie auf diese E-Mail!

Ihr Lotterie-Team`,
    isPhishing: true,
    redFlags: [
      "Sie haben nie an einer Lotterie teilgenommen",
      "Absurde Gewinnsumme — Lockmittel",
      "Aufforderung zur Preisgabe persönlicher Daten",
      "Personalausweis-Kopie anfordern → Identitätsdiebstahl",
      "Viele Ausrufezeichen und Großbuchstaben",
      "Unbekannte Domäne 'lotterie-gewinn24.de'",
    ],
    explanation: "Klassischer Gewinnbetrug (Lottery Scam). Man kann nicht an einer Lotterie gewinnen, an der man nie teilgenommen hat. Die angeforderten Daten werden für Identitätsdiebstahl verwendet.",
  },
  {
    id: 8,
    from: "m.wagner@steuerberatung-wagner.de",
    to: "max@firma.de",
    subject: "Steuerbescheid 2023 — Änderung",
    body: `Sehr geehrter Herr Max,

der Steuerbescheid für 2023 wurde geändert. Sie erhalten eine Erstattung von 847,50 €.

Bitte überprüfen Sie die Details im Anhang.

Mit freundlichen Grüßen
Maria Wagner
Steuerberatung Wagner`,
    isPhishing: false,
    redFlags: [],
    explanation: "Legitime E-Mail von Steuerberaterin: Bekannter Absender, realistischer Betrag, sachlicher Ton. Keine verdächtigen Links oder dringenden Aufforderungen.",
  },
  {
    id: 9,
    from: "security@paypal-support.com",
    to: "max@firma.de",
    subject: "Unusual activity detected on your PayPal account",
    body: `Dear Customer,

We detected unusual activity on your PayPal account. Someone tried to access your account from an unrecognized device.

For your protection, we have temporarily limited your account.

Please verify your identity by clicking the link below:
http://paypal-verification.secure-login.xyz/verify

If you don't verify within 12 hours, your account will be permanently suspended.

PayPal Security Team`,
    isPhishing: true,
    redFlags: [
      "Domain 'paypal-support.com' statt 'paypal.com'",
      "Englische E-Mail an deutschen Nutzer",
      "Link führt zu 'secure-login.xyz' — fremde Domain",
      "12-Stunden-Deadline erzeugt Zeitdruck",
      "Drohung mit Kontosperrung",
      "Generische Anrede 'Dear Customer'",
    ],
    explanation: "Gefälschte PayPal-E-Mail: Die Domain ist nicht paypal.com. PayPal würde nie zu einer externen 'Verifizierungsseite' verlinken. Echte Sicherheitshinweise kommen in der App oder auf paypal.com.",
  },
  {
    id: 10,
    from: "it-abteilung@firma.de",
    to: "max@firma.de",
    subject: "Passwort-Reset erforderlich — System-Update",
    body: `Liebe Mitarbeiter,

wir führen am Wochenende ein System-Update durch. 
Bitte setzen Sie Ihr Passwort über folgenden Link zurück:

https://passwort-reset.firma.de

Bei Fragen wenden Sie sich an die IT-Hotmail: it@firma.de

IT-Abteilung`,
    isPhishing: true,
    redFlags: [
      "IT-Abteilung fragt nie per E-Mail nach Passwort-Reset über einen Link",
      "'IT-Hotmail' statt 'IT-Hotline' — Tippfehler deuten auf Betrug hin",
      "Kein konkreter Ansprechpartner genannt",
      "Passwort-Reset sollte über offizielles IT-Portal laufen",
      "Auch wenn Domain 'firma.de' korrekt ist — Link könnte führen",
    ],
    explanation: "Auch intern kann Phishing auftreten (Spear Phishing). Die IT würde nie per E-Mail-Link zum Passwort-Reset auffordern. Im Zweifel: IT persönlich oder telefonisch kontaktieren!",
  },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const phishingQuiz: QuizQuestion[] = [
  {
    question: "Welches ist KEIN typisches Zeichen fuer Phishing?",
    options: [
      "Dringende Handlungsaufforderung mit Frist",
      "Persoenliche Anrede mit vollem Namen",
      "Verdaechtige Absender-Domaene",
      "Aufforderung zur Eingabe von Passwoertern per Link",
    ],
    correctIndex: 1,
    explanation: "Phishing nutzt fast immer generische Anreden wie 'Sehr geehrter Kunde'. Eine persoenliche Anrede mit vollem Namen ist eher ein Zeichen fuer eine legitime E-Mail.",
  },
  {
    question: "Welche URL ist am meisten verdächtig?",
    options: [
      "https://www.amazon.de/gp/css/order-history",
      "http://amazon-zahlung-verifizieren.com/update",
      "https://github.com/settings/security",
      "https://www.sparkasse.de/login",
    ],
    correctIndex: 1,
    explanation: "Die URL 'amazon-zahlung-verifizieren.com' ist eine fremde Domain, die nur so tut als waere sie Amazon. Echte Amazon-Seiten nutzen immer 'amazon.de'. Ausserdem fehlt HTTPS.",
  },
  {
    question: "Was sollte man tun, wenn man eine verdächtige E-Mail von der 'IT-Abteilung' erhaelt?",
    options: [
      "Sofort den Link anklicken, bevor das Konto gesperrt wird",
      "Die E-Mail an alle Kolunden weiterleiten",
      "Die IT-Abteilung direkt anrufen oder persoenlich ansprechen",
      "Die E-Mail einfach loeschen und ignorieren",
    ],
    correctIndex: 2,
    explanation: "Im Zweifel immer den Absender ueber einen anderen Kanal kontaktieren (telefonisch, persoenlich). Niemals auf Links in verdächtigen E-Mails klicken!",
  },
  {
    question: "Was ist CEO-Fraud / Business Email Compromise (BEC)?",
    options: [
      "Ein Virus, der den CEO-Computer sperrt",
      "Ein Angriff, bei dem der Geschäftsführer impersoniert wird, um Geld zu erpressen",
      "Eine Methode, um CEO-Passwoerter zu knacken",
      "Ein Phishing-Angriff auf CEOs per SMS",
    ],
    correctIndex: 1,
    explanation: "Beim CEO-Fraud geben sich Angreifer als Geschäftsführer aus und fordern per E-Mail dringende Überweisungen an. Echte Geschäftsführer verlangen nie ohne offiziellen Prozess Geld.",
  },
  {
    question: "Welche Massnahme schuetzt am besten vor Phishing?",
    options: [
      "Alle E-Mails automatisch oeffnen",
      "Passwoerter regelmaessig per E-Mail versenden",
      "Links pruefen (Maus drueberhalten), Absender verifizieren, keine Passwoerter per E-Mail eingeben",
      "Nur E-Mails von unbekannten Absendern oeffnen",
    ],
    correctIndex: 2,
    explanation: "Die Kombination aus Link-Pruefung, Absender-Verifizierung und dem Grundsatz, niemals Passwoerter per E-Mail einzugeben, ist der beste Schutz gegen Phishing.",
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PhishingDetector() {
  const [shuffledEmails, setShuffledEmails] = useState<Email[]>(() => shuffleArray(emails));
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizShowExplanation, setQuizShowExplanation] = useState(false);

  const currentEmail = shuffledEmails[currentEmailIndex];
  const answered = answers[currentEmail.id] !== undefined;
  const correct = answers[currentEmail.id] === currentEmail.isPhishing;

  const handleAnswer = (isPhishing: boolean) => {
    setAnswers((prev) => ({ ...prev, [currentEmail.id]: isPhishing }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentEmailIndex < shuffledEmails.length - 1) {
      setCurrentEmailIndex((i) => i + 1);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const handleRestart = () => {
    setShuffledEmails(shuffleArray(emails));
    setCurrentEmailIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setGameComplete(false);
    setQuizStarted(false);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizShowExplanation(false);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [quizIndex]: optionIndex }));
    setQuizShowExplanation(true);
  };

  const handleQuizNext = () => {
    if (quizIndex < phishingQuiz.length - 1) {
      setQuizIndex((i) => i + 1);
      setQuizShowExplanation(false);
    }
  };

  const quizScore = Object.entries(quizAnswers).filter(
    ([idx, ans]) => ans === phishingQuiz[Number(idx)].correctIndex
  ).length;

  const score = Object.entries(answers).filter(
    ([id, answer]) => answer === shuffledEmails.find((e) => e.id === Number(id))?.isPhishing
  ).length;

  const phishingSigns = [
    "🔍 Absender-Domain prüfen (sparkasse.de vs. sparkasse-de.com)",
    "🔗 Links prüfen — Maus drüberhalten ohne zu klicken!",
    "⏰ Dringlichkeit/Fristen sind ein Warnsignal",
    "👤 Generische Anrede ('Sehr geehrter Kunde') statt Name",
    "📝 Rechtschreibfehler und seltsame Formulierungen",
    "💰 Geld/Preise/Gewinne → fast immer Betrug",
    "🔑 Niemals Passwörter oder PINs per E-Mail eingeben",
    "📞 Im Zweifel: Absender direkt anrufen!",
  ];

  if (gameComplete) {
    return (
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">🎣 Phishing Detector — Ergebnis</h3>
        <div className="text-center py-6">
          <div className="text-6xl mb-4">
            {score >= 9 ? "🏆" : score >= 7 ? "🥈" : score >= 5 ? "🥉" : "📚"}
          </div>
          <p className="text-white text-2xl font-bold mb-2">{score} / {shuffledEmails.length} richtig erkannt</p>
          <p className="text-slate-400 text-sm mb-6">
            {score >= 9 ? "Ausgezeichnet! Du bist ein Phishing-Experte!" :
             score >= 7 ? "Gut gemacht! Achte auf die roten Flaggen." :
             score >= 5 ? "Nicht schlecht — übe weiter mit den Erklärungen!" :
             "Phishing ist tückisch — lies dir die Erklärungen genau durch!"}
          </p>

          {/* Review */}
          <div className="text-left space-y-2 mb-6">
            {shuffledEmails.map((email) => {
              const wasCorrect = answers[email.id] === email.isPhishing;
              return (
                <div key={email.id} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                  wasCorrect ? "bg-green-900/20 border border-green-800/30" : "bg-red-900/20 border border-red-800/30"
                }`}>
                  <span>{wasCorrect ? "✅" : "❌"}</span>
                  <span className="text-slate-300 flex-1 truncate">{email.subject}</span>
                  <span className={`font-mono text-xs ${email.isPhishing ? "text-red-400" : "text-green-400"}`}>
                    {email.isPhishing ? "Phishing" : "Legitim"}
                  </span>
                </div>
              );
            })}
          </div>

          <button onClick={handleRestart} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium">
            🔄 Nochmal spielen
          </button>
        </div>

        {/* Quiz Section */}
        <div className="mt-4 bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
            🧠 Phishing-Wissenstest
          </h4>

          {!quizStarted ? (
            <div className="text-center py-4">
              <p className="text-slate-300 text-sm mb-3">
                Teste jetzt dein Phishing-Wissen mit {phishingQuiz.length} Fragen!
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Quiz starten
              </button>
            </div>
          ) : (
            <div>
              {/* Quiz Progress */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-slate-400 text-xs">Frage {quizIndex + 1} / {phishingQuiz.length}</span>
                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${((quizIndex + 1) / phishingQuiz.length) * 100}%` }}
                  />
                </div>
                <span className="text-green-400 text-xs font-bold">{quizScore} ✓</span>
              </div>

              {/* Question */}
              <p className="text-white text-sm font-medium mb-3">
                {phishingQuiz[quizIndex].question}
              </p>

              {/* Options */}
              <div className="space-y-2 mb-3">
                {phishingQuiz[quizIndex].options.map((opt, i) => {
                  const selected = quizAnswers[quizIndex] === i;
                  const isCorrect = i === phishingQuiz[quizIndex].correctIndex;
                  const answered = quizAnswers[quizIndex] !== undefined;

                  let optionClasses = "border-gray-600 hover:border-blue-500 hover:bg-blue-900/20";
                  if (answered) {
                    if (isCorrect) {
                      optionClasses = "border-green-500 bg-green-900/30 text-green-300";
                    } else if (selected && !isCorrect) {
                      optionClasses = "border-red-500 bg-red-900/30 text-red-300";
                    } else {
                      optionClasses = "border-gray-700 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !answered && handleQuizAnswer(i)}
                      disabled={answered}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${optionClasses}`}
                    >
                      <span className="font-mono text-xs text-slate-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {quizShowExplanation && (
                <div className={`rounded-lg p-3 mb-3 ${
                  quizAnswers[quizIndex] === phishingQuiz[quizIndex].correctIndex
                    ? "bg-green-900/30 border border-green-700"
                    : "bg-red-900/30 border border-red-700"
                }`}>
                  <p className={`text-sm font-bold mb-1 ${
                    quizAnswers[quizIndex] === phishingQuiz[quizIndex].correctIndex
                      ? "text-green-400"
                      : "text-red-400"
                  }`}>
                    {quizAnswers[quizIndex] === phishingQuiz[quizIndex].correctIndex
                      ? "✅ Richtig!"
                      : "❌ Falsch!"}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {phishingQuiz[quizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next / Result */}
              {quizShowExplanation && (
                quizIndex < phishingQuiz.length - 1 ? (
                  <button
                    onClick={handleQuizNext}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                  >
                    Naechste Frage →
                  </button>
                ) : (
                  <div className="text-center py-2">
                    <p className="text-white font-bold text-lg mb-1">
                      {quizScore} / {phishingQuiz.length} richtig!
                    </p>
                    <p className="text-slate-400 text-xs">
                      {quizScore === phishingQuiz.length
                        ? "Perfekt! Du bist ein Phishing-Experte!"
                        : quizScore >= 3
                        ? "Gut gemacht! Du erkennst die meisten Phishing-Versuche."
                        : "Uebung macht den Meister — lies dir die Erklaerungen durch!"}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Phishing Signs */}
        <div className="mt-4 bg-orange-900/20 border border-orange-800/30 rounded-lg p-3">
          <h4 className="text-orange-400 font-semibold text-sm mb-2">📋 Merkliste: Phishing erkennen</h4>
          <ul className="space-y-1">
            {phishingSigns.map((sign, i) => (
              <li key={i} className="text-slate-300 text-xs">{sign}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🎣 Phishing Detector</h3>
      <p className="text-slate-300 text-sm mb-4">
        Analysiere E-Mails und entscheide: Ist es Phishing oder legitim?
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-slate-400 text-xs">E-Mail {currentEmailIndex + 1} / {shuffledEmails.length}</span>
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${((currentEmailIndex + 1) / shuffledEmails.length) * 100}%` }} />
        </div>
        <span className="text-green-400 text-xs font-bold">{score} ✓</span>
      </div>

      {/* Email Display */}
      <div className="bg-slate-900 rounded-lg border border-slate-700 mb-4">
        {/* Header */}
        <div className="p-3 border-b border-slate-700 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs w-12">Von:</span>
            <span className="text-white text-sm font-mono">{currentEmail.from}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs w-12">An:</span>
            <span className="text-slate-300 text-sm font-mono">{currentEmail.to}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs w-12">Betreff:</span>
            <span className="text-white text-sm font-semibold">{currentEmail.subject}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3">
          <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
            {currentEmail.body}
          </pre>
        </div>
      </div>

      {/* Answer Buttons */}
      {!answered ? (
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all"
          >
            🚨 Phishing!
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-all"
          >
            ✅ Legitim
          </button>
        </div>
      ) : (
        <div className={`rounded-lg p-3 mb-4 ${
          correct ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"
        }`}>
          <p className={`font-bold text-sm mb-2 ${correct ? "text-green-400" : "text-red-400"}`}>
            {correct ? "✅ Richtig!" : "❌ Falsch!"} — Diese E-Mail ist {currentEmail.isPhishing ? "PHISHING" : "LEGITIM"}.
          </p>
          <p className="text-slate-300 text-sm mb-3">{currentEmail.explanation}</p>

          {currentEmail.redFlags.length > 0 && (
            <div>
              <h5 className="text-red-400 text-xs font-semibold mb-1">🚩 Rote Flaggen:</h5>
              <ul className="space-y-1">
                {currentEmail.redFlags.map((flag, i) => (
                  <li key={i} className="text-red-300 text-xs flex items-start gap-2">
                    <span className="text-red-500 shrink-0">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleNext}
            className="mt-3 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
          >
            {currentEmailIndex < shuffledEmails.length - 1 ? "Nächste E-Mail →" : "Ergebnis anzeigen →"}
          </button>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-orange-900/20 border border-orange-800/30 rounded-lg p-3">
        <p className="text-orange-300 text-xs">
          💡 <strong>Tipp:</strong> Prüfe immer: Absender-Domain, Links (Maus drüberhalten!), Dringlichkeit, Anrede, Rechtschreibung. Im Zweifel: Absender direkt kontaktieren!
        </p>
      </div>
    </div>
  );
}
