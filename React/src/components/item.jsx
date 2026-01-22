import {Link} from "react-router";

function Item({game}) {
    return (
        <>
            <div className="rounded-xl bg-white p-4 shadow">
                <h3 className="text-2xl font-bold text-gray-800">
                    {game.title}
                </h3>
                <p className="text-sm text-gray-500">
                    {game.studio}
                </p>
                <Link to={`/notes/${game.id}`}>Read more</Link>
            </div>
        </>
    )
}

export default Item;