import {
  InputUserEventsTypeDTO,
  OutputUserEventsTypeDTO,
} from "../@types/EventsTypes";
import api from "../api";

export async function createEvent(
  input: InputUserEventsTypeDTO
): Promise<OutputUserEventsTypeDTO | null> {
  try {
    const response = await api.post("/events", input);
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export async function getEvents() {
  try {
    const response = await api.get("/events");
    return response.data.data;
  } catch (error) {
    return [];
  }
}

export async function getEventById(
  id: string
): Promise<OutputUserEventsTypeDTO | null> {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export async function updateEvent(
  id: string,
  input: Partial<InputUserEventsTypeDTO>
): Promise<OutputUserEventsTypeDTO | null> {
  try {
    const response = await api.patch(`/events/${id}`, input);
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export async function deleteEvent(
  id: string
): Promise<OutputUserEventsTypeDTO | null> {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
}
