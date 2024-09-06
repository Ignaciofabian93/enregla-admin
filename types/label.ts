import { Branch } from "./branch";

export type Label = {
  id: number;
  user_id: number;
  date: string;
  branch_id: number;
  branch: Branch;
  label_quantity: number;
  wrong_labels: number;
  purchase_number: string;
  price: string;
  coordinates: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_brand_id: number;
  vehicle_model_id: number;
  vehicle_year: string;
  show_vin: boolean;
  vehicle_vin: string;
  show_plate: boolean;
  vehicle_plate: string;
  show_logo: boolean;
  vehicle_logo: string;
  print_type: string;
  description: string;
};
