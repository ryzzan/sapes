import { FirstAndLastNamePipe } from './first-and-last-name.pipe';

describe('FirstAndLastNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstAndLastNamePipe();
    expect(pipe).toBeTruthy();
  });
});
