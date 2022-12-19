import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationRepository';
import { GetRecipientNotification } from './getRecipientNotification';
import { makeNotification } from '@test/factories/notificationFactory';

describe('CountRecipientNotification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    const recipientId = randomUUID();
    const otherRecipientId = randomUUID();

    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(
      makeNotification({ recipientId: otherRecipientId }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId,
    });

    expect(notifications.length).toEqual(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
