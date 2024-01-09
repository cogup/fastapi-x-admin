"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastapi_1 = require("@cogup/fastapi");
const index_1 = require("index");
describe('chat', () => {
    let fastAPI;
    beforeAll(async () => {
        fastAPI = new fastapi_1.FastAPI({
            routes: [index_1.AdminRouters]
        });
    });
    test('should be able to create a chat', async () => {
        const response = await fastAPI.api.inject({
            method: 'GET',
            url: '/admin'
        });
        expect(response.statusCode).toBe(200);
    });
});
