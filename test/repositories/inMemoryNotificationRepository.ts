import { Notification } from '@application/entities/notifications';
import { NotificationRepository } from '@application/repositories/notificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public list: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.list.find((item) => item.id === notificationId);

    if (!notification) return null;

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.list.filter((item) => item.recipientId === recipientId);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.list.filter((item) => item.recipientId === recipientId).length;
  }

  async create(notification: Notification) {
    this.list.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.list.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) this.list[notificationIndex] = notification;
  }
}
