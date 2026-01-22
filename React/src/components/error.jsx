function Error() {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
                <h1 className="text-9xl font-extrabold tracking-tight text-red-600 drop-shadow-lg">
                    404
                </h1>

                <p className="mt-4 text-2xl font-semibold text-zinc-200">
                    Pagina niet gevonden
                </p>

                <img src="https://media.tenor.com/qUd2T4szitkAAAAM/roblox-oof.gif" alt="Roblox guy dies" />

                <a href="/" className="mt-8 rounded-xl bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700 hover:-translate-y-0.5">
                    Terug naar home
                </a>
            </div>
        </>
    );
}

export default Error