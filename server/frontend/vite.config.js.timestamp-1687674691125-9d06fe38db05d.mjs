// vite.config.js
import { defineConfig } from "file:///home/triple/Downloads/python-p4-iam-putting-it-all-together-lab-solution/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///home/triple/Downloads/python-p4-iam-putting-it-all-together-lab-solution/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
    // '/socket.io': {
    //   target: 'http://localhost:8000',
    //   ws: true
    // }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90cmlwbGUvRG93bmxvYWRzL3B5dGhvbi1wNC1pYW0tcHV0dGluZy1pdC1hbGwtdG9nZXRoZXItbGFiLXNvbHV0aW9uL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS90cmlwbGUvRG93bmxvYWRzL3B5dGhvbi1wNC1pYW0tcHV0dGluZy1pdC1hbGwtdG9nZXRoZXItbGFiLXNvbHV0aW9uL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3RyaXBsZS9Eb3dubG9hZHMvcHl0aG9uLXA0LWlhbS1wdXR0aW5nLWl0LWFsbC10b2dldGhlci1sYWItc29sdXRpb24vZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgIFxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gJy9zb2NrZXQuaW8nOiB7XG4gICAgLy8gICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICAgIC8vICAgd3M6IHRydWVcbiAgICAvLyB9XG5cblxuXG4gIFxufVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd2EsU0FBUyxvQkFBb0I7QUFDcmMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUVqQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxNQUdoQjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0o7QUFDQSxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
