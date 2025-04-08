import { CapitalizStringPipe } from './capitaliz-string.pipe';

describe('CapitalizStringPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizStringPipe();
    expect(pipe).toBeTruthy();
  });
});
