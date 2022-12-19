import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationRepository';
import { CountRecipientNotification } from './countRecipientNotification';
import { makeNotification } from '@test/factories/notificationFactory';

describe('CountRecipientNotification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const recipientId = randomUUID();
    const otherRecipientId = randomUUID();

    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(
      makeNotification({ recipientId: otherRecipientId }),
    );

    const count = await countRecipientNotification.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
