export interface InputUserEventsTypeDTO {
  title: string;
  location?: string;
  date: string;
}

export interface OutputUserEventsTypeDTO extends InputUserEventsTypeDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}
