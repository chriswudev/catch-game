const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createGame = async (userId, score) => {
  try {
    return await prisma.game.create({
      data: {
        userId,
        score,
      },
    });
  } catch (error) {
    throw new Error('Error creating game');
  }
};

exports.getLeaderboard = async () => {
  try {
    return await prisma.leaderboard.findMany({
      take: 100,
      orderBy: {
        score: 'desc',
      },
      select: {
        userId: true,
        score: true,
        name: true,
      },
    });
  } catch (error) {
    throw new Error('Error fetching leaderboard');
  }
};
