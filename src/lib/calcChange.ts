import type { MetricKey, Neighborhood, Year } from '@/types/city';

// Shared change-calculation helper — see skills/city-data-and-visualization/SKILL.md.
// Percent change for every metric except transit station count, which is reported
// as a raw difference (a station count doesn't read naturally as a percentage).
export function calcChange(
  neighborhood: Neighborhood,
  fromYear: Year,
  toYear: Year,
  key: MetricKey,
): number {
  const from = neighborhood.data[fromYear][key];
  const to = neighborhood.data[toYear][key];
  if (key === 'transitStations') return to - from;
  if (from === 0) return to === 0 ? 0 : 100;
  return Math.round(((to - from) / from) * 100);
}
