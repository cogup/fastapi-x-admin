"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastapi_1 = require("@cogup/fastapi");
const index_1 = require("index");
describe('chat', () => {
    let fastAPI;
    beforeAll(async () => {
        fastAPI = new fastapi_1.FastAPI();
        fastAPI.addRoutes(index_1.AdminRouters);
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
