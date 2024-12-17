import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLikes = async (req, res) => {
  try {
    const likes = await prisma.like.findMany();
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({
      error: error.message || "Error getting likes",
      details: error.meta || null,
    });
  }
};

export const addLike = async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating === undefined || typeof rating !== "number") {
      return res
        .status(400)
        .json({ error: "Rating is required and must be a number" });
    }

    const like = await prisma.like.create({
      data: {
        rating: rating,
        createdAt: new Date(),
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error("Error adding like:", error);

    if (error.code) {
      res.status(400).json({
        error: "Prisma error occurred",
        code: error.code,
        message: error.message,
        details: error.meta || null,
      });
    } else {
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }
};
