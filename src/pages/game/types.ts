export type GameResults = {
  score: number;
  completed: boolean;
};

export type Flag = {
  id: string;
  names: ReadonlyArray<string>;
  icon: string;
};
