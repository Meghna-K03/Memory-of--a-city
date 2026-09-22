import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchNeighborhoods } from '@/lib/api';
import type { Neighborhood, Year } from '@/types/city';

interface CityDataState {
  neighborhoods: Neighborhood[];
  years: Year[];
  loading: boolean;
  error: string | null;
}

const CityDataContext = createContext<CityDataState | undefined>(undefined);

export function CityDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CityDataState>({
    neighborhoods: [],
    years: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetchNeighborhoods()
      .then((res) => {
        if (cancelled) return;
        setState({ neighborhoods: res.neighborhoods, years: res.years, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState({ neighborhoods: [], years: [], loading: false, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <CityDataContext.Provider value={state}>{children}</CityDataContext.Provider>;
}

export function useCityData() {
  const ctx = useContext(CityDataContext);
  if (!ctx) throw new Error('useCityData must be used within CityDataProvider');
  return ctx;
}

export function useNeighborhoodById(id: string | undefined) {
  const { neighborhoods, loading, error } = useCityData();
  const neighborhood = id ? neighborhoods.find((n) => n.id === id) : undefined;
  return { neighborhood, loading, error };
}
