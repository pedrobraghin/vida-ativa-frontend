import {
  InputAppointmentDTO,
  OutputAppointmentDTO,
} from "../@types/AppointmentTypes";
import api from "../api";

export async function createAppointment(
  input: InputAppointmentDTO
): Promise<OutputAppointmentDTO | null> {
  try {
    const appointment = await api.post("/appointments", input);
    return appointment.data.data;
  } catch (err) {
    return null;
  }
}

export async function getAppointment(
  id: string
): Promise<OutputAppointmentDTO | null> {
  try {
    const appointment = await api.get(`/appointments/${id}`);
    return appointment.data.data;
  } catch (err) {
    return null;
  }
}

export async function getAppointments(): Promise<OutputAppointmentDTO[]> {
  try {
    const appointment = await api.get("/appointments");
    return appointment.data.data;
  } catch (err) {
    return [];
  }
}

export async function deleteAppointment(
  id: string
): Promise<OutputAppointmentDTO | null> {
  try {
    const appointment = await api.delete(`/appointments/${id}`);
    return appointment.data.data;
  } catch (err) {
    return null;
  }
}

export async function updateAppointment(
  id: string,
  input: Partial<InputAppointmentDTO>
): Promise<OutputAppointmentDTO | null> {
  try {
    const appointment = await api.patch(`/appointments/${id}`, input);
    return appointment.data.data;
  } catch (err) {
    return null;
  }
}
