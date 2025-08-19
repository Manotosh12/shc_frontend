export interface NutrientLevels {
  Low: number;
  Medium: number;
  High: number;
}

export interface PhLevels {
  Acidic: number;
  Neutral: number;
  Alkaline: number;
}

export interface FertilizerRecommendationRequest {
  n: NutrientLevels;
  p: NutrientLevels;
  k: NutrientLevels;
  OC: NutrientLevels;
  pH: PhLevels;
}
