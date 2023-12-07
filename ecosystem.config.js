module.exports = {
  apps: [
    {
      name: "producer",
      cwd: "apps",
      script : "producer.ts",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer1",
      cwd: "apps",
      script : "consumer.ts",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
