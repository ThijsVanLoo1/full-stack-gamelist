import {useState, useEffect} from "react";
import Item from "./item.jsx";

const [games, setGames] = useState([]);
const getGames = async() => {
    try {
        const response = await fetch("http://145.24.237.145/games",
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

function Collection() {
    return (
        <>
            <section>
                {games.map((game) => (
                    <Item key={game.id} game={game} />
                ))}
            </section>
        </>
    )
}

export default Collection;
