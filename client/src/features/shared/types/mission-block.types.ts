export interface MissionBlockData {
  id: number;
  title: string;
  subtitle: string;
  mission_block_cards: MissionBlockCard[];
}

export interface MissionBlockCard {
  id: number;
  item: {
    id: number;
    text: string;
  }
}
