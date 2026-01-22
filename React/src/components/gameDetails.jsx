import {Navigate, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function GameDetails() {
    const params = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    const getGame = async(id) => {
        try {
            const response = await fetch(`http://145.24.237.145:8000/games/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });
            const data = await response.json();
            setGame(data);
        }
        catch {
            alert("Oepse woepsie stinkie foutie, al overwogen een andere studie te doen?");
        }
    }

    useEffect(() => {
        getGame(params.id);
    }, [params.id]);

    const deleteGame = async () => {
        if (!confirm("Weet je zeker dat je deze game wilt verwijderen?")) return;

        try {
            await fetch(`http://145.24.237.145:8000/games/${params.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json"
                    }
                });

            navigate("/games");
        } catch {
            alert("Verwijderen kan niet door je stinkcode");
        }
    };

    return(
        game ?
            (<section className="mx-auto mt-8 my-48 max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-800">
                    {game?.title ?? "Er is nog geen game"}
                </h1>

                <h2 className="mb-6 text-lg font-medium text-gray-500">
                    Door: {game?.studio ?? "Nee echt niets"}
                </h2>

                <p className="text-lg leading-relaxed text-gray-700">
                    {game?.description ?? "Dus stop proberen"}
                </p>
                <button
                    onClick={deleteGame}
                    className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    Verwijder game
                </button>
            </section>)
            : (navigate("*"))
    )
}

export default GameDetails