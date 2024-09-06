"use client";
import { useEffect, useState } from "react";
import { FormattedLabel, Label } from "../types/label";
import { GetAllLabels } from "../services/labels";
import useSessionStore from "@/store/session";
import downloadExcel from "@/utils/exportSheet";

const columns = [
  { label: "Dirección", key: "branch_address" },
  { label: "Fecha", key: "date" },
  { label: "Coordenadas", key: "coordinates" },
  { label: "Descripción", key: "description" },
  { label: "Cantidad de etiquetas", key: "label_quantity" },
  { label: "Tipo de grabado", key: "print_type" },
  { label: "Tiene logo?", key: "show_logo" },
  { label: "Tiene patente", key: "show_plate" },
  { label: "Tiene VIN", key: "show_vin" },
  { label: "Marca", key: "vehicle_brand" },
  { label: "Modelo", key: "vehicle_model" },
  { label: "Patente", key: "vehicle_plate" },
  { label: "VIN", key: "vehicle_vin" },
  { label: "Año", key: "vehicle_year" },
  { label: "Etiquetas erróneas", key: "wrong_labels" },
];

export default function useHome() {
  const { session } = useSessionStore();
  const [labels, setLabels] = useState<FormattedLabel[]>([]);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    if (session) {
      const response = await GetAllLabels({ token: session.token });
      const formattedLabels = response.labels.map((label: Label) => ({
        id: label.id,
        branch_id: label.branch_id,
        branch_address: label.branch.address,
        date: label.date,
        coordinates: label.coordinates,
        description: label.description,
        label_quantity: label.label_quantity,
        print_type: label.print_type,
        show_logo: label.show_logo,
        show_plate: label.show_plate,
        show_vin: label.show_vin,
        vehicle_brand: label.vehicle_brand,
        vehicle_model: label.vehicle_model,
        vehicle_plate: label.vehicle_plate,
        vehicle_vin: label.vehicle_vin,
        vehicle_year: label.vehicle_year,
        wrong_labels: label.wrong_labels,
      }));
      setLabels(formattedLabels);
    }
  };

  const exportReport = () =>
    downloadExcel({
      headers: columns,
      rows: labels,
      sheet: "Reporte general",
    });

  return { labels, exportReport };
}
