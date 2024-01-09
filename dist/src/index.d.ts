/// <reference types="node" />
import { Reply, Request, type OpenAPI, FastAPI, Builder } from '@cogup/fastapi';
interface File {
    content: Buffer;
    contentType: string;
}
export declare class AdminRouters extends Builder {
    openAPISpec?: OpenAPI;
    openAPISpecString?: string;
    onLoad(fastAPI: FastAPI): void;
    publicRouter(request: Request, reply: Reply): Promise<Reply>;
    fileExists(filename: string): boolean;
    loadFile(filename: string): File;
}
export {};
