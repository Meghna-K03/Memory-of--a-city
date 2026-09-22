export type Year = 2010 | 2015 | 2020 | 2025 | 2026;

export interface YearMetrics {
  builtUp: number;
  greenSpace: number;
  roadDensity: number;
  transitStations: number;
  commercialArea: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  lat: number;
  lng: number;
  tagline: string;
  data: Record<Year, YearMetrics>;
}

export interface NeighborhoodsResponse {
  years: Year[];
  neighborhoods: Neighborhood[];
  isDemoData: boolean;
}

export interface EvidenceItem {
  type: string;
  title: string;
  year: number;
  desc: string;
}

export interface ChangeStoryRequest {
  neighborhoodId: string;
  fromYear: Year;
  toYear: Year;
}

export interface ChangeStoryResponse {
  source: 'demo-mock' | 'live-ai';
  neighborhoodId: string;
  fromYear: Year;
  toYear: Year;
  whatChanged: string;
  whyItHappened: string[];
  interpretation: string;
  evidence: EvidenceItem[];
  disclaimer: string;
}

export type MetricKey = keyof YearMetrics;
