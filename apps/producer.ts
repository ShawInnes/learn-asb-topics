import {
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusMessageBatch,
} from "@azure/service-bus";

import fs from "fs";
import path from "path";

import cron from "node-cron";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = process.env.TOPIC_NAME || "<topic name>";

var people: any[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./people.json"), "utf-8")
);

console.log("starting producer");

cron.schedule("*/10 * * * * *", async () => {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(topicName);

  console.log("select a random record");
  const peopleIndex = getRandomInt(0, people.length - 1);

  const randomPeople = people.slice(peopleIndex, peopleIndex + 1);

  const messageBatch = randomPeople.map(
    (p) =>
      ({
        contentType: "application/json",
        timeToLive: 20 * 60 * 1000, // message expires in 20 minutes
        subject: p.fields.name,
        applicationProperties: {
          gender: p.fields.gender,
        },
        body: { ...p.fields, id: p.pk },
      } as ServiceBusMessage)
  );
  console.log("messageBatch", messageBatch);

  try {
    // Sends all messages using one or more ServiceBusMessageBatch objects as required
    let batch: ServiceBusMessageBatch = await sender.createMessageBatch();

    for (const message of messageBatch) {
      if (!batch.tryAddMessage(message)) {
        // Send the current batch as it is full and create a new one
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();

        if (!batch.tryAddMessage(message)) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    // Send the batch
    console.log(`Sending the batch of people (as a ServiceBusMessageBatch)`);
    await sender.sendMessages(batch);

    // Close the sender
    console.log(`send complete`);
    await sender.close();
  } finally {
    await sbClient.close();
  }
});
