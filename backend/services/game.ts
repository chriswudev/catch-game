const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const createGame = async (userId: string, score: number) => {
  try {
    return await prisma.game.create({
      data: {
        userId,
        score,
      },
    });
  } catch (error) {
    throw new Error("Error creating game");
  }
};

export const getLeaderboard = async (count: number | null) => {
  const param: any = {
    orderBy: {
      score: "desc",
    },
    select: {
      id: true,
      userId: true,
      score: true,
    },
  };
  if (count) {
    param.take = count;
  }
  try {
    return await prisma.game.findMany(param);
  } catch (error) {
    throw new Error("Error fetching leaderboard");
  }
};
