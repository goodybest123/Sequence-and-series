
export enum Level {
  Arithmetic = 1,
  Geometric = 2,
  Recognition = 3,
  Series = 4,
  Challenge = 5,
  Fibonacci = 6,
  Fractal = 7,
}

export type SequenceType = 'arithmetic' | 'geometric';

export interface GeneratedProblem {
  problemText: string;
  sequenceType: SequenceType;
  firstTerm: number;
  commonValue: number;
  questionTermIndex: number;
  answer: number;
}