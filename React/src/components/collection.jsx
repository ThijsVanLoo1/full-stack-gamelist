import {useState, useEffect} from "react";
import Item from "./item.jsx";

function Collection() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const getGames = async() => {
        try {
            const params = new URLSearchParams({ page, limit });
            const response = await fetch(`http://145.24.237.145:8000/games?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });
            const data = await response.json();
            setGames(data.items);
            setTotalPages(data.pagination.totalPages);
        }
        catch {
            alert("Oepse woepsie stinkie foutie, al overwogen een andere studie te doen?");
        }
    }

    useEffect(() => {
        getGames();
    }, [page]);

    return (
        <>
            <div className="relative">
                {/* LEFT BUTTON */}
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page <= 1}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded disabled:opacity-50 z-10"
                >
                    &lt;
                </button>

                {/* GRID SECTION */}
                <section className="grid grid-cols-1 gap-6 p-6 mx-12 sm:grid-cols-2 lg:grid-cols-3">
                    {games.map((game) => (
                        <Item key={game.id} game={game} />
                    ))}
                </section>

                {/* RIGHT BUTTON */}
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded disabled:opacity-50 z-10"
                >
                    &gt;
                </button>
            </div>
        </>

)
}

export default Collection;
