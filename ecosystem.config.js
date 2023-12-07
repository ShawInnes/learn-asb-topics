module.exports = {
  apps: [
    {
      name: "producer",
      script: "build/producer.js",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-all",
      script: "build/consumer-all.js",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-male",
      script: "build/consumer-male.js",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "consumer-female",
      script: "build/consumer-female.js",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
