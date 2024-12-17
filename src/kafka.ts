import { Kafka } from "kafkajs";
import prisma from "./db";

export default async function kafka() {
  const kafka = new Kafka({ brokers: ["localhost:9092"] });
  const consumer = kafka.consumer({ groupId: "user-attendance-service" });

  await consumer.connect();
  console.log("Kafka consumer connected to broker");

  await consumer.subscribe({ topic: "student.created", fromBeginning: true });
  await consumer.subscribe({ topic: "student.deleted", fromBeginning: true });
  console.log("Subscribed to topics: student.created, student.deleted");

  await consumer.run({
    eachMessage: async ({ topic, message , partition }) => {
      try {
        const event = JSON.parse(message.value?.toString() || "{}");
        console.log(`Processing event from topic ${topic}:`, event);

        await studentHandler(topic, event);
        console.log(`Event processed successfully: ${event.rollNumber}`);
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
}

async function studentHandler(topic: string, event: any) {
  if (topic === "student.created") {
    if (!isValidStudentCreatedEvent(event)) {
      console.error("Invalid student.created event payload:", event);
      return;
    }

    await prisma.user.upsert({
      where: { rollNumber: event.rollNumber },
      update: {
        group: event.group,
        name: event.name,
      },
      create: {
        rollNumber: event.rollNumber,
        group: event.group,
        name: event.name,
      },
    });
  } else if (topic === "student.deleted") {
    if (!isValidStudentDeletedEvent(event)) {
      console.error("Invalid student.deleted event payload:", event);
      return;
    }

    await prisma.user.delete({
      where: {
        rollNumber: event.rollNumber,
      },
    });
  }
}

function isValidStudentCreatedEvent(event: any) {
  return (
    typeof event.rollNumber === "string" &&
    typeof event.group === "string" &&
    typeof event.name === "string"
  );
}

function isValidStudentDeletedEvent(event: any) {
  return typeof event.rollNumber === "string";
}
