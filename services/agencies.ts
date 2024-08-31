import { endpoint } from "./endpoint";

export const GetAllAgencies = async ({ token }: { token: string }) => {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/agency`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener automotoras: ${error}`);
  }
};
