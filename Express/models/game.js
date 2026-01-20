import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
        title: { type: String, required: true },
        studio: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {
                ret._links = {
                    self: {
                        href: `${process.env.BASE_URI}${ret._id}`,
                    },
                    collection: {
                        href: `${process.env.BASE_URI}`,
                    },
                };

                delete ret._id;
            },
        },
    }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;