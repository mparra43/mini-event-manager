'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "../../../../transversal/components/Form";
import { getEventById, updateEvent } from "../../../../services/event.service";
import type { Event, EventFormData } from "../../../../types";

const eventFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  date: z.string().min(1, "La fecha es obligatoria"),
  description: z.string().optional(),
  place: z.string().optional(),
});

function toLocalDatetimeInput(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id;
  const id = typeof idParam === "string" ? Number(idParam) : NaN;

  const [event, setEvent] = useState<Event | null>(null);
  const [defaultValues, setDefaultValues] = useState<EventFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        setDefaultValues({
          name: data.name,
          date: toLocalDatetimeInput(data.date),
          description: data.description || "",
          place: data.place || "",
        });
      } catch (err: any) {
        setError(err?.message || "Error al cargar el evento");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const fields = [
    {
      label: "Nombre",
      name: "name",
      placeholder: "Nombre del evento",
      type: "text" as const,
      inputType: "text" as const,
    },
    {
      label: "Fecha y hora",
      name: "date",
      placeholder: "Selecciona fecha y hora",
      inputType: "date" as const,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Descripción del evento",
      type: "text" as const,
      inputType: "text" as const,
    },
    {
      label: "Lugar",
      name: "place",
      placeholder: "Lugar del evento",
      type: "text" as const,
      inputType: "text" as const,
    },
  ];

  const handleSubmit = async (data: EventFormData) => {
    if (!id || Number.isNaN(id)) return;
    try {
      setError(null);
      setIsSubmitting(true);
      await updateEvent(id, data);
      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error al actualizar el evento");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !defaultValues) {
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
        <button
          type="button"
          onClick={() => router.push("/events")}
          className="underline text-blue-600"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-2">Editar evento</h1>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Form
        schema={eventFormSchema}
        fields={fields}
        buttonProps={{
          label: isSubmitting ? "Guardando..." : "Guardar cambios",
          type: "submit",
          variant: "primary",
          disabled: isSubmitting,
        }}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
}