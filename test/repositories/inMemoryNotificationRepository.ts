import { Notification } from '../../src/application/entities/notifications';
import { NotificationRepository } from '../../src/application/repositories/notificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public list: Notification[] = [];

  async create(notification: Notification) {
    this.list.push(notification);
  }
}
