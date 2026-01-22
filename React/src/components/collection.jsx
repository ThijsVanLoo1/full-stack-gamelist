import {useState, useEffect} from "react";
import Item from "./item.jsx";

function Collection() {
    const [games, setGames] = useState([]);
    const getGames = async() => {
        try {
            const response = await fetch("http://145.24.237.145:8000/games",
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });
            const data = await response.json();
            setGames(data.items);
        }
        catch {
            alert("Oepse woepsie stinkie foutie, al overwogen een andere studie te doen?");
        }
    }

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <section className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                    <Item key={game.id} game={game} />
                ))}
            </section>
        </>
    )
}

export default Collection;
