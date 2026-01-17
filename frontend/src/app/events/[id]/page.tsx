'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "../../../transversal/components/Card";
import Button from "../../../transversal/components/Button";
import { getEventById, deleteEvent } from "../../../services/event.service";
import type { Event } from "../../../types";

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const id = typeof idParam === "string" ? Number(idParam) : NaN;

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError("ID de evento inválido");
      setIsLoading(false);
      return;
    }

    async function loadEvent() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getEventById(id);
        setEvent(data);
      } catch (err: any) {
        setError(err?.message || "Error al cargar el evento");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const handleEdit = () => {
    if (!event) return;
    router.push(`/events/${event.id}/edit`);
  };

  const handleDelete = async () => {
    if (!event) return;
    try {
      setIsDeleting(true);
      await deleteEvent(event.id);
      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error al eliminar el evento");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando evento...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen p-4">
        <p className="text-red-600 mb-4">
          {error || "No se encontró el evento"}
        </p>
        <Button
          label="Volver a la lista"
          type="button"
          onClick={() => router.push("/events")}
          variant="secondary"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-2">Detalle del evento</h1>

      <Card
        name={event.name}
        date={event.date}
        description={event.description}
        place={event.place}
        size="large"
      />

      <div className="flex gap-2 mt-4">
        <Button
          label="Editar"
          type="button"
          variant="primary"
          onClick={handleEdit}
        />
        <Button
          label={isDeleting ? "Eliminando..." : "Eliminar"}
          type="button"
          variant="secondary"
          onClick={handleDelete}
          disabled={isDeleting}
        />
        <Button
          label="Volver"
          type="button"
          variant="secondary"
          onClick={() => router.push("/events")}
        />
      </div>
    </div>
  );
}