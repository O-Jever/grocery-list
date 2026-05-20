import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function reactDevtoolsPlugin() {
  return {
    name: 'inject-react-devtools',
    transformIndexHtml(html: string, ctx: { server?: unknown }) {
      if (!ctx.server) return html;
      return html.replace(
        '<head>',
        '<head>\n    <script src="http://localhost:8097"></script>',
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), reactDevtoolsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/shared/config/test/setupTests.ts',
  },
});
