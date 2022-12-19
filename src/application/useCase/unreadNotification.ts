import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.';

export interface UnreadNotificationResquest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: UnreadNotificationResquest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
