export enum AccountTypes {
  CAREGIVER,
  ELDERLY,
}

export interface UserType {
  id: string;
  accountType: AccountTypes;
  name: {
    first: string;
    last: string;
  };
  fullName: string;
  email: string;
  img: {
    regular: string;
  };
}

export interface SearchUserResult {
  id: string;
  fullName: string;
  email: string;
  img?: {
    regular: string;
  };
  isFriends?: boolean;
}

export interface InputUserDTO {
  name: {
    first: string;
    last: string;
  };
  img?: {
    regular: string;
  };
  email: string;
  password: string;
  passwordConfirm: string;
  accountType: AccountTypes;
  birthDate: string;
  address: string;
  phoneNumber: string;
}
