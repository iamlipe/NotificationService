import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound.';

export interface CancelNotificationResquest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: CancelNotificationResquest): Promise<void> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
