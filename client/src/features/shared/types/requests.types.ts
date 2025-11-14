export interface RequestsData {
  id: number;
  date_created: string;
  name: string;
  phone: string;
  preferences?: string | null;
  franchise_id: {
    id: number;
    name: string;
    subdomain: string;
  } | number; // Может быть как объект, так и просто ID при создании
}