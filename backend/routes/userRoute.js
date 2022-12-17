const { Router } = require('express');
const prismaClient = require('../prisma/client');

const router = Router();

router.post('/:name', async (req, res) => {
  const user = req.params.name;
  await prismaClient.$connect();
  let dbUser;
  dbUser = await prismaClient.user.findFirst({
    where: {
      username: user,
    },
    include: {
      textData: {
        select: {
          id: true,
          data: true,
        },
      },
    },
  });

  if (!dbUser) {
    dbUser = await prismaClient.user.create({
      data: { username: user },
      include: {
        textData: true,
      },
    });
  }

  await prismaClient.$disconnect();

  return res.status(201).json(dbUser);
});

router.post('/:name/:title', async (req, res) => {
  const user = req.params.name;
  const body = req.body;

  await prismaClient.$connect();

  const data = await prismaClient.user.update({
    where: {
      username: user,
    },
    data: {
      textData: { create: { data: body.data } },
    },
    include: {
      textData: true,
    },
  });
  await prismaClient.$disconnect();
  res.status(201).send(data);
});

router.get('/:name/:id/get', async (req, res) => {
  const { name, id } = req.params;
  await prismaClient.$connect();

  const data = await prismaClient.textData.findFirst({
    where: {
      id: id,
      AND: {
        author: {
          username: name,
        },
      },
    },
  });

  await prismaClient.$disconnect();
  res.status(200).send(data);
});

exports.router = router;
