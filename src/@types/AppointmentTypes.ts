export interface InputAppointmentDTO {
  location: string;
  doctor: string;
  date: string;
  title: string;
  description?: string;
}

export interface OutputAppointmentDTO extends InputAppointmentDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}
