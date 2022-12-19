import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.';

export interface ReadNotificationResquest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: ReadNotificationResquest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
