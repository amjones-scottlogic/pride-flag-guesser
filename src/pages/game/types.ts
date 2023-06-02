export interface Dictionary<T> {
  [Key: string]: T;
}

export type Flag = {
  id: string;
  names: ReadonlyArray<string>;
  icon: string;
  link: string;
};

export type GameResults = {
  score: number;
  completed: boolean;
  skippedFlags: Dictionary<Flag>;
};
