import {
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusMessageBatch,
} from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const filter = "male";

const connectionString =
  process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const topicName = process.env.TOPIC_NAME || "<topic name>";

console.log(`starting ${filter} consumer`);

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  console.log(`creating ${filter} receiver`);
  const receiver = sbClient.createReceiver(topicName, `consumer-${filter}`, {
    receiveMode: "peekLock",
  });

  console.log("waiting for messages");
  while (true) {
    const receivedMessages = await receiver.receiveMessages(10);

    for (const receivedMessage of receivedMessages) {
      const body = receivedMessage.body;
      console.log(`[${filter}] ${body.name} --> ${body.gender}`);
      await receiver.completeMessage(receivedMessage);
    }
  }
}

main()
  .then(() => {
    console.log("main process has completed");
  })
  .catch((err) => {
    console.log("receiveMessages Sample: Error occurred: ", err);
    process.exit(1);
  });
