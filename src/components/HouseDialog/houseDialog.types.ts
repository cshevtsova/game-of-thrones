export interface HouseProps {
  houseId?: number;
  open: boolean;
  onClose: () => void;
}

export interface House {
  name: string,
  region: string,
  coatOfArms: string,
  words: string,
  titles: string,
  seats: string,
  hasDiedOut: boolean,
  hasOverlord: boolean,
  cadetBranches: number,
}
