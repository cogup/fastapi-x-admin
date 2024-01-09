import { FastAPI } from '@cogup/fastapi';
import { AdminRouters } from 'index';

describe('chat', () => {
  let fastAPI: FastAPI;

  beforeAll(async () => {
    fastAPI = new FastAPI({
      routes: [AdminRouters]
    });
  });

  test('open admin', async () => {
    const response = await fastAPI.api.inject({
      method: 'GET',
      url: '/admin'
    });

    expect(response.statusCode).toBe(200);
  });

  test('open manifest', async () => {
    const response = await fastAPI.api.inject({
      method: 'GET',
      url: '/admin/manifest.json'
    });

    expect(response.statusCode).toBe(200);
  });

  test('open robots.txt', async () => {
    const response = await fastAPI.api.inject({
      method: 'GET',
      url: '/admin/robots.txt'
    });

    expect(response.statusCode).toBe(200);
  });

  test('open health', async () => {
    const response = await fastAPI.api.inject({
      method: 'GET',
      url: '/health'
    });

    expect(response.statusCode).toBe(200);
  });
});
