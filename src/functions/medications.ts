import {
  OutputMedicationDTO,
  InputMedicationDTO,
} from "../@types/MedicationTypes";
import api from "../api";

export async function getMedications(): Promise<OutputMedicationDTO[]> {
  try {
    const response = await api.get("/medications");
    return response.data.data;
  } catch (err) {
    return [];
  }
}

export async function getMedicationById(
  id: string
): Promise<OutputMedicationDTO | null> {
  try {
    const response = await api.get(`/medications/${id}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function deleteMedication(id: string): Promise<void> {
  try {
    const response = await api.delete(`/medications/${id}`);
    return response.data.data;
  } catch (err) {
    return;
  }
}

export async function createMedication(
  input: InputMedicationDTO
): Promise<OutputMedicationDTO | null> {
  try {
    const response = await api.post("/medications", input);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function updateMedication(
  id: string,
  input: Partial<InputMedicationDTO>
): Promise<OutputMedicationDTO | null> {
  try {
    const response = await api.patch(`/medications/${id}`, input);
    return response.data.data;
  } catch (err) {
    return null;
  }
}
