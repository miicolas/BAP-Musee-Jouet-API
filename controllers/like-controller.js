import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getLikes = async (req, res) => {
    try {
        const likes = await prisma.like.findMany();
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ error: "Error getting likes" });
    }
};

export const addLike = async (req, res) => {
    try {

        const { rating } = req.body;
        console.log(rating, 'rating');

        const like = await prisma.like.create({
            data: {
                rating: rating,
                createdAt: new Date(),
            },
        });
        console.log(like);
        res.status(201).json(like);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error adding like" });
    }
}
