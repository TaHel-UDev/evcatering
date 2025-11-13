export interface WorkBlockData {
  id: number;
  title: string;
  work_points: WorkPoint[];
}

export interface WorkPoint {
  id: number;
  item: {
    id: number;
    point: number;
    text: string;
  }
}
