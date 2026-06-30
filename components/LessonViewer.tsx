"use client";

import { Lesson } from "@/lib/data";
import { LessonVisual } from "@/lib/types";
import { CheckCircle2, ChevronRight, Home } from "lucide-react";
import InlineExercise from "./InlineExercise";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { GuidedExercise } from "./GuidedExercise";
import { PracticeExercises } from "./PracticeExercises";
import {
  Triangle, Circle, Rectangle, Square, Trapezoid, Parallelogram,
  Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid
} from "./visuals/GeometryShapes";
import { CoordinateSystem2D, CoordinateSystem3D } from "./visuals/CoordinateSystem";
import { FunctionGraph } from "./visuals/FunctionGraph";
import { UnitCircle } from "./visuals/UnitCircle";
import { PAPSymbolOverview, PAPExample } from "./visuals/PAPDiagram";
import { StrukExample } from "./visuals/StrukExamples";
import ScrumCycle from "./visuals/ScrumCycle";
import WaterfallModel from "./visuals/WaterfallModel";
import VModel from "./visuals/VModel";
import LayerArchitecture from "./visuals/LayerArchitecture";
import TestPyramid from "./visuals/TestPyramid";
import GitflowDiagram from "./visuals/GitflowDiagram";
import DockerWorkflow from "./visuals/DockerWorkflow";
import { LessonFeedback } from "./LessonFeedback";
import { lazyInteractive } from "./LazyInteractive";

const FunctionExplorer = lazyInteractive(() => import("./interactive/FunctionExplorer").then(m => ({ default: m.FunctionExplorer })));
const TangentExplorer = lazyInteractive(() => import("./interactive/TangentExplorer").then(m => ({ default: m.TangentExplorer })));
const IntegralExplorer = lazyInteractive(() => import("./interactive/IntegralExplorer").then(m => ({ default: m.IntegralExplorer })));
const UnitCircleInteractive = lazyInteractive(() => import("./interactive/UnitCircleInteractive").then(m => ({ default: m.UnitCircleInteractive })));
const VectorExplorer = lazyInteractive(() => import("./interactive/VectorExplorer").then(m => ({ default: m.VectorExplorer })));
const CodeSandbox = lazyInteractive(() => import("./interactive/CodeSandbox").then(m => ({ default: m.CodeSandbox })));
const PAPBuilder = lazyInteractive(() => import("./interactive/PAPBuilder").then(m => ({ default: m.PAPBuilder })));
const PseudocodeRunner = lazyInteractive(() => import("./interactive/PseudocodeRunner").then(m => ({ default: m.PseudocodeRunner })));
const StruktogrammBuilder = lazyInteractive(() => import("./interactive/StruktogrammBuilder").then(m => ({ default: m.StruktogrammBuilder })));
const SortVisualizer = lazyInteractive(() => import("./interactive/SortVisualizer").then(m => ({ default: m.SortVisualizer })));
const SearchVisualizer = lazyInteractive(() => import("./interactive/SearchVisualizer").then(m => ({ default: m.SearchVisualizer })));
const EPKBuilder = lazyInteractive(() => import("./interactive/EPKBuilder").then(m => ({ default: m.EPKBuilder })));
const UMLClassDiagram = lazyInteractive(() => import("./interactive/UMLClassDiagram").then(m => ({ default: m.UMLClassDiagram })));
const SequenceDiagram = lazyInteractive(() => import("./interactive/SequenceDiagram").then(m => ({ default: m.SequenceDiagram })));
const NetzplanBuilder = lazyInteractive(() => import("./interactive/NetzplanBuilder").then(m => ({ default: m.NetzplanBuilder })));
const NetworkBuilder = lazyInteractive(() => import("./interactive/NetworkBuilder").then(m => ({ default: m.NetworkBuilder })));
const SubnetCalculator = lazyInteractive(() => import("./interactive/SubnetCalculator").then(m => ({ default: m.SubnetCalculator })));
const OSIExplorer = lazyInteractive(() => import("./interactive/OSIExplorer").then(m => ({ default: m.OSIExplorer })));
const ProtocolAnalyzer = lazyInteractive(() => import("./interactive/ProtocolAnalyzer").then(m => ({ default: m.ProtocolAnalyzer })));
const MACConverter = lazyInteractive(() => import("./interactive/MACConverter").then(m => ({ default: m.MACConverter })));
const OSICapsuleViewer = lazyInteractive(() => import("./interactive/OSICapsuleViewer").then(m => ({ default: m.OSICapsuleViewer })));
const TCPHandshakeSimulator = lazyInteractive(() => import("./interactive/TCPHandshakeSimulator").then(m => ({ default: m.TCPHandshakeSimulator })));
const DHCPExplorer = lazyInteractive(() => import("./interactive/DHCPExplorer").then(m => ({ default: m.DHCPExplorer })));
const DNSLookup = lazyInteractive(() => import("./interactive/DNSLookup").then(m => ({ default: m.DNSLookup })));
const FirewallRuleBuilder = lazyInteractive(() => import("./interactive/FirewallRuleBuilder").then(m => ({ default: m.FirewallRuleBuilder })));
const WLANConfigurator = lazyInteractive(() => import("./interactive/WLANConfigurator").then(m => ({ default: m.WLANConfigurator })));
const CableComparer = lazyInteractive(() => import("./interactive/CableComparer").then(m => ({ default: m.CableComparer })));
const MailJourney = lazyInteractive(() => import("./interactive/MailJourney").then(m => ({ default: m.MailJourney })));
const HTTPRequestVisualizer = lazyInteractive(() => import("./interactive/HTTPRequestVisualizer").then(m => ({ default: m.HTTPRequestVisualizer })));
const EncryptionDemo = lazyInteractive(() => import("./interactive/EncryptionDemo").then(m => ({ default: m.EncryptionDemo })));
const VPNTunnelVisualizer = lazyInteractive(() => import("./interactive/VPNTunnelVisualizer").then(m => ({ default: m.VPNTunnelVisualizer })));
const SubnettingTrainer = lazyInteractive(() => import("./interactive/SubnettingTrainer").then(m => ({ default: m.SubnettingTrainer })));
const RelationalModelExplorer = lazyInteractive(() => import("./interactive/RelationalModelExplorer").then(m => ({ default: m.RelationalModelExplorer })));
const ERDiagramBuilder = lazyInteractive(() => import("./interactive/ERDiagramBuilder").then(m => ({ default: m.ERDiagramBuilder })));
const NormalisationTrainer = lazyInteractive(() => import("./interactive/NormalisationTrainer").then(m => ({ default: m.NormalisationTrainer })));
const SQLPlayground = lazyInteractive(() => import("./interactive/SQLPlayground").then(m => ({ default: m.SQLPlayground })));
const JoinVisualizer = lazyInteractive(() => import("./interactive/JoinVisualizer").then(m => ({ default: m.JoinVisualizer })));
const DBPlanningPhases = lazyInteractive(() => import("./interactive/DBPlanningPhases").then(m => ({ default: m.DBPlanningPhases })));
const ComplexPlaneViewer = lazyInteractive(() => import("./interactive/ComplexPlaneViewer").then(m => ({ default: m.ComplexPlaneViewer })));
const ComplexFormConverter = lazyInteractive(() => import("./interactive/ComplexFormConverter").then(m => ({ default: m.ComplexFormConverter })));
const ComplexOperationsCalculator = lazyInteractive(() => import("./interactive/ComplexOperationsCalculator").then(m => ({ default: m.ComplexOperationsCalculator })));
const ComplexPowerCalculator = lazyInteractive(() => import("./interactive/ComplexPowerCalculator").then(m => ({ default: m.ComplexPowerCalculator })));
const ComplexRootCalculator = lazyInteractive(() => import("./interactive/ComplexRootCalculator").then(m => ({ default: m.ComplexRootCalculator })));
const TruthTableExplorer = lazyInteractive(() => import("./interactive/TruthTableExplorer").then(m => ({ default: m.TruthTableExplorer })));
const VennDiagramExplorer = lazyInteractive(() => import("./interactive/VennDiagramExplorer").then(m => ({ default: m.VennDiagramExplorer })));
const ProbabilitySimulator = lazyInteractive(() => import("./interactive/ProbabilitySimulator").then(m => ({ default: m.ProbabilitySimulator })));
const MatrixCalculator = lazyInteractive(() => import("./interactive/MatrixCalculator").then(m => ({ default: m.MatrixCalculator })));
const BoxplotBuilder = lazyInteractive(() => import("./interactive/BoxplotBuilder").then(m => ({ default: m.BoxplotBuilder })));
const SeriesVisualizer = lazyInteractive(() => import("./interactive/SeriesVisualizer").then(m => ({ default: m.SeriesVisualizer })));
const ComplexPowersTrainer = lazyInteractive(() => import("./interactive/ComplexPowersTrainer").then(m => ({ default: m.ComplexPowersTrainer })));
const CPUArchitectureExplorer = lazyInteractive(() => import("./interactive/CPUArchitectureExplorer").then(m => ({ default: m.default })));
const MemoryHierarchyExplorer = lazyInteractive(() => import("./interactive/MemoryHierarchyExplorer").then(m => ({ default: m.default })));
const RAIDConfigurator = lazyInteractive(() => import("./interactive/RAIDConfigurator").then(m => ({ default: m.default })));
const StorageComparator = lazyInteractive(() => import("./interactive/StorageComparator").then(m => ({ default: m.default })));
const AddressingCalculator = lazyInteractive(() => import("./interactive/AddressingCalculator").then(m => ({ default: m.default })));
const VirtualizationExplorer = lazyInteractive(() => import("./interactive/VirtualizationExplorer").then(m => ({ default: m.default })));
const BootSequenceBuilder = lazyInteractive(() => import("./interactive/BootSequenceBuilder").then(m => ({ default: m.default })));
const DataTransmissionVisualizer = lazyInteractive(() => import("./interactive/DataTransmissionVisualizer").then(m => ({ default: m.default })));
const ARPExplorer = lazyInteractive(() => import("./interactive/ARPExplorer").then(m => ({ default: m.default })));
const TreeExplorer = lazyInteractive(() => import("./interactive/TreeExplorer").then(m => ({ default: m.default })));
const GraphExplorer = lazyInteractive(() => import("./interactive/GraphExplorer").then(m => ({ default: m.default })));
const SecurityThreatExplorer = lazyInteractive(() => import("./interactive/SecurityThreatExplorer").then(m => ({ default: m.SecurityThreatExplorer })));
const PasswordStrengthChecker = lazyInteractive(() => import("./interactive/PasswordStrengthChecker").then(m => ({ default: m.PasswordStrengthChecker })));
const SQLInjectionSimulator = lazyInteractive(() => import("./interactive/SQLInjectionSimulator").then(m => ({ default: m.SQLInjectionSimulator })));
const PhishingDetector = lazyInteractive(() => import("./interactive/PhishingDetector").then(m => ({ default: m.PhishingDetector })));
const SecurityChallengeArena = lazyInteractive(() => import("./interactive/SecurityChallengeArena").then(m => ({ default: m.SecurityChallengeArena })));
const GitBranchVisualizer = lazyInteractive(() => import("./interactive/GitBranchVisualizer").then(m => ({ default: m.default })));
const HeuristicEvaluator = lazyInteractive(() => import("./interactive/HeuristicEvaluator").then(m => ({ default: m.default })));
const PatternExplorer = lazyInteractive(() => import("./interactive/PatternExplorer").then(m => ({ default: m.default })));
const ScrumBoard = lazyInteractive(() => import("./interactive/ScrumBoard").then(m => ({ default: m.default })));
const DockerfileBuilder = lazyInteractive(() => import("./interactive/DockerfileBuilder").then(m => ({ default: m.default })));
const SOLIDChecker = lazyInteractive(() => import("./interactive/SOLIDChecker").then(m => ({ default: m.SOLIDChecker })));
const TestRunner = lazyInteractive(() => import("./interactive/TestRunner").then(m => ({ default: m.TestRunner })));
const EVACalculator = lazyInteractive(() => import("./interactive/EVACalculator").then(m => ({ default: m.default })));
const SMARTGoalBuilder = lazyInteractive(() => import("./interactive/SMARTGoalBuilder").then(m => ({ default: m.default })));
const DockerComposeBuilder = lazyInteractive(() => import("./interactive/DockerComposeBuilder").then(m => ({ default: m.default })));
const MagicTriangle = lazyInteractive(() => import("./interactive/MagicTriangle").then(m => ({ default: m.default })));
const GitShellSimulator = lazyInteractive(() => import("./interactive/GitShellSimulator").then(m => ({ default: m.default })));
const MergeConflictResolver = lazyInteractive(() => import("./interactive/MergeConflictResolver").then(m => ({ default: m.default })));

function renderVisual(visual: LessonVisual, index: number) {
  const w = 400, h = 300;
  const components: Record<string, JSX.Element> = {
    triangle: <Triangle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    circle: <Circle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    rectangle: <Rectangle width={w} height={h} className="w-full max-w-sm mx-auto" />,
    square: <Square width={w} height={h} className="w-full max-w-xs mx-auto" />,
    trapezoid: <Trapezoid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    parallelogram: <Parallelogram width={w} height={h} className="w-full max-w-sm mx-auto" />,
    cube: <Cube width={w} height={h} className="w-full max-w-sm mx-auto" />,
    cuboid: <Cuboid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    sphere: <Sphere width={w} height={h} className="w-full max-w-xs mx-auto" />,
    cylinder: <Cylinder width={w} height={h} className="w-full max-w-xs mx-auto" />,
    cone: <Cone width={w} height={h} className="w-full max-w-xs mx-auto" />,
    pyramid: <Pyramid width={w} height={h} className="w-full max-w-sm mx-auto" />,
    coordinate2d: <CoordinateSystem2D width={w} height={w} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
    coordinate3d: <CoordinateSystem3D width={w} height={h} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
    functionGraph: <FunctionGraph width={500} height={350} className="w-full max-w-md mx-auto" {...(visual.props || {})} />,
    unitCircle: <UnitCircle width={w} height={w} className="w-full max-w-sm mx-auto" {...(visual.props || {})} />,
    papSymbols: <PAPSymbolOverview width={w} height={500} className="w-full max-w-2xl mx-auto" />,
    papExample: <PAPExample width={400} height={700} className="w-full max-w-2xl mx-auto" />,
    struktSeq: <StrukExample example="sequence" className="w-full max-w-md mx-auto" />,
    struktIfElse: <StrukExample example="ifelse" className="w-full max-w-md mx-auto" />,
    struktWhile: <StrukExample example="while" className="w-full max-w-md mx-auto" />,
    struktFor: <StrukExample example="forloop" className="w-full max-w-md mx-auto" />,
    struktBubbleSort: <StrukExample example="bubblesort" className="w-full max-w-lg mx-auto" />,
    scrumCycle: <ScrumCycle />,
    waterfall: <WaterfallModel />,
    vModel: <VModel />,
    layerArchitecture: <LayerArchitecture />,
    testPyramid: <TestPyramid />,
    gitflow: <GitflowDiagram />,
    dockerWorkflow: <DockerWorkflow />,
  };

  return (
    <div key={`visual-${index}`} className="my-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
      {components[visual.type] || <p className="text-red-400">Unbekannter Visual-Typ: {visual.type}</p>}
    </div>
  );
}

function renderInteractive(type: string, codeExample?: string) {
  const interactiveNames: Record<string, string> = {
    functionExplorer: "Funktionen-Explorer",
    tangentExplorer: "Tangenten-Explorer",
    integralExplorer: "Integral-Rechner",
    unitCircleInteractive: "Einheitskreis",
    vectorExplorer: "Vektoren-Explorer",
    codeSandbox: "Code-Sandbox",
    papBuilder: "PAP-Builder",
    pseudocodeRunner: "Pseudocode-Runner",
    struktogrammBuilder: "Struktogramm-Builder",
    sortVisualizer: "Sortier-Visualisierung",
    searchVisualizer: "Such-Visualisierung",
    epkBuilder: "EPK-Builder",
    umlClassDiagram: "UML Klassendiagramm",
    sequenceDiagram: "Sequenzdiagramm",
    netzplanBuilder: "Netzplan-Builder",
    networkBuilder: "Netzwerk-Builder",
    subnetCalculator: "Subnetting-Rechner",
    osiExplorer: "OSI-Explorer",
    protocolAnalyzer: "Protokoll-Analyse",
    macConverter: "MAC/IP-Konverter",
    osiCapsuleViewer: "OSI-Kapselung",
    tcpHandshakeSimulator: "TCP-Handshake",
    dhcpExplorer: "DHCP-Explorer",
    dnsLookup: "DNS-Lookup",
    firewallRuleBuilder: "Firewall-Regeln",
    wlanConfigurator: "WLAN-Konfigurator",
    cableComparer: "Kabel-Vergleich",
    mailJourney: "E-Mail-Weg",
    httpRequestVisualizer: "HTTP-Request",
    encryptionDemo: "Verschlüsselung",
    vpnTunnelVisualizer: "VPN-Tunnel",
    subnettingTrainer: "Subnetting-Trainer",
    relationalModelExplorer: "Kardinalitäten-Explorer",
    erDiagramBuilder: "ER-Diagramm Builder",
    normalisationTrainer: "Normalisierungs-Trainer",
    sqlPlayground: "SQL Playground",
    joinVisualizer: "JOIN-Visualisierer",
    dbPlanningPhases: "DB-Phasen Guide",
    complexPlaneViewer: "Gaußsche Zahlenebene",
    complexFormConverter: "Form-Rechner",
    complexOperationsCalculator: "Operations-Rechner",
    complexPowerCalculator: "Potenz-Rechner",
    complexRootCalculator: "Wurzel-Rechner",
    truthTableExplorer: "Wahrheitstafel-Explorer",
    vennDiagramExplorer: "Venn-Diagramm",
    probabilitySimulator: "Wahrscheinlichkeits-Simulator",
    matrixCalculator: "Matrix-Rechner",
    boxplotBuilder: "Boxplot-Builder",
    seriesVisualizer: "Reihen-Visualisierung",
    complexPowersTrainer: "j-Potenzen-Trainer",
    cpuArchitectureExplorer: "CPU-Architektur",
    memoryHierarchyExplorer: "Speicherhierarchie",
    raidConfigurator: "RAID-Konfigurator",
    storageComparator: "Speichermedien-Vergleich",
    addressingCalculator: "Adressierungs-Rechner",
    virtualizationExplorer: "Virtualisierung",
    bootSequenceBuilder: "Boot-Sequenz",
    dataTransmissionVisualizer: "Datenübertragung",
    arpExplorer: "ARP-Explorer",
    treeExplorer: "Baum-Explorer",
    graphExplorer: "Graph-Explorer",
    securityThreatExplorer: "Bedrohungs-Explorer",
    passwordStrengthChecker: "Passwort-Checker",
    sqlInjectionSimulator: "SQL Injection Simulator",
    phishingDetector: "Phishing Detector",
    gitBranchVisualizer: "Git Branch Visualizer",
    heuristicEvaluator: "Heuristik-Evaluator",
    patternExplorer: "Design Pattern Explorer",
    scrumBoard: "Scrum Board",
    dockerfileBuilder: "Dockerfile Builder",
    solidChecker: "SOLID Checker",
    testRunner: "Test Runner",
    evaCalculator: "EVA-Rechner",
    smartGoalBuilder: "SMART-Ziel Builder",
    dockerComposeBuilder: "Docker Compose Builder",
    magicTriangle: "Magisches Dreieck",
    gitShellSimulator: "Git Shell Simulator",
    mergeConflictResolver: "Merge-Konflikte lösen",
  };

  const components: Record<string, JSX.Element> = {
    functionExplorer: <FunctionExplorer />,
    tangentExplorer: <TangentExplorer />,
    integralExplorer: <IntegralExplorer />,
    unitCircleInteractive: <UnitCircleInteractive />,
    vectorExplorer: <VectorExplorer />,
    codeSandbox: <CodeSandbox initialCode={codeExample || '// Schreibe deinen Code hier\nconsole.log("Hallo!");'} />,
    papBuilder: <PAPBuilder />,
    pseudocodeRunner: <PseudocodeRunner />,
    struktogrammBuilder: <StruktogrammBuilder />,
    sortVisualizer: <SortVisualizer />,
    searchVisualizer: <SearchVisualizer />,
    epkBuilder: <EPKBuilder />,
    umlClassDiagram: <UMLClassDiagram />,
    sequenceDiagram: <SequenceDiagram />,
    netzplanBuilder: <NetzplanBuilder />,
    networkBuilder: <NetworkBuilder />,
    subnetCalculator: <SubnetCalculator />,
    osiExplorer: <OSIExplorer />,
    protocolAnalyzer: <ProtocolAnalyzer />,
    macConverter: <MACConverter />,
    osiCapsuleViewer: <OSICapsuleViewer />,
    tcpHandshakeSimulator: <TCPHandshakeSimulator />,
    dhcpExplorer: <DHCPExplorer />,
    dnsLookup: <DNSLookup />,
    firewallRuleBuilder: <FirewallRuleBuilder />,
    wlanConfigurator: <WLANConfigurator />,
    cableComparer: <CableComparer />,
    mailJourney: <MailJourney />,
    httpRequestVisualizer: <HTTPRequestVisualizer />,
    encryptionDemo: <EncryptionDemo />,
    vpnTunnelVisualizer: <VPNTunnelVisualizer />,
    subnettingTrainer: <SubnettingTrainer />,
    relationalModelExplorer: <RelationalModelExplorer />,
    erDiagramBuilder: <ERDiagramBuilder />,
    normalisationTrainer: <NormalisationTrainer />,
    sqlPlayground: <SQLPlayground />,
    joinVisualizer: <JoinVisualizer />,
    dbPlanningPhases: <DBPlanningPhases />,
    complexPlaneViewer: <ComplexPlaneViewer />,
    complexFormConverter: <ComplexFormConverter />,
    complexOperationsCalculator: <ComplexOperationsCalculator />,
    complexPowerCalculator: <ComplexPowerCalculator />,
    complexRootCalculator: <ComplexRootCalculator />,
    truthTableExplorer: <TruthTableExplorer />,
    vennDiagramExplorer: <VennDiagramExplorer />,
    probabilitySimulator: <ProbabilitySimulator />,
    matrixCalculator: <MatrixCalculator />,
    boxplotBuilder: <BoxplotBuilder />,
    seriesVisualizer: <SeriesVisualizer />,
    complexPowersTrainer: <ComplexPowersTrainer />,
    cpuArchitectureExplorer: <CPUArchitectureExplorer />,
    memoryHierarchyExplorer: <MemoryHierarchyExplorer />,
    raidConfigurator: <RAIDConfigurator />,
    storageComparator: <StorageComparator />,
    addressingCalculator: <AddressingCalculator />,
    virtualizationExplorer: <VirtualizationExplorer />,
    bootSequenceBuilder: <BootSequenceBuilder />,
    dataTransmissionVisualizer: <DataTransmissionVisualizer />,
    arpExplorer: <ARPExplorer />,
    treeExplorer: <TreeExplorer />,
    graphExplorer: <GraphExplorer />,
    securityThreatExplorer: <SecurityThreatExplorer />,
    passwordStrengthChecker: <PasswordStrengthChecker />,
    sqlInjectionSimulator: <SQLInjectionSimulator />,
    phishingDetector: <PhishingDetector />,
    securityChallengeArena: <SecurityChallengeArena />,
    gitBranchVisualizer: <GitBranchVisualizer />,
    heuristicEvaluator: <HeuristicEvaluator />,
    patternExplorer: <PatternExplorer />,
    scrumBoard: <ScrumBoard />,
    dockerfileBuilder: <DockerfileBuilder />,
    solidChecker: <SOLIDChecker />,
    testRunner: <TestRunner />,
    evaCalculator: <EVACalculator />,
    smartGoalBuilder: <SMARTGoalBuilder />,
    dockerComposeBuilder: <DockerComposeBuilder />,
    magicTriangle: <MagicTriangle />,
    gitShellSimulator: <GitShellSimulator />,
    mergeConflictResolver: <MergeConflictResolver />,
  };

  const name = interactiveNames[type] || type;

  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            🧪 Übung: {name}
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          {components[type] || <p className="text-red-400">Unbekannter Interaktiv-Typ: {type}</p>}
        </div>
      </div>
    </div>
  );
}

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
  isCompleted: boolean;
  onNext?: () => void;
  hasNext?: boolean;
  moduleSlug?: string;
  moduleTitle?: string;
  moduleIcon?: string;
  lessonIndex?: number;
}

export function LessonViewer({ lesson, onComplete, isCompleted, onNext, hasNext, moduleSlug, moduleTitle, moduleIcon, lessonIndex }: LessonViewerProps) {
  const renderContent = (content: string, interactiveType?: string) => {
    const elements: JSX.Element[] = [];
    const lines = content.split("\n");
    const skipLines = new Set<number>();
    let inCodeBlock = false;
    let codeContent = "";
    let codeLang = "";
    let inMathBlock = false;
    let mathContent = "";
    let inSvgBlock = false;
    let svgContent = "";
    let inTable = false;
    let tableHeadRow: JSX.Element | null = null;
    let tableBodyRows: JSX.Element[] = [];
    let olItems: JSX.Element[] = [];
    let tableIsFirstRow = true;
    let keyIndex = 0;

    const flushOl = () => {
      if (olItems.length > 0) {
        elements.push(
          <ol key={`ol-${keyIndex++}`} className="my-4 space-y-2 list-decimal list-inside marker:text-blue-400 marker:font-bold">
            {olItems}
          </ol>
        );
        olItems = [];
      }
    };

    // Exercise block state
    let exerciseBlock: { question: string; options: { key: string; text: string }[]; answer: string; explanation: string } | null = null;
    let inExercise = false;
    const flushExercise = () => {
      if (exerciseBlock && exerciseBlock.question) {
        elements.push(
          <InlineExercise
            key={`ex-${keyIndex++}`}
            question={exerciseBlock.question}
            options={exerciseBlock.options.length > 0 ? exerciseBlock.options : undefined}
            answer={exerciseBlock.answer}
            explanation={exerciseBlock.explanation || undefined}
          />
        );
      }
      exerciseBlock = null;
      inExercise = false;
    };

    const flushTable = () => {
      if (tableHeadRow || tableBodyRows.length > 0) {
        elements.push(
          <div key={`table-wrap-${keyIndex++}`} className="overflow-x-auto my-6 rounded-xl border border-slate-700/60 shadow-lg shadow-black/10">
            <table className="w-full border-separate border-spacing-0">
              {tableHeadRow && <thead>{tableHeadRow}</thead>}
              <tbody>{tableBodyRows}</tbody>
            </table>
          </div>
        );
        tableHeadRow = null;
        tableBodyRows = [];
        inTable = false;
        tableIsFirstRow = true;
      }
    };

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      if (skipLines.has(lineIndex)) continue;
      // Flush exercise block when non-`>` line encountered
      if (inExercise && !line.startsWith("> ")) flushExercise();
      // Block math $$...$$
      if (line.trim().startsWith("$$") && !inCodeBlock) {
        flushTable();
        if (inMathBlock) {
          elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
          mathContent = "";
          inMathBlock = false;
        } else {
          const rest = line.trim().slice(2);
          if (rest.endsWith("$$")) {
            elements.push(<MathBlock key={`math-${keyIndex++}`} math={rest.slice(0, -2).trim()} display={true} />);
          } else {
            inMathBlock = true;
            mathContent = rest + "\n";
          }
        }
        continue;
      }

      if (inMathBlock) {
        if (line.trim().endsWith("$$")) {
          mathContent += line.trim().slice(0, -2);
          elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
          mathContent = "";
          inMathBlock = false;
        } else {
          mathContent += line + "\n";
        }
        continue;
      }

      // SVG block
      if (line.trim().startsWith("<svg")) {
        flushTable();
        flushOl();
        inSvgBlock = true;
        svgContent = line + "\n";
        if (line.includes("</svg>")) {
          inSvgBlock = false;
          elements.push(<div key={`svg-${keyIndex++}`} className="my-6 mx-auto max-w-md overflow-x-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />);
          svgContent = "";
        }
        continue;
      }

      // Code block
      if (line.startsWith("```")) {
        flushTable();
        flushOl();
        if (inCodeBlock) {
          elements.push(<CodeBlock key={`code-${keyIndex++}`} code={codeContent.trim()} language={codeLang || "tsx"} />);
          codeContent = "";
          inCodeBlock = false;
        } else {
          codeLang = line.slice(3).trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        continue;
      }

      if (inSvgBlock) {
        svgContent += line + "\n";
        if (line.includes("</svg>")) {
          inSvgBlock = false;
          elements.push(<div key={`svg-${keyIndex++}`} className="my-6 mx-auto max-w-md overflow-x-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />);
          svgContent = "";
        }
        continue;
      }

      // Table row
      if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
        flushOl();
        const cells = line.split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
        // Skip separator row and rows where all cells are empty
        if (!cells.every(c => /^[\s:-]*$/.test(c)) && cells.some(c => c.trim().length > 0)) {
          inTable = true;
          const isHeader = tableIsFirstRow;
          tableIsFirstRow = false;
          const row = (
            <tr key={`tr-${keyIndex++}`} className={`border-b border-slate-700/30 last:border-0 transition-colors duration-150 ${isHeader ? "" : "hover:bg-slate-800/60"}`}>
              {cells.map((cell, ci) => (
                isHeader ? (
                  <th key={ci} className={`px-5 py-3.5 text-left text-sm font-semibold text-blue-100 bg-gradient-to-b from-blue-500/20 to-blue-500/10 border-b-2 border-blue-500/40 first:rounded-tl-xl last:rounded-tr-xl ${ci !== 0 ? "border-l border-slate-700/20" : ""}`}>
                    <InlineText text={cell} />
                  </th>
                ) : (
                  <td key={ci} className={`px-5 py-3 text-slate-200 bg-slate-800/30 ${ci !== 0 ? "border-l border-slate-700/20" : ""}`}>
                    <InlineText text={cell} />
                  </td>
                )
              ))}
            </tr>
          );
          if (isHeader) {
            tableHeadRow = row;
          } else {
            tableBodyRows.push(row);
          }
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headers
      if (line.startsWith("# ")) {
        flushTable();
        flushOl();
        elements.push(<h1 key={`h-${keyIndex++}`} className="text-3xl font-bold text-white mt-8 mb-4"><InlineText text={line.slice(2)} /></h1>);
      } else if (line.startsWith("## ")) {
        flushTable();
        flushOl();
        const headingText = line.slice(3);
        const isMerkblatt = headingText.includes("Merkblatt");
        const isZusammenfassung = headingText.includes("Zusammenfassung");
        const hasEmoji = /^[^\w\s]/.test(headingText);
        elements.push(
          <h2 key={`h-${keyIndex++}`} className={`text-2xl font-semibold mt-8 mb-4 ${isMerkblatt || isZusammenfassung ? "text-yellow-400" : "text-blue-400"}`}>
            {isMerkblatt && !hasEmoji && "📋 "}{isZusammenfassung && !hasEmoji && "📝 "}<InlineText text={headingText} />
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushTable();
        flushOl();
        elements.push(<h3 key={`h-${keyIndex++}`} className="text-2xl font-semibold text-slate-200 mt-6 mb-3"><InlineText text={line.slice(4)} /></h3>);
      }
      // Callout boxes: > 💡 text or > [!TIP] text etc.
      else if (line.startsWith("> ")) {
        flushOl();
        const raw = line.slice(2);
        const calloutTypes: Record<string, { bg: string; border: string; icon: string; label: string; text: string }> = {
          "💡": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
          "[!TIP]": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
          "⚠️": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
          "[!WARNING]": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
          "ℹ️": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
          "[!INFO]": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
          "❗": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
          "[!IMPORTANT]": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
          "✅": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
          "[!SUCCESS]": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
          "📝": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
          "[!NOTE]": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
        };
        let matched = false;

        // Exercise block: collect multi-line exercise
        if (raw.startsWith("[!EXERCISE]")) {
          if (inExercise) flushExercise();
          inExercise = true;
          exerciseBlock = { question: raw.slice("[!EXERCISE]".length).trim(), options: [], answer: "", explanation: "" };
          matched = true;
        } else if (inExercise && exerciseBlock) {
          const optionMatch = raw.match(/^([A-D])\)\s*(.+)/);
          if (optionMatch) {
            exerciseBlock.options.push({ key: optionMatch[1], text: optionMatch[2] });
          } else if (raw.startsWith("ANSWER:")) {
            exerciseBlock.answer = raw.slice("ANSWER:".length).trim();
          } else if (/^\[!/.test(raw)) {
            // Non-exercise callout → flush exercise, process normally
            flushExercise();
          } else if (exerciseBlock.answer) {
            exerciseBlock.explanation += (exerciseBlock.explanation ? " " : "") + raw;
          } else {
            exerciseBlock.question += " " + raw;
          }
          if (inExercise) matched = true;
        } else if (inExercise) {
          flushExercise();
        }

        // 🎬 Video embed
        if (raw.startsWith("🎬")) {
          const videoContent = raw.slice(2).trim();
          const urlMatch = videoContent.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
          const videoId = urlMatch ? urlMatch[1] : null;
          const titleMatch = videoContent.match(/\*\*(.+?)\*\*/);
          const title = titleMatch ? titleMatch[1] : "Video";
          const descMatch = videoContent.match(/—\s*(.+)$/);
          const description = descMatch ? descMatch[1] : "";
          if (videoId) {
            elements.push(
              <div key={`video-${keyIndex++}`} className="my-4 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                <div className="px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-red-600/5 border-b border-slate-700/50 flex items-center gap-2">
                  <span className="text-lg">🎬</span>
                  <span className="text-sm font-semibold text-red-300">{title}</span>
                  <span className="text-xs text-slate-500 ml-auto">3Blue1Brown</span>
                </div>
                {description && <p className="px-4 py-1.5 text-xs text-slate-400 bg-slate-900/30">{description}</p>}
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            );
            matched = true;
          }
        }
        if (!matched) {
          for (const [key, style] of Object.entries(calloutTypes)) {
            if (raw.startsWith(key)) {
              const content = raw.slice(key.length).trim();
              elements.push(
                <div key={`callout-${keyIndex++}`} className={`my-4 p-4 rounded-xl border-l-4 ${style.bg} ${style.border} flex items-start gap-3`}>
                  <span className="text-lg mt-0.5 shrink-0">{style.icon}</span>
                  <div>
                    <span className={`text-sm font-bold uppercase tracking-wider ${style.text} opacity-70`}>{style.label}</span>
                    <p className={`${style.text} text-base mt-1 leading-relaxed`}><InlineText text={content} /></p>
                  </div>
                </div>
              );
              matched = true;
              break;
            }
          }
        }
        if (!matched) {
          // Regular blockquote
          elements.push(
            <blockquote key={`bq-${keyIndex++}`} className="my-3 pl-4 border-l-2 border-slate-600 text-slate-400 italic">
              <InlineText text={raw} />
            </blockquote>
          );
        }
      }
      // List items
      else if (line.startsWith("- ")) {
        flushOl();
        const text = line.slice(2);
        elements.push(<li key={`li-${keyIndex++}`} className="text-slate-200 ml-4 mb-3 list-none pl-5 relative before:content-[''] before:absolute before:left-1.5 before:top-[0.6em] before:w-2 before:h-2 before:rounded-full before:bg-blue-400/70"><InlineText text={text} /></li>);
      } else if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s/, "");
        olItems.push(<li key={`oli-${keyIndex++}`} className="text-slate-200 mb-3"><InlineText text={text} /></li>);
      }
      // Styled divider (---)
      else if (line.trim() === "---") {
        flushOl();
        elements.push(
          <div key={`divider-${keyIndex++}`} className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>
        );
      }
      // Guided Exercise markers
      else if (line.trim() === "[GUIDED_START]") {
        flushOl();
        try {
          const guidedSteps: string[] = [];
          let guidedTitle = "";
          let guidedResult = "";
          let gi = lineIndex + 1;
          while (gi < lines.length && lines[gi].trim() !== "[GUIDED_END]") {
            const gl = lines[gi].trim();
            if (gl.startsWith("TITLE:")) {
              guidedTitle = gl.slice(6).trim();
              gi++;
            } else if (gl === "[STEP]") {
              gi++;
              let stepContent = "";
              while (gi < lines.length) {
                const sl = lines[gi].trim();
                if (sl === "[STEP]" || sl === "[RESULT]" || sl === "[GUIDED_END]") break;
                stepContent += (stepContent ? "\n" : "") + lines[gi];
                gi++;
              }
              guidedSteps.push(stepContent.trim());
            } else if (gl === "[RESULT]") {
              gi++;
              let resultContent = "";
              while (gi < lines.length) {
                if (lines[gi].trim() === "[GUIDED_END]") break;
                resultContent += (resultContent ? "\n" : "") + lines[gi];
                gi++;
              }
              guidedResult = resultContent.trim();
            } else {
              gi++;
            }
          }
          for (let skip = lineIndex; skip <= gi; skip++) {
            skipLines.add(skip);
          }
          if (guidedSteps.length > 0 && guidedResult) {
            elements.push(
              <GuidedExercise key={`guided-${keyIndex++}`} title={guidedTitle} steps={guidedSteps} result={guidedResult} />
            );
          }
        } catch (e) {
          console.error("GuidedExercise parse error:", e);
        }
      }
      // Practice Exercises markers
      else if (line.trim() === "[PRACTICE_START]") {
        try {
          const practiceExercises: { question: string; answer: string }[] = [];
          let practiceTitle = "Übung";
          let pi = lineIndex + 1;
          while (pi < lines.length && lines[pi].trim() !== "[PRACTICE_END]") {
            const pl = lines[pi].trim();
            if (pl.startsWith("TITLE:")) {
              practiceTitle = pl.slice(6).trim();
              pi++;
            } else if (pl === "[Q]") {
              pi++;
              let question = "";
              while (pi < lines.length && lines[pi].trim() !== "[A]" && lines[pi].trim() !== "[PRACTICE_END]") {
                question += (question ? " " : "") + lines[pi].trim();
                pi++;
              }
              if (pi < lines.length && lines[pi].trim() === "[A]") pi++;
              let answer = "";
              while (pi < lines.length && lines[pi].trim() !== "[Q]" && lines[pi].trim() !== "[PRACTICE_END]") {
                answer += (answer ? " " : "") + lines[pi].trim();
                pi++;
              }
              if (question && answer) {
                practiceExercises.push({ question: question.trim(), answer: answer.trim() });
              }
              pi--;
            }
            pi++;
          }
          for (let skip = lineIndex; skip <= pi; skip++) {
            skipLines.add(skip);
          }
          if (practiceExercises.length > 0) {
            elements.push(
              <PracticeExercises key={`practice-${keyIndex++}`} title={practiceTitle} exercises={practiceExercises} />
            );
          }
        } catch (e) {
          console.error("PracticeExercises parse error:", e);
        }
      }
      else if (!line.trim()) {
        elements.push(<div key={`br-${keyIndex++}`} className="h-4" />);
      }
      // Interactive marker — supports [INTERACTIVE] and [INTERACTIVE:type]
      else if (
        (line.trim() === "[INTERACTIVE]" || line.trim().startsWith("[INTERACTIVE:")) &&
        interactiveType &&
        interactiveType !== "codeSandbox"
      ) {
        flushOl();
        let specificType: string | undefined;
        const match = line.trim().match(/^\[INTERACTIVE:(\w+)\]$/);
        if (match) {
          specificType = match[1];
        }
        elements.push(
          <div key={`interactive-${keyIndex++}`} className="my-8">
            {renderInteractive(specificType || interactiveType)}
          </div>
        );
      }
      // Regular paragraph
      else {
        flushOl();
        elements.push(<p key={`p-${keyIndex++}`} className="text-slate-200 mb-5 leading-relaxed"><InlineText text={line} /></p>);
      }
    }

    flushOl();
    flushTable();
    flushExercise();
    return elements;
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6 lg:p-8 animate-slide-up">
      {/* Breadcrumb / Roter Faden */}
      {moduleSlug && moduleTitle && (
        <nav className="flex items-center gap-1.5 text-sm mb-4 sm:mb-5 pb-3 border-b border-slate-700/50">
          <Link
            href="/modules"
            className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Module</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link
            href={`/modules/${moduleSlug}`}
            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
          >
            {moduleIcon && <span className="text-base">{moduleIcon}</span>}
            <span className="truncate max-w-[180px] sm:max-w-none">{moduleTitle}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {lessonIndex !== undefined && <span className="text-slate-500 mr-1">{lessonIndex + 1}.</span>}
            {lesson.title}
          </span>
        </nav>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-700">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{lesson.title}</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            ⏱️ {lesson.duration} • {getTypeLabel(lesson.type)}
          </p>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-base">Abgeschlossen</span>
          </div>
        )}
      </div>

      {/* Visuals (top position) */}
      {lesson.visuals?.filter(v => v.position !== "bottom").map((v, i) => renderVisual(v, i))}

      {/* Content — Erklärung (enthält ggf. [INTERACTIVE] Marker) */}
      <div className="markdown-content">{renderContent(lesson.content, lesson.interactive)}</div>

      {/* Visuals (bottom position) */}
      {lesson.visuals?.filter(v => v.position === "bottom").map((v, i) => renderVisual(v, i + 100))}

      {/* CodeSandbox UNTEN — erst lernen, dann anwenden */}
      {lesson.interactive === "codeSandbox" && (
        <div className="my-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
              <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                🧪 Ausprobieren
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              {renderInteractive("codeSandbox", lesson.codeExample)}
            </div>
          </div>
        </div>
      )}

      {/* Code Example — nur wenn KEIN CodeSandbox */}
      {lesson.codeExample && lesson.interactive !== "codeSandbox" && (
        <div className="my-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 bg-slate-800/60">
              <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                💻 Code-Beispiel
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <CodeBlock code={lesson.codeExample} language="tsx" filename="example.tsx" />
            </div>
          </div>
        </div>
      )}

      {/* Actions — Auto-complete on next or scroll to bottom */}
      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-700">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3">
          {isCompleted ? (
            <div className="text-green-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Abgeschlossen
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-400 rounded-lg font-medium transition-all text-base sm:text-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              Als abgeschlossen markieren
            </button>
          )}

          {/* Feedback-Button — zwischen Complete und Next */}
          {moduleSlug && moduleTitle && (
            <LessonFeedback
              moduleSlug={moduleSlug}
              moduleTitle={moduleTitle}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
            />
          )}

          {hasNext && (
            <button
              onClick={() => {
                onNext?.();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors text-base sm:text-lg"
            >
              Nächste Lektion
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {!hasNext && isCompleted && (
            <a
              href="/modules"
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-violet-500 hover:bg-violet-600 rounded-lg font-medium transition-colors text-base sm:text-lg"
            >
              Alle Module
              <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}



function getTypeLabel(type: Lesson["type"]) {
  switch (type) {
    case "video": return "🎬 Video";
    case "text": return "📄 Text";
    case "interactive": return "💻 Interaktiv";
    case "quiz": return "❓ Quiz";
    default: return "";
  }
}
