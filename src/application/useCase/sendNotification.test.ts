import { SendNotification } from './sendNotification';
import { InMemoryNotificationRepository } from '../../../test/repositories/inMemoryNotificationRepository';
import { randomUUID } from 'crypto';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      category: 'social',
      content: 'You have a new friend request',
    });

    expect(notificationRepository.list).toHaveLength(1);
    expect(notificationRepository.list[0] === notification).toBeTruthy();
  });
});
