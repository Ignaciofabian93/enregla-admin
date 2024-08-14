import { endpoint } from "../config/endpoint";

export async function GetUsers({ token, query }: { token: string; query: string | null }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/user${query}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error}`);
  }
}

export async function GetUser({ token, id }: { token: string; id: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/user/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener usuario: ${error}`);
  }
}

export async function CreateUser({ token, user }: { token: string; user: any }) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${endpoint}/user`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error}`);
  }
}

export async function UpdateUser({ token, id, user }: { token: string; id: number; user: any }) {
  try {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${endpoint}/user/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error}`);
  }
}

export async function DeleteUser({ token, id }: { token: string; id: number }) {
  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/user/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar usuario: ${error}`);
  }
}
