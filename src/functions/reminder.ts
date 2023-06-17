import api from "../api";
import { ReminderType } from "../@types/ReminderType";

export async function getReminders(): Promise<ReminderType[]> {
  try {
    const response = await api.get("/reminders");
    return response.data.data;
  } catch (rrr) {
    return [];
  }
}

export async function createReminder(
  title: string
): Promise<ReminderType | null> {
  try {
    const response = await api.post("/reminders/", { title, completed: false });
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function deleteReminder(id: string): Promise<boolean> {
  try {
    await api.delete(`/reminder/${id}`);
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateReminder(
  id: string,
  data: Partial<{ title: string; completed: boolean }>
): Promise<ReminderType | null> {
  try {
    const response = await api.patch(`reminders/${id}`, data);
    return response.data.data;
  } catch (err) {
    return null;
  }
}
