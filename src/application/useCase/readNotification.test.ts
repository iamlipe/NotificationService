import { ReadNotification } from './readNotification';
import { InMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationRepository';
import { makeNotification } from '@test/factories/notificationFactory';

describe('ReadNotification', () => {
  it('should be able to read notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.list[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'this is not a valid id',
      });
    }).rejects.toThrow('notification not found');
  });
});
