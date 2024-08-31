export type Branch = {
  id: number;
  agency_id: number;
  agency: string;
  location: string;
  address: string;
  telephone: string;
  labels: [];
  users: [];
};

export type FormattedBranch = {
  id: number;
  agency_id: number;
  agency: string;
  location: string;
  address: string;
  telephone: string;
  labels: number;
  users: number;
};
