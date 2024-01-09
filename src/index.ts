import {
  Reply,
  Request,
  Get,
  type OpenAPI,
  FastAPI,
  Builder
} from '@cogup/fastapi';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';

const ASSETS_DIR = path.join(__dirname, '../assets');

interface File {
  content: Buffer;
  contentType: string;
}

export class AdminRouters extends Builder {
  openAPISpec?: OpenAPI;
  openAPISpecString?: string;

  onLoad(fastAPI: FastAPI) {
    this.openAPISpec = fastAPI.getOpenAPISpec();
    this.openAPISpecString = JSON.stringify(this.openAPISpec);
  }

  @Get('/admin*')
  async publicRouter(request: Request, reply: Reply): Promise<Reply> {
    const path = request.url.split('?')[0].split('#')[0];
    const filename =
      path === 'admin' || path === 'admin/index.html'
        ? 'index.html'
        : path.replace('/admin/', '');

    if (
      filename === 'index.html' ||
      !this.fileExists(`${ASSETS_DIR}/${filename}`)
    ) {
      const file = this.loadFile(`${ASSETS_DIR}/index.html`);

      // Buffer to utf8 string
      const contentUtf8 = file.content.toString('utf8');

      const content = contentUtf8.replace(
        '</head>',
        `<script>
        window.specification=${this.openAPISpecString};
        window.rootPath='/admin';
        </script></head>`
      );

      return reply.header('Content-Type', file.contentType).send(content);
    } else if (filename === 'admin/manifest.json') {
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

  fileExists(filename: string): boolean {
    try {
      fs.accessSync(filename);
      return true;
    } catch {
      return false;
    }
  }

  loadFile(filename: string): File {
    const content = fs.readFileSync(filename);
    const contentType = mime.lookup(filename);

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
