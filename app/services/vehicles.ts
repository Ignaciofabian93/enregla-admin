import { endpoint } from "../config/endpoint";

export async function GetVehicleBrands({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/vehicle/brand`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener marcas de vehículos: ${error}`);
  }
}

export async function GetVehicleModels({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/vehicle/model`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener modelos de vehículos: ${error}`);
  }
}

export async function GetVehicles({ token, query }: { token: string; query: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/vehicle${query}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener vehículos: ${error}`);
  }
}

export async function SaveVehicle({
  token,
  model,
  brand_id,
  brand,
  logo,
}: {
  token: string;
  model: string;
  brand_id: number;
  brand: string;
  logo: string;
}) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ model, brand_id, brand, logo }),
    };
    const response = await fetch(`${endpoint}/vehicle`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar guardar vehículo: ${error}`);
  }
}

export async function UpdateVehicle({
  token,
  model,
  model_id,
  brand_id,
  brand,
  logo,
}: {
  token: string;
  model_id: number;
  model: string;
  brand_id: number;
  brand: string;
  logo: string;
}) {
  try {
    console.log("body!!: ", model, model_id, brand, brand_id);

    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ model, model_id, brand_id, brand, logo }),
    };
    const response = await fetch(`${endpoint}/vehicle/${model_id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar actualizar vehículo: ${error}`);
  }
}

export async function DeleteVehicle({ token, vehicle_id }: { token: string; vehicle_id: number }) {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/vehicle/${vehicle_id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar eliminar vehículo: ${error}`);
  }
}
