import { UnreadNotification } from './unreadNotification';
import { InMemoryNotificationRepository } from '@test/repositories/inMemoryNotificationRepository';
import { makeNotification } from '@test/factories/notificationFactory';

describe('UneadNotificationUseCase', () => {
  it('should be able to unread notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.list[0].readAt).toBeNull();
  });

  it('should not be able to unread a non notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'this is not a valid id',
      });
    }).rejects.toThrow('notification not found');
  });
});
