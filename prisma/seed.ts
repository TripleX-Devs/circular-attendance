import prisma from "../src/db";
import fs from "node:fs";
import path from "node:path";

const filePath = path.join(__dirname, "data.json");

async function seedSubjects() {
  try {
    await prisma.subject.upsert({
      where: { subject_code: "EE-101" },
      create: {
        subject_name: "BEE",
        subject_code: "EE-101",
        total_classes: 100,
      },
      update: {},
    });

    await prisma.subject.upsert({
      where: { subject_code: "EE-102" },
      create: {
        subject_name: "JAVA",
        subject_code: "EE-102",
        total_classes: 100,
      },
      update: {},
    });

    await prisma.subject.upsert({
      where: { subject_code: "EE-103" },
      create: {
        subject_name: "C++",
        subject_code: "EE-103",
        total_classes: 100,
      },
      update: {},
    });
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedData() {
  const data = fs.readFileSync(filePath, "utf-8");
  const students = JSON.parse(data);

  const sub_ids = await prisma.subject.findMany({
    select: {
      subject_id: true,
      subject_name: true,
    },
  });
  const sub_id_map = new Map(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    sub_ids.map((sub: any) => [sub.subject_name, sub.subject_id]),
  );

  interface UserAttendance {
    roll_Number: string;
    group: string;
    subjectid: string;
    present_Days?: number;
    current_classes?: number;
    absent_Days?: number;
  }

  interface Student {
    roll_number: string;
    group_name: string;
    subject_name: string;
    date: Date;
    present: boolean;
  }
  const userAttendances: UserAttendance[] = students.map(
    (student: Student) => ({
      roll_Number: student.roll_number,
      group: student.group_name,
      subjectid: sub_id_map.get(student.subject_name),
      present_Days: 30,
      current_classes: 50,
      absent_Days: 20,
    }),
  );
  console.log(userAttendances.length);

  await prisma.userAttendance.createMany({
    data: userAttendances,
  });

  interface Attendance {
    roll_Number: string;
    subject_id: string;
    present: boolean;
    date: Date;
  }

  const attendances: Attendance[] = students.map((student: Student) => ({
    roll_Number: student.roll_number,
    subject_id: sub_id_map.get(student.subject_name),
    present: student.present,
    date: student.date,
  }));

  await prisma.attendance.createMany({
    data: attendances,
  });
}

async function seedDatabase() {
  try {
    await seedSubjects();
    await seedData();
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
