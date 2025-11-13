export interface CaseData {
  id: number;
  guests: number;
  format: string;
  date: string;
  name: string;
  description: string;
  task_content: string;
  decision_content: string;
  preview: { id: string };
  task_image: { id: string };
  decision_image: { id: string };
}
