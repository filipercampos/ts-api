module.exports = {
  apps: [
    {
      name: "tfs-api",
      script: 'dist/server.js',
      max_memory_restart: '300M',
      watch: true,
      env: {
        "NODE_ENV": "production",
      },
      env_dev: {
        "NODE_ENV": "development"
      } 
    },
  ]
};
