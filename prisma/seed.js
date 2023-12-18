import prisma from "../../database/prisma.js";

export const users = [
  {
    name: 'Admin user',
    email: 'dipesh@mailinator.com',
    role: 'ADMIN',
  },
  {
    name: 'User',
    email: 'subashish@mailinator.com',
    role: 'USER',
  },
  {
    name: 'Manjul Tamrakar',
    email: 'manjultamrakar4@gmail.com',
    role: 'ADMIN',
  }
];

const loadUser = async () => {
    for await (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    }
  
    console.log('Users inserted in database successfully');
  };

async function main() {
  await loadUser();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.log(error);
    await prisma.$disconnect();
  });
