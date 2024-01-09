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
});
