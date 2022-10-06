import config$ from '../config';
const { APP_ID } = config$;
//
describe('@test:unit', () => {
  describe('@boots', () => {
    it('.env online', () => {
      expect(APP_ID).toBe('app000');
    });
  });
});
