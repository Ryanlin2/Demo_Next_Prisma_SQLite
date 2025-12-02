// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear existing data for repeatable seeds
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  const appetizers = await prisma.category.create({
    data: {
      name: "Appetizers",
      description: "Start your meal right",
      sortOrder: 1,
    },
  });

  const noodles = await prisma.category.create({
    data: {
      name: "Noodles",
      description: "Freshly made noodles",
      sortOrder: 2,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Spring Rolls",
        chineseName: "春卷",
        description: "Crispy vegetarian rolls",
        price: 5.99,
        isAvailable: true,
        spiceLevel: "mild",
        categoryId: appetizers.id,
      },
      {
        name: "Spicy Wontons",
        chineseName: "红油抄手",
        description: "Pork wontons in chili oil",
        price: 7.5,
        isAvailable: true,
        spiceLevel: "hot",
        categoryId: appetizers.id,
      },
      {
        name: "Beef Chow Fun",
        chineseName: "干炒牛河",
        description: "Stir-fried flat rice noodles with beef",
        price: 13.99,
        isAvailable: true,
        spiceLevel: "medium",
        categoryId: noodles.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeded data 🌶️");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
