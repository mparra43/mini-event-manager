'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "../../../transversal/components/Form";
import { createEvent } from "../../../services/event.service";
import { formatForApi } from "../../../utils/date.util";
import { parseISO } from "date-fns";
import type { EventFormData } from "../../../types";

const eventFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  date: z.string().min(1, "La fecha es obligatoria"),
  description: z.string().optional(),
  place: z.string().optional(),
});

export default function CreateEventPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setError(null);
      setIsSubmitting(true);

      const apiDate = formatForApi(parseISO(data.date.length === 16 ? `${data.date}:00` : data.date));
      const payload = { ...data, date: apiDate };
      await createEvent(payload);
      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error al crear el evento");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold mb-2">Crear evento</h1>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <Form
        schema={eventFormSchema}
        fields={fields}
        buttonProps={{
          label: isSubmitting ? "Guardando..." : "Guardar",
          type: "submit",
          variant: "primary",
          disabled: isSubmitting,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
