import { CancelNotification } from './cancelNotification';
import { InMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationRepository';
import { makeNotification } from '@test/factories/notificationFactory';

describe('CancelNotification', () => {
  it('should be able to cancel notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.list[0].cancelAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a non notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'this is not a valid id',
      });
    }).rejects.toThrow('notification not found');
  });
});
