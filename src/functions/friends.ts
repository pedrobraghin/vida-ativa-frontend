import { FriendRequestType } from "../@types/FriendsTypes";
import api from "../api";

export async function sendFriendRequest(recipientId: string) {
  try {
    const response = await api.post(`/friends/request/send/${recipientId}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function acceptFriendRequest(requestId: string) {
  try {
    const response = await api.patch(`/friends/request/accept/${requestId}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function declineFriendRequest(requestId: string) {
  try {
    const response = await api.patch(`/friends/request/decline/${requestId}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function cancelFriendRequest(requestId: string) {
  try {
    const response = await api.patch(`/friends/request/cancel/${requestId}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}

export async function getFriendRequests(): Promise<FriendRequestType[]> {
  try {
    const response = await api.get("/friends/requests");
    return response.data.data;
  } catch (err) {
    return [];
  }
}

export async function getSentRequests(): Promise<FriendRequestType[]> {
  try {
    const response = await api.get("/friends/requests/sent");
    return response.data.data;
  } catch (err) {
    return [];
  }
}

export async function getFriendships() {
  try {
    const response = await api.get("/friends/");
    return response.data.data;
  } catch (err) {
    return [];
  }
}

export async function deleteFriendship(friendshipId: string) {
  try {
    await api.delete(`/friends/friendship/${friendshipId}`);
  } catch (err) {}
}

export async function getCaregiverData(userId: string) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  } catch (err) {
    return null;
  }
}
