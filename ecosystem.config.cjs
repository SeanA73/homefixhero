const path = require("path");

const ROOT = __dirname;
const PORT = 3002;

module.exports = {
  apps: [
    {
      name: "homefixhero",
      script: path.join(ROOT, "node_modules/.bin/next"),
      args: ["start", "-p", String(PORT)],
      cwd: ROOT,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        PORT: String(PORT),
        NODE_ENV: "production",
      },
      error_file: path.join(ROOT, "logs/err.log"),
      out_file: path.join(ROOT, "logs/out.log"),
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000,
    },
  ],
};
