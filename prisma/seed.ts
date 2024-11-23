import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = ['produtividade', 'gestao', 'marketing']

  for (const name of categories) {
    await prisma.category.upsert({
      where: { id: name }, // Usando o name como id já que é único
      update: {},
      create: {
        id: name,
        name,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
