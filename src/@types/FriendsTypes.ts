export enum FriendshipRequestStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}

export interface FriendRequestType {
  id: string;
  senderId: string;
  recipientId: string;
  sender: FriendRequestSender;
  receiver: FriendRequestSender;
  status: FriendshipRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequestSender {
  name: {
    first: string;
    last: string;
  };
  img: {
    regular: string;
  };
  fullName: string;
  email: string;
  id: string;
}

export interface FriendshipType {
  id: string;
  userOne: FriendRequestSender;
  userTwo: FriendRequestSender;
  createdAt: string;
  updatedAt: string;
}

export interface FriendType {
  name: {
    first: string;
    last: string;
  };
  img: {
    regular: string;
  };
  fullName: string;
  email: string;
  id: string;
  address: string;
  phoneNumber: string;
}
