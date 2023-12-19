import { FastAPI } from '@cogup/fastapi';
import { AdminRouters } from 'index';

describe('chat', () => {
  let fastAPI: FastAPI;

  beforeAll(async () => {
    fastAPI = new FastAPI() as FastAPI;

    fastAPI.addRoutes(AdminRouters);
    fastAPI.loadRoutes();
  });

  test('should be able to create a chat', async () => {
    const response = await fastAPI.api.inject({
      method: 'GET',
      url: '/admin'
    });

    expect(response.statusCode).toBe(200);
  });
});
