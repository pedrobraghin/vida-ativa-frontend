export interface InputContactDTO {
  name: string;
  phoneNumber: string;
  img?: string;
}

export interface OutputContactDTO extends InputContactDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
}
