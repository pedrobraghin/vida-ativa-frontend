import { OutputContactDTO } from "./ContactType";
import { OutputUserEventsTypeDTO } from "./EventsTypes";
import { OutputMedicationDTO } from "./MedicationTypes";
import { OutputAppointmentDTO } from "./AppointmentTypes";

export interface ElderlyInfos {
  contacts: OutputContactDTO[];
  events: OutputUserEventsTypeDTO[];
  appointments: OutputAppointmentDTO[];
  medications: OutputMedicationDTO[];
  elderly: ElderlyDTO;
}

export interface ElderlyDTO {
  img?: {
    regular: string;
  };
  phoneNumber: string;
  fullName: string;
  address: string;
}
