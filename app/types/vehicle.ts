export type Vehicle = {
  id: number;
  brand: string;
  brand_id: number;
  model: string;
  logo: string;
};

export type FormattedVehicle = {
  id: number;
  brand: string;
  model: string;
};

export type Brand = {
  id: number;
  brand: string;
  logo: string;
};

export type Model = {
  id: number;
  model: string;
  brand_id: number;
};
