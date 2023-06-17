import { ESocketEvents } from "./ESocketEvents";

export interface EventType {
  id: string;
  type: ESocketEvents;
  payload: {
    body: string;
    title: string;
    from: EventFromType;
    data?: any;
  };
}

export interface EventFromType {
  id: string;
  img?: string;
  fullName: string;
}
