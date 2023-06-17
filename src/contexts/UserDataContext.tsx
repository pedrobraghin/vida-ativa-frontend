import { createContext, useState, useEffect } from "react";

import {
  getFriendRequests,
  getFriendships,
  getSentRequests,
} from "../functions/friends";
import { useUser } from "../hooks/useUser";
import { getEvents } from "../functions/events";
import { getContacts } from "../functions/contacts";
import { getReminders } from "../functions/reminder";
import { ReminderType } from "../@types/ReminderType";
import { OutputContactDTO } from "../@types/ContactType";
import { getMedications } from "../functions/medications";
import { OutputMedicationDTO } from "../@types/MedicationTypes";
import { OutputUserEventsTypeDTO } from "../@types/EventsTypes";
import { FriendRequestType, FriendshipType } from "../@types/FriendsTypes";
import { OutputAppointmentDTO } from "../@types/AppointmentTypes";
import { getAppointments } from "../functions/appointments";

interface UserDataContextProps {
  getFriendRequests(): Promise<void>;
  getUserData(): Promise<void>;
  friendRequests: FriendRequestType[];
  friendships: FriendshipType[];
  getFriendsList(): Promise<void>;
  setFriendsList(friendList: FriendshipType[]): void;
  reminders: ReminderType[];
  getRemindersList(): Promise<void>;
  setRemindersList(reminders: ReminderType[]): void;
  getSentRequests(): Promise<void>;
  sentFriendRequests: FriendRequestType[];
  setSentFriendRequests: React.Dispatch<
    React.SetStateAction<FriendRequestType[]>
  >;
  medications: OutputMedicationDTO[];
  getMedications(): Promise<void>;
  getContacts(): Promise<void>;
  contacts: OutputContactDTO[];
  getEvents(): Promise<void>;
  events: OutputUserEventsTypeDTO[];
  appointments: OutputAppointmentDTO[];
  getAppointments(): Promise<void>;
}

export const UserDataContext = createContext<UserDataContextProps>(
  {} as UserDataContextProps
);

interface UserDataProviderProps {
  children: React.ReactNode;
}

function useInitialValue() {
  const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);
  const [friendships, setFriendships] = useState<FriendshipType[]>([]);
  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const [sentFriendRequests, setSentFriendRequests] = useState<
    FriendRequestType[]
  >([]);
  const [medications, setMedications] = useState<OutputMedicationDTO[]>([]);
  const [contacts, setContacts] = useState<OutputContactDTO[]>([]);
  const [events, setEvents] = useState<OutputUserEventsTypeDTO[]>([]);
  const [appointments, setAppointments] = useState<OutputAppointmentDTO[]>([]);

  async function getUserData() {
    await Promise.all([
      getFriendRequestsList(),
      getFriendships(),
      getContactsList(),
      getEvents(),
      getMedications(),
      getRemindersList(),
      getAppointmentsList(),
    ]);
  }

  async function getFriendRequestsList(): Promise<void> {
    const requests = await getFriendRequests();
    setFriendRequests(requests);
  }

  async function getFriendsList(): Promise<void> {
    const friends = await getFriendships();
    setFriendships(friends);
  }

  async function getRemindersList() {
    const reminders = await getReminders();
    setReminders(reminders);
  }

  async function getSentRequestsList() {
    const requests = await getSentRequests();
    setSentFriendRequests(requests);
  }

  async function getMedicationsList() {
    const medications = await getMedications();
    setMedications(medications);
  }

  async function getContactsList() {
    const contacts = await getContacts();
    setContacts(contacts);
  }

  async function getEventsList() {
    const events = await getEvents();
    setEvents(events);
  }

  async function getAppointmentsList() {
    const appointments = await getAppointments();
    setAppointments(appointments);
  }

  return {
    getUserData,
    getFriendRequests: getFriendRequestsList,
    friendRequests,
    friendships,
    getFriendsList,
    setFriendsList: setFriendships,
    getRemindersList,
    reminders,
    setRemindersList: setReminders,
    sentFriendRequests,
    getSentRequests: getSentRequestsList,
    getMedications: getMedicationsList,
    medications,
    contacts,
    getContacts: getContactsList,
    getEvents: getEventsList,
    events,
    setSentFriendRequests,
    appointments,
    getAppointments: getAppointmentsList,
  } as UserDataContextProps;
}

export default function UserDataProvider({ children }: UserDataProviderProps) {
  const data = useInitialValue();
  const { getUserData } = data;
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    getUserData();
  }, [isLoggedIn]);

  return (
    <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>
  );
}
