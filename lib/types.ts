export interface LessonVisual {
  type: "triangle" | "circle" | "rectangle" | "square" | "trapezoid" | "parallelogram" | "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "pyramid" | "coordinate2d" | "coordinate3d" | "functionGraph" | "unitCircle" | "papSymbols" | "papExample" | "struktSeq" | "struktIfElse" | "struktWhile" | "struktFor" | "struktBubbleSort" | "scrumCycle" | "waterfall" | "vModel" | "layerArchitecture" | "testPyramid" | "gitflow" | "dockerWorkflow";
  props?: Record<string, unknown>;
  position?: "top" | "bottom";
}

export type InteractiveType = "functionExplorer" | "tangentExplorer" | "integralExplorer" | "unitCircleInteractive" | "vectorExplorer" | "codeSandbox" | "papBuilder" | "pseudocodeRunner" | "struktogrammBuilder" | "sortVisualizer" | "searchVisualizer" | "epkBuilder" | "umlClassDiagram" | "sequenceDiagram" | "netzplanBuilder" | "networkBuilder" | "subnetCalculator" | "subnettingTrainer" | "osiExplorer" | "protocolAnalyzer" | "macConverter" | "packetJourney"   | "ethernetFrameBuilder" | "osiCapsuleViewer" | "tcpHandshakeSimulator" | "dhcpExplorer" | "dnsLookup" | "firewallRuleBuilder" | "wlanConfigurator" | "cableComparer" | "mailJourney" | "httpRequestVisualizer" | "encryptionDemo" | "vpnTunnelVisualizer" | "relationalModelExplorer" | "erDiagramBuilder" | "normalisationTrainer" | "sqlPlayground" | "joinVisualizer" | "dbPlanningPhases"
  | "complexPlaneViewer"
  | "complexFormConverter"
  | "complexOperationsCalculator"
  | "complexPowerCalculator"
  | "complexRootCalculator"
  | "truthTableExplorer"
  | "vennDiagramExplorer"
  | "probabilitySimulator"
  | "matrixCalculator"
  | "boxplotBuilder"
  | "seriesVisualizer"
  | "complexPowersTrainer"
  | "cpuArchitectureExplorer"
  | "memoryHierarchyExplorer"
  | "raidConfigurator"
  | "storageComparator"
  | "addressingCalculator"
  | "virtualizationExplorer"
  | "bootSequenceBuilder"
  | "dataTransmissionVisualizer"
  | "arpExplorer"
  | "treeExplorer"
  | "graphExplorer"
  | "securityThreatExplorer"
  | "passwordStrengthChecker"
  | "sqlInjectionSimulator"
  | "phishingDetector"
  | "securityChallengeArena"
  | "gitBranchVisualizer"
  | "heuristicEvaluator"
  | "patternExplorer"
  | "scrumBoard"
  | "dockerfileBuilder"
  | "solidChecker"
  | "evaCalculator"
  | "testRunner"
  | "smartGoalBuilder"
  | "dockerComposeBuilder"
  | "magicTriangle"
  | "gitShellSimulator"
  | "mergeConflictResolver";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz" | "exercises";
  content: string;
  codeExample?: string;
  visuals?: LessonVisual[];
  interactive?: InteractiveType;
  exerciseDifficulty?: 1 | 2 | 3;
  examMode?: boolean;
  group?: string; // Sidebar-Gruppe für einklappbare Sektionen
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  category: string;
  lessons: Lesson[];
  merkblatt?: string;
  hidden?: boolean; // Geheime Module: nicht im Browser sichtbar, nur über direkten Link
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories?: { id: string; name: string; description: string }[];
  password?: string; // Wenn gesetzt: Kategorie ist passwortgeschützt
}

export interface QuizQuestion {
  question: string;
  type: "multiple" | "input";
  options?: string[];
  correct: number | string;
  explanation: string;
  hint?: string;
  mathNotation?: string;
}
