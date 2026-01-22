import { Link } from "react-router";

function Item({ game }) {
    return (
        <div className="flex flex-col justify-between rounded-xl bg-zinc-800 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
            <div>
                <h3 className="mb-2 text-xl font-semibold text-white">{game.title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{game.studio}</p>
            </div>
            <Link to={`/games/${game.id}`} className="mt-auto inline-block text-sm font-medium text-blue-400 hover:text-blue-300">Read more →</Link>
        </div>
    );
}

export default Item;
