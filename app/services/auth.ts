import { endpoint } from "../config/endpoint";

export async function Auth({ rut, password }: { rut: string; password: string }) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rut, password }),
    };
    const response = await fetch(`${endpoint}/auth`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al autenticar: ${error}`);
  }
}
