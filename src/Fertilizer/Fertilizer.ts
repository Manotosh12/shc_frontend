export interface FertilizerDirectRequest {
  n: number;
  p: number;
  k: number;
  OC: number;
  pH: number;
}

export interface FertilizerDirectResponse {
  main_fertilizers: { name: string; quantity: string; provides: string }[];
  alternative_fertilizers: { name: string; quantity: string; provides: string }[];
  organic: string;
  ph_correction: string;
}
