import type { ChangeStoryRequest, ChangeStoryResponse, NeighborhoodsResponse } from '@/types/city';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function fetchNeighborhoods(): Promise<NeighborhoodsResponse> {
  return request<NeighborhoodsResponse>('/api/neighborhoods');
}

export function fetchChangeStory(payload: ChangeStoryRequest): Promise<ChangeStoryResponse> {
  return request<ChangeStoryResponse>('/api/change-story', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
