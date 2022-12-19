import { Content } from '@application/entities/content';
import { randomUUID } from 'crypto';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: randomUUID(),
    category: 'social',
    content: new Content('this is a notific'),
    ...override,
  });
}
