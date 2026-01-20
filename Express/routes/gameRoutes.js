import {Router} from "express";
import {faker} from "@faker-js/faker/locale/nl";
import Game from "../models/game.js";

const router = Router();

router.get("/", async (req, res) => {
    const games = await Game.find({}, '-description');

    const collection = {
        items: games,
        _links: {
            self: {
                href: `${process.env.BASE_URI}`,
            },
            collection: {
                href: `${process.env.BASE_URI}`,
            },
        }
    }

    res.json(collection);
})

//POST overload
router.post("/", async (req, res, next) => {
    if(req.body?.method && req.body?.method === "SEED") {

        await Game.deleteMany({});
        const games = [];

        const amount = req.body?.amount ?? 10;
        for (let i = 0; i < amount; i++) {
            const game = Game({
                title: faker.lorem.words(),
                description: faker.lorem.text(),
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
        const game = await game.findByIdAndUpdate(
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