import { GlobalMiddlewareMiddleware } from './global-middleware.middleware';

describe('GlobalMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new GlobalMiddlewareMiddleware()).toBeDefined();
  });
});
