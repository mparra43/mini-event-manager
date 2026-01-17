'use client';
import { getAllEvents } from "@/services/event.service";
import Button from "@/transversal/components/Button";
import List from "@/transversal/components/List";
import { Event } from "@/types";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadEvents() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllEvents();
      console.log('[EventsPage] getAllEvents result', data);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message || "Error al cargar eventos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = () => {
    router.push("/events/create");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Eventos</h1>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <p>Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <List<Event>
          items={events}
          columns={3}
          cardSize="small"
          mapItemToCard={(event: Event) => ({
            name: event.name,
            date: event.date,
            description: event.description,
            place: event.place,
          })}
          onItemClick={(event) => router.push(`/events/${event.id}`)}
        />
      )}

      <Button
        label="Crear evento"
        type="button"
        variant="primary"
        floating
        onClick={handleCreate}
      />
    </div>
  );
}