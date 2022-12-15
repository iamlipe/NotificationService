import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a content at notification', () => {
    expect(() => new Content('Seu pedido está a caminho')).toBeTruthy();
  });

  it("shouldn't be abble to create a content with length less than 5 characters", () => {
    expect(() => new Content('less')).toThrow();
  });

  it("shouldn't be able to create a content with length bigger then 240 characters", () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
