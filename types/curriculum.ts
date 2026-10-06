export interface ChallengeTest {
  id: string;
  description: string;
  isPassing: (userCode: string, state: any) => boolean;
}

export interface MiniChallenge {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  explanation: string;
  testCases: {
    description: string;
    validate: (code: string) => { passed: boolean; message: string };
  }[];
}

export interface PlaygroundConfig {
  id: string;
  title: string;
  description: string;
  type:
    | 'jsx-expressions'
    | 'props-explorer'
    | 'state-sandbox'
    | 'events-lab'
    | 'lists-conditionals'
    | 'effects-lab'
    | 'refs-dom-lab'
    | 'state-lifting-lab'
    | 'context-lab'
    | 'custom-hooks-lab'
    | 'controlled-uncontrolled-lab'
    | 'memo-benchmark-lab'
    | 'lazy-suspense-lab'
    | 'reducer-imperative-lab'
    | 'error-boundary-lab'
    | 'compound-components-lab';
  initialState: any;
}

export interface CurriculumModule {
  id: string;
  title: string;
  slug: string;
  estimatedMinutes: number;
  theory: {
    summary: string;
    corePrinciples: {
      headline: string;
      body: string;
      pitfall?: string;
    }[];
    codeExamples: {
      title: string;
      code: string;
      explanation: string;
    }[];
  };
  playground: PlaygroundConfig;
  challenge: MiniChallenge;
  appliedInApp: {
    componentName: string;
    filePath: string;
    description: string;
  };
}

export interface CurriculumPhase {
  id: string;
  phaseNumber: number;
  title: string;
  badge: string;
  description: string;
  targetAudience: string;
  modules: CurriculumModule[];
}
