import { Kafka } from "kafkajs";
import prisma from "./db";

export default async function kafka() {
  const kafka = new Kafka({ brokers: ["localhost:9092"] });
  const consumer = kafka.consumer({ groupId: "user-attendance-service" });

  await consumer.connect();
  console.log("Kafka consumer connected to broker");

  await consumer.subscribe({ topic: "student.created", fromBeginning: true });
  console.log("Subscribed to topic: student.created");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const event = JSON.parse(message.value?.toString() || "{}");

        if (
          !event.payload?.rollNumber ||
          !event.payload?.group ||
          !event.payload?.name
        ) {
          console.error("Invalid event payload:", event);
          return;
        }

        await prisma.user.upsert({
          where: { rollNumber: event.payload.rollNumber },
          update: {
            group: event.payload.group,
            name: event.payload.name,
          },
          create: {
            rollNumber: event.payload.rollNumber,
            group: event.payload.group,
            name: event.payload.name,
          },
        });

        console.log(`User processed successfully: ${event.payload.rollNumber}`);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });

  consumer.on("consumer.crash", (event) => {
    console.error("Consumer crashed:", event);
  });

  consumer.on("consumer.disconnect", () => {
    console.warn("Consumer disconnected");
  });
}
