export interface InputMedicationDTO {
  name: string;
  posology: string;
  time: string;
  description: string;
  type: string;
  img?: string;
}

export interface OutputMedicationDTO extends InputMedicationDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}
