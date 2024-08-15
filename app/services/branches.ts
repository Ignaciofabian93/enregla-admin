import { endpoint } from "../config/endpoint";
import { Branch } from "../types/branch";

export async function GetAllBranches({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/branches`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener sucursales: ${error}`);
  }
}

export async function GetBranches({ token, query }: { token: string; query?: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/branch${query}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener sucursales: ${error}`);
  }
}

export async function CreateBranch({ token, branch }: { token: string; branch: Branch }) {
  try {
    const { agency_id, address, location, telephone } = branch;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ agency_id, address, location, telephone }),
    };
    const response = await fetch(`${endpoint}/branch`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al crear sucursal: ${error}`);
  }
}

export async function UpdateBranch({ token, id, branch }: { token: string; id: number; branch: Branch }) {
  try {
    const { agency_id, address, location, telephone } = branch;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ agency_id, address, location, telephone }),
    };
    const response = await fetch(`${endpoint}/branch/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al actualizar sucursal: ${error}`);
  }
}

export async function DeleteBranch({ token, id }: { token: string; id: number }) {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/branch/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar sucursal: ${error}`);
  }
}
