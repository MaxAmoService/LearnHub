"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

// --- Types ---

interface EVAInput {
  pv: number;
  ev: number;
  ac: number;
}

interface EVAResult {
  cv: number;
  sv: number;
  cpi: number;
  spi: number;
  eac: number;
  etc: number;
  vac: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  values: EVAInput;
}

// --- Constants ---

const scenarios: Scenario[] = [
  {
    id: "under-budget",
    name: "Unter Budget",
    description: "Projekt läuft gut — weniger ausgegeben als geplant, mehr erreicht",
    icon: <CheckCircle size={18} />,
    values: { pv: 100000, ev: 110000, ac: 90000 },
  },
  {
    id: "over-budget",
    name: "Über Budget",
    description: "Projekt ist teurer als geplant — Kostenkontrolle verloren",
    icon: <AlertTriangle size={18} />,
    values: { pv: 100000, ev: 80000, ac: 120000 },
  },
  {
    id: "ahead-schedule",
    name: "Vor Zeitplan",
    description: "Mehr erreicht als geplant — Team arbeitet effizient",
    icon: <Zap size={18} />,
    values: { pv: 100000, ev: 120000, ac: 110000 },
  },
  {
    id: "behind-schedule",
    name: "Hinter Zeitplan",
    description: "Weniger erreicht als geplant — Verzögerungen im Projekt",
    icon: <Clock size={18} />,
    values: { pv: 100000, ev: 70000, ac: 70000 },
  },
  {
    id: "critical",
    name: "Kritisch",
    description: "Sowohl über Budget als auch hinter dem Zeitplan — Alarmstufe rot",
    icon: <AlertTriangle size={18} />,
    values: { pv: 100000, ev: 60000, ac: 130000 },
  },
  {
    id: "perfect",
    name: "Perfekt",
    description: "Genau im Plan — Budget und Zeitplan exakt eingehalten",
    icon: <Target size={18} />,
    values: { pv: 100000, ev: 100000, ac: 100000 },
  },
];

// --- Helper Functions ---

function calculateEVA(input: EVAInput, budgetAtCompletion: number): EVAResult {
  const { pv, ev, ac } = input;
  const cv = ev - ac;
  const sv = ev - pv;
  const cpi = ac !== 0 ? ev / ac : 0;
  const spi = pv !== 0 ? ev / pv : 0;
  const eac = cpi !== 0 ? budgetAtCompletion / cpi : 0;
  const etc = eac - ac;
  const vac = budgetAtCompletion - eac;
  return { cv, sv, cpi, spi, eac, etc, vac };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusColor(value: number, threshold: number = 0): "green" | "yellow" | "red" {
  if (value > threshold * 0.1) return "green";
  if (value >= -threshold * 0.1) return "yellow";
  return "red";
}

function getRatioStatus(value: number): "green" | "yellow" | "red" {
  if (value >= 1.0) return "green";
  if (value >= 0.9) return "yellow";
  return "red";
}

function getStatusClasses(status: "green" | "yellow" | "red") {
  switch (status) {
    case "green":
      return {
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/50",
        text: "text-emerald-400",
        icon: <TrendingUp size={20} />,
        bar: "bg-emerald-500",
      };
    case "yellow":
      return {
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/50",
        text: "text-yellow-400",
        icon: <AlertTriangle size={20} />,
        bar: "bg-yellow-500",
      };
    case "red":
      return {
        bg: "bg-red-500/20",
        border: "border-red-500/50",
        text: "text-red-400",
        icon: <TrendingDown size={20} />,
        bar: "bg-red-500",
      };
  }
}

// --- Sub-Components ---

function MetricCard({
  label,
  value,
  unit,
  status,
  explanation,
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  status: "green" | "yellow" | "red";
  explanation: string;
  icon: React.ReactNode;
}) {
  const classes = getStatusClasses(status);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className={`rounded-xl border p-4 transition-all ${classes.bg} ${classes.border}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={classes.text}>{icon}</span>
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-gray-500 hover:text-gray-300 transition-colors"
          title="Erklärung anzeigen"
        >
          <Info size={16} />
        </button>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${classes.text}`}>{value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      <div className="flex items-center gap-1 mt-2">
        {classes.icon}
        <span className={`text-sm font-medium ${classes.text}`}>
          {status === "green" ? "Gut" : status === "yellow" ? "Achtung" : "Problem"}
        </span>
      </div>
      {showExplanation && (
        <p className="mt-3 text-sm text-gray-400 leading-relaxed border-t border-gray-700 pt-3">
          {explanation}
        </p>
      )}
    </div>
  );
}

function BarChart({ pv, ev, ac }: { pv: number; ev: number; ac: number }) {
  const max = Math.max(pv, ev, ac, 1);
  const pvWidth = (pv / max) * 100;
  const evWidth = (ev / max) * 100;
  const acWidth = (ac / max) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* PV Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              Geplanter Wert (PV)
            </span>
            <span className="text-sm font-mono text-blue-400">{formatCurrency(pv)}</span>
          </div>
          <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${pvWidth}%` }}
            >
              {pvWidth > 20 && <span className="text-xs font-bold text-white">PV</span>}
            </div>
          </div>
        </div>

        {/* EV Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              Erreichter Wert (EV)
            </span>
            <span className="text-sm font-mono text-emerald-400">{formatCurrency(ev)}</span>
          </div>
          <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${evWidth}%` }}
            >
              {evWidth > 20 && <span className="text-xs font-bold text-white">EV</span>}
            </div>
          </div>
        </div>

        {/* AC Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Tatsächliche Kosten (AC)
            </span>
            <span className="text-sm font-mono text-amber-400">{formatCurrency(ac)}</span>
          </div>
          <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${acWidth}%` }}
            >
              {acWidth > 20 && <span className="text-xs font-bold text-white">AC</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  icon,
  color,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
        <span className={color}>{icon}</span>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
        <input
          type="number"
          min={0}
          step={1000}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="0"
        />
      </div>
    </div>
  );
}

// --- Main Component ---

export default function EVACalculator() {
  const [input, setInput] = useState<EVAInput>({ pv: 100000, ev: 80000, ac: 95000 });
  const [bac, setBac] = useState(200000);
  const [showFormulas, setShowFormulas] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const result = useMemo(() => calculateEVA(input, bac), [input, bac]);

  const handleScenario = (scenario: Scenario) => {
    setInput(scenario.values);
    setActiveScenario(scenario.id);
  };

  const handleReset = () => {
    setInput({ pv: 0, ev: 0, ac: 0 });
    setBac(0);
    setActiveScenario(null);
  };

  const cvStatus = getStatusColor(result.cv, Math.max(input.ac, 1));
  const svStatus = getStatusColor(result.sv, Math.max(input.pv, 1));
  const cpiStatus = getRatioStatus(result.cpi);
  const spiStatus = getRatioStatus(result.spi);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Calculator size={24} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Earned Value Analysis (EVA)</h3>
          <p className="text-sm text-gray-400">
            Projektfortschritt und -kosten messen und steuern
          </p>
        </div>
      </div>

      {/* Scenarios */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          Szenarien laden
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenario(scenario)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                activeScenario === scenario.id
                  ? "bg-blue-500/30 border border-blue-500/50 text-blue-300"
                  : "bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {scenario.icon}
              <span className="truncate">{scenario.name}</span>
            </button>
          ))}
        </div>
        {activeScenario && (
          <p className="mt-3 text-sm text-gray-400">
            {scenarios.find((s) => s.id === activeScenario)?.description}
          </p>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-300">Eingabewerte</h4>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <RotateCcw size={14} />
            Zurücksetzen
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Planned Value (PV)"
            value={input.pv}
            onChange={(v) => setInput({ ...input, pv: v })}
            icon={<Target size={16} />}
            color="text-blue-400"
          />
          <InputField
            label="Earned Value (EV)"
            value={input.ev}
            onChange={(v) => setInput({ ...input, ev: v })}
            icon={<CheckCircle size={16} />}
            color="text-emerald-400"
          />
          <InputField
            label="Actual Cost (AC)"
            value={input.ac}
            onChange={(v) => setInput({ ...input, ac: v })}
            icon={<DollarSign size={16} />}
            color="text-amber-400"
          />
        </div>
        <div className="mt-4">
          <InputField
            label="Budget at Completion (BAC) — Gesamtbudget"
            value={bac}
            onChange={setBac}
            icon={<BarChart3 size={16} />}
            color="text-purple-400"
          />
        </div>
      </div>

      {/* Visual Chart */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-blue-400" />
          Visueller Vergleich
        </h4>
        <BarChart pv={input.pv} ev={input.ev} ac={input.ac} />
      </div>

      {/* Results */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <h4 className="text-sm font-semibold text-gray-300 mb-4">Berechnete Kennzahlen</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard
            label="Kostenabweichung (CV)"
            value={formatCurrency(result.cv)}
            status={cvStatus}
            icon={<DollarSign size={20} />}
            explanation="CV = EV - AC. Zeigt, ob das Projekt über oder unter dem Budget liegt. Ein positiver Wert bedeutet: weniger ausgegeben als geplant (gut!). Ein negativer Wert bedeutet: mehr ausgegeben als geplant (schlecht!)."
          />
          <MetricCard
            label="Terminabweichung (SV)"
            value={formatCurrency(result.sv)}
            status={svStatus}
            icon={<Clock size={20} />}
            explanation="SV = EV - PV. Zeigt, ob das Projekt vor oder hinter dem Zeitplan liegt. Ein positiver Wert bedeutet: mehr erreicht als geplant (gut!). Ein negativer Wert bedeutet: weniger erreicht als geplant (schlecht!)."
          />
          <MetricCard
            label="Kosteneffizienz (CPI)"
            value={result.cpi.toFixed(2)}
            unit="Index"
            status={cpiStatus}
            icon={<TrendingUp size={20} />}
            explanation="CPI = EV / AC. Zeigt, wie effizient das Budget eingesetzt wird. CPI > 1 bedeutet: für jeden Euro bekommt man mehr als einen Euro Wert (gut!). CPI < 1 bedeutet: man bekommt weniger als einen Euro Wert pro Euro (schlecht!)."
          />
          <MetricCard
            label="Termineffizienz (SPI)"
            value={result.spi.toFixed(2)}
            unit="Index"
            status={spiStatus}
            icon={<Zap size={20} />}
            explanation="SPI = EV / PV. Zeigt, ob das Projekt im Zeitplan liegt. SPI > 1 bedeutet: mehr Fortschritt als geplant (gut!). SPI < 1 bedeutet: weniger Fortschritt als geplant (schlecht!)."
          />
        </div>
      </div>

      {/* Forecast */}
      {bac > 0 && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <ArrowRight size={16} className="text-purple-400" />
            Prognose (Forecast)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <p className="text-xs text-gray-400 mb-1">Estimate at Completion (EAC)</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.eac)}</p>
              <p className="text-xs text-gray-500 mt-1">Geschätzte Gesamtkosten am Projektende</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <p className="text-xs text-gray-400 mb-1">Estimate to Complete (ETC)</p>
              <p className="text-xl font-bold text-white">{formatCurrency(result.etc)}</p>
              <p className="text-xs text-gray-500 mt-1">Noch benötigtes Budget bis Projektende</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <p className="text-xs text-gray-400 mb-1">Variance at Completion (VAC)</p>
              <p className={`text-xl font-bold ${result.vac >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {formatCurrency(result.vac)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Erwartete Budgetabweichung am Ende</p>
            </div>
          </div>
        </div>
      )}

      {/* Formulas Reference */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="flex items-center justify-between w-full"
        >
          <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Info size={16} className="text-blue-400" />
            Formeln und Referenz
          </h4>
          {showFormulas ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
        {showFormulas && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  formula: "CV = EV − AC",
                  label: "Cost Variance",
                  desc: "Kostenabweichung (positiv = unter Budget)",
                },
                {
                  formula: "SV = EV − PV",
                  label: "Schedule Variance",
                  desc: "Terminabweichung (positiv = vor Zeitplan)",
                },
                {
                  formula: "CPI = EV / AC",
                  label: "Cost Performance Index",
                  desc: "Kosteneffizienz (> 1 = effizient)",
                },
                {
                  formula: "SPI = EV / PV",
                  label: "Schedule Performance Index",
                  desc: "Termineffizienz (> 1 = im Plan)",
                },
                {
                  formula: "EAC = BAC / CPI",
                  label: "Estimate at Completion",
                  desc: "Prognose der Gesamtkosten",
                },
                {
                  formula: "ETC = EAC − AC",
                  label: "Estimate to Complete",
                  desc: "Noch benötigtes Budget",
                },
              ].map((item, i) => (
                <div key={i} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                  <code className="text-blue-400 font-mono text-sm">{item.formula}</code>
                  <p className="text-sm text-white font-medium mt-1">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
