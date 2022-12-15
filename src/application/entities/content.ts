export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateContent(value: string): boolean {
    return value.length >= 5 && value.length <= 240;
  }

  constructor(value: string) {
    const isValidContent = this.validateContent(value);

    if (!isValidContent) {
      throw new Error('Content length error');
    }

    this.content = value;
  }
}
