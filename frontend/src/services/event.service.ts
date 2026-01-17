import { authHttpClient } from "./base-api.service";
import { API_ENDPOINTS } from "../transversal/components/constants/api.constants";
import type { Event, EventFormData } from "../types";
import { getToken } from "../utils/storage.util";

export async function getAllEvents(): Promise<Event[]> {
  const token = getToken();
  console.log('[event.service] getAllEvents token', token);
  const { data } = await authHttpClient.get<{ events: Event[] }>(API_ENDPOINTS.EVENTS.BASE);
  console.log('[event.service] getAllEvents response', data);
  return data.events;
}

export async function getEventById(id: number): Promise<Event> {
  const token = getToken();
  console.log('[event.service] getEventById token', token, 'id', id);
  const { data } = await authHttpClient.get<{ event: Event }>(
    API_ENDPOINTS.EVENTS.BY_ID(id)
  );
  console.log('[event.service] getEventById response', data);
  return data.event;
}

export async function createEvent(payload: EventFormData): Promise<Event> {
  const token = getToken();
  console.log('[event.service] createEvent token', token, 'payload', payload);
  const { data } = await authHttpClient.post<{ event: Event }>(
    API_ENDPOINTS.EVENTS.BASE,
    payload
  );
  console.log('[event.service] createEvent response', data);
  return data.event;
}

export async function updateEvent(
  id: number,
  payload: EventFormData
): Promise<Event> {
  const token = getToken();
  console.log('[event.service] updateEvent token', token, 'id', id, 'payload', payload);
  const { data } = await authHttpClient.put<{ event: Event }>(
    API_ENDPOINTS.EVENTS.BY_ID(id),
    payload
  );
  console.log('[event.service] updateEvent response', data);
  return data.event;
}

export async function deleteEvent(id: number): Promise<void> {
  const token = getToken();
  console.log('[event.service] deleteEvent token', token, 'id', id);
  await authHttpClient.delete(API_ENDPOINTS.EVENTS.BY_ID(id));
  console.log('[event.service] deleteEvent done');
}