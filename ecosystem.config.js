module.exports = {
  apps: [
    {
      name: "producer",
      cwd: "build",
      script: "apps/producer.ts",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-all",
      cwd: "build",
      script: "apps/consumer-all.ts",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-male",
      cwd: "build",
      script: "apps/consumer-male.ts",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-female",
      cwd: "build",
      script: "apps/consumer-female.ts",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
