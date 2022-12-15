import { randomUUID } from 'crypto';
import { Notification } from './notifications';
import { Content } from './content';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    expect(
      new Notification({
        category: 'message',
        content: new Content('You have a new message'),
        recipientId: randomUUID(),
      }),
    ).toBeTruthy();
  });
});
