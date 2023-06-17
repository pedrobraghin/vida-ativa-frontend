import api from "../api";
import { InputContactDTO, OutputContactDTO } from "../@types/ContactType";

export async function createContact(
  data: InputContactDTO
): Promise<OutputContactDTO | null> {
  try {
    const response = await api.post("/contacts", data);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function getContacts(): Promise<OutputContactDTO[]> {
  try {
    const response = await api.get("/contacts");
    return response.data.data;
  } catch (err) {
    return [];
  }
}

export async function getContactsById(
  id: string
): Promise<OutputContactDTO | null> {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function deleteContact(
  id: string
): Promise<OutputContactDTO | null> {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function updateContact(
  id: string,
  input: Partial<InputContactDTO>
): Promise<OutputContactDTO | null> {
  try {
    const response = await api.patch(`/contacts/${id}`, input);
    return response.data.data;
  } catch (err) {
    return null;
  }
}
