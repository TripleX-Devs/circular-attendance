import prisma from "../src/db";


async function seedSubjects() {
  try {
    await prisma.subject.upsert({
      where: { subjectCode: "EE-101" },
      create: {
        subjectName: "BEE",
        subjectCode: "EE-101",
        totalClasses: 100,
      },
      update: {},
    });

    await prisma.subject.upsert({
      where: { subjectCode: "EE-102" },
      create: {
        subjectName: "JAVA",
        subjectCode: "EE-102",
        totalClasses: 100,
      },
      update: {},
    });

    await prisma.subject.upsert({
      where: { subjectCode: "EE-103" },
      create: {
        subjectName: "C++",
        subjectCode: "EE-103",
        totalClasses: 100,
      },
      update: {},
    });
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    await seedSubjects();
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error("An unexpected error occurred during seeding:", error);
  process.exit(1);
});
