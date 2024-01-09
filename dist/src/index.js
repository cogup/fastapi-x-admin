"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouters = void 0;
const fastapi_1 = require("@cogup/fastapi");
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = __importDefault(require("path"));
const ASSETS_DIR = path_1.default.join(__dirname, '../assets');
class AdminRouters extends fastapi_1.Builder {
    openAPISpec;
    openAPISpecString;
    onLoad(fastAPI) {
        this.openAPISpec = fastAPI.getOpenAPISpec();
        this.openAPISpecString = JSON.stringify(this.openAPISpec);
    }
    async publicRouter(request, reply) {
        const path = request.url.split('?')[0].split('#')[0];
        const filename = path === 'admin' || path === 'admin/index.html'
            ? 'index.html'
            : path.replace('/admin/', '');
        if (filename === 'index.html' ||
            !this.fileExists(`${ASSETS_DIR}/${filename}`)) {
            const file = this.loadFile(`${ASSETS_DIR}/index.html`);
            // Buffer to utf8 string
            const contentUtf8 = file.content.toString('utf8');
            const content = contentUtf8.replace('</head>', `<script>
        window.specification=${this.openAPISpecString};
        window.rootPath='/admin';
        </script></head>`);
            return reply.header('Content-Type', file.contentType).send(content);
        }
        else if (filename === 'admin/manifest.json') {
            return reply.header('Content-Type', 'application/json').send({
                short_name: this.openAPISpec?.info?.title || 'FastApi API',
                name: this.openAPISpec?.info?.title || 'FastApi API',
                icons: [
                    {
                        src: '/icons/64.png',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon'
                    },
                    {
                        src: '/icons/192.png',
                        type: 'image/png',
                        sizes: '192x192'
                    },
                    {
                        src: '/icons/512.png',
                        type: 'image/png',
                        sizes: '512x512'
                    }
                ],
                start_url: '/admin',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff'
            });
        }
        const file = this.loadFile(`${ASSETS_DIR}/${filename}`);
        return reply.header('Content-Type', file.contentType).send(file.content);
    }
    fileExists(filename) {
        try {
            fs_1.default.accessSync(filename);
            return true;
        }
        catch {
            return false;
        }
    }
    loadFile(filename) {
        const content = fs_1.default.readFileSync(filename);
        const contentType = mime_types_1.default.lookup(filename);
        if (!contentType) {
            return {
                content,
                contentType: 'text/plain'
            };
        }
        return {
            content,
            contentType
        };
    }
}
exports.AdminRouters = AdminRouters;
__decorate([
    (0, fastapi_1.Get)('/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminRouters.prototype, "publicRouter", null);
