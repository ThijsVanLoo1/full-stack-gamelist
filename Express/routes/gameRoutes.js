import {Router} from "express";
import {faker} from "@faker-js/faker/locale/nl";
import Game from "../models/game.js";

const router = Router();

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let games;
    let totalItems = await Game.countDocuments();
    let totalPages = Math.ceil(totalItems / limit);

    if (!limit) {
        games = await Game.find({}, "-description");
    } else {
        const skip = (page - 1) * limit;

        games = await Game.find({}, "-description")
            .skip(skip)
            .limit(limit);
    }

    const buildLink = (pageNumber) => ({
        page: pageNumber,
        href: `http://${process.env.BASE_URI}/?page=${pageNumber}&limit=${limit}`
    });

    const collection = {
        items: games,
        _links: {
            self: {
                href: `${process.env.BASE_URI}?page=${page}${limit ? `&limit=${limit}` : ""}`,
            },
            collection: {
                href: `${process.env.BASE_URI}`,
            },
        },
        pagination: {
            currentPage: page,
            currentItems: limit,
            totalPages: totalPages,
            totalItems: totalItems,
            _links: {
                first: {
                    page: 1,
                    href: buildLink(1)
                },
                last: {
                    page: totalPages,
                    href: buildLink(totalPages)
                },
                previous: page > 1
                    ? {
                        page: page - 1,
                        href: buildLink(page - 1)
                    }
                    : null,
                next: page < totalPages
                    ? {
                        page: page + 1,
                        href: buildLink(page + 1)
                    }
                    : null
            }
        }
    };

    res.json(collection);
});

//POST overload
router.post("/", async (req, res, next) => {
    if(req.body?.method && req.body?.method === "SEED") {

        await Game.deleteMany({});
        const games = [];

        const amount = req.body?.amount ?? 10;
        for (let i = 0; i < amount; i++) {
            const game = Game({
                title: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                studio: faker.company.name()
            })

            game.save();
            games.push(game);
        }

        res.json(games);
    } else {
        next()
    }
})

router.post("/", (req, res) => {
    if(req.body?.description && req.body?.title && req.body?.studio) {
        const game = Game({
            title: req.body.title,
            studio: req.body.studio,
            description: req.body.description
        })

        game.save();
        res.status(201);

        res.json(game);
    } else {
        res.status(422).json( {
            message: "Oepse stinkie foutie ga andere hobby zoeken"
        })
    }
})

router.get("/:id", async (req, res) => {
    const gameId = req.params.id;

    try {
        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.json(game);
    } catch (e) {
        res.status(404).send();
    }
})

// CORS middleware
router.options("/", (req, res, next) => {
    res.header('Allow', "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.status(204).send();
});

router.options("/:id", (req, res, next) => {
    res.header('Allow', "GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204).send();
});

router.put("/:id", async (req, res) => {
    const { title, studio, description } = req.body;

    if (!title || !studio || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            { title, studio, description },
            { new: true, runValidators: true }
        );

        if (!game) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.json(game);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID or data" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);

        if (!game) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

export default router;