import { Reply, Request, MakeRouters, type OpenAPI, FastAPI } from '@cogup/fastapi';
interface File {
    content: string;
    contentType: string;
}
export declare class AdminRouters extends MakeRouters {
    openAPISpec?: OpenAPI;
    openAPISpecString?: string;
    onLoad(fastAPI: FastAPI): void;
    apiRouter(_request: Request, reply: Reply): Promise<Reply>;
    publicRouter(request: Request, reply: Reply): Promise<Reply>;
    fileExists(filename: string): boolean;
    loadFile(filename: string): File;
}
export {};
