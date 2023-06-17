import Config from "../../config/config.json";

import io, { Socket } from "socket.io-client";

import { EventType } from "../@types/EventType";
import { ESocketEvents } from "../@types/ESocketEvents";
import { Notifications } from "../services/Notifications";
import { ENotificationPress } from "../@types/NotificationType";
import { AndroidImportance } from "@notifee/react-native";

export class IOHandler {
  public socket: Socket;
  private data: EventType[] = [];
  private notifications: Notifications;

  constructor(token: string) {
    this.notifications = new Notifications();
    this.socket = io(Config.socket_url, {
      path: "/api/v1/socket.io",
      query: {
        token,
      },
    });
  }

  private startListen() {
    this.socket.on("connect", () => {
      console.log("Connection ok");
    });

    this.socket.on(ESocketEvents.NOTIFICATION, (event: EventType) => {
      this.notifications.sendNotification(
        {
          id: "NOTIFICATION",
          name: "Notificações de amigos",
          importance: AndroidImportance.HIGH,
        },
        {
          id: event.id,
          body: event.payload.body,
          title: event.payload.title,
          subtitle: event.payload.from.fullName,
        },
        { icon: event.payload.from.img }
      );
    });

    this.socket.on(ESocketEvents.FRIEND_REQUEST, async (event: EventType) => {
      switch (event.type) {
        case ESocketEvents.ACCEPTED_FRIEND_REQUEST:
          await this.notifications.sendNotification(
            {
              id: "FRIEND_REQUEST",
              name: "Solicitações de amizade",
              importance: AndroidImportance.HIGH,
            },
            {
              id: event.id,
              body: event.payload.body,
              title: event.payload.title,
              subtitle: event.payload.from.fullName,
            },
            {
              icon: event.payload.from.img,
            }
          );
          break;

        case ESocketEvents.FRIEND_REQUEST:
          await this.notifications.sendNotification(
            {
              id: "FRIEND_REQUEST",
              name: "Solicitações de amizade",
              importance: AndroidImportance.HIGH,
            },
            {
              id: event.id,
              body: event.payload.body,
              title: event.payload.title,
              subtitle: event.payload.from.fullName,
            },
            {
              actions: [
                {
                  title: "Aceitar",
                  pressAction: {
                    id: ENotificationPress.ACCEPT_FRIEND_REQUEST,
                  },
                },
                {
                  title: "Recusar",
                  pressAction: {
                    id: ENotificationPress.DECLINE_FRIEND_REQUEST,
                  },
                },
              ],
              icon: event.payload.from.img,
            }
          );
          break;
      }
    });
  }

  public connect() {
    this.startListen();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public consume(): EventType[] {
    const temp = [...this.data];
    this.data = [];
    return temp;
  }

  public publish(event: EventType): void {
    this.socket.emit(event.type, event.payload);
  }
}
