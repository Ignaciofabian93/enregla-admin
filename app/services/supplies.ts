import { endpoint } from "../config/endpoint";

export async function GetSupplies({ token, query }: { token: string; query: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/supply${query}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener los insumos: ${error}`);
  }
}

export async function CreateSupply({
  token,
  category,
  name,
  quantity,
  price,
  branch_id,
}: {
  token: string;
  category: string;
  name: string;
  quantity: number;
  price: number;
  branch_id: number;
}) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category, name, quantity, price, branch_id }),
    };
    const response = await fetch(`${endpoint}/supply`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al crear el insumo: ${error}`);
  }
}

export async function UpdateSupply({
  token,
  supply_id,
  category,
  name,
  quantity,
  price,
  branch_id,
}: {
  token: string;
  supply_id: number;
  category: string;
  name: string;
  quantity: number;
  price: number;
  branch_id: number;
}) {
  try {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category, name, quantity, price, branch_id }),
    };
    const response = await fetch(`${endpoint}/supply/${supply_id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al actualizar el insumo: ${error}`);
  }
}

export async function DeleteSupply({ token, supply_id }: { token: string; supply_id: number }) {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/supply/${supply_id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar el insumo: ${error}`);
  }
}
