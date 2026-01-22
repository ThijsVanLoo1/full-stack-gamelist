import {Link, Outlet} from "react-router";

function Layout() {
    return (
        <>
            <header className="bg-zinc-950 shadow-lg">
                <nav className="flex max-w-7xl items-center gap-4 p-4">
                    <Link to="/" className="rounded-xl bg-zinc-900 px-5 py-2 text-lg font-medium text-zinc-200 shadow transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:text-white">Home</Link>
                    <Link to="/games" className="rounded-xl bg-zinc-900 px-5 py-2 text-lg font-medium text-zinc-200 shadow transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:text-white">Collection</Link>
                    <Link to="/games/create" className="rounded-xl bg-zinc-900 px-5 py-2 text-lg font-medium text-zinc-200 shadow transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:text-white">Create</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Fullstack-Gamelist
                        </h2>
                        <p className="text-xs text-gray-400">
                            Made with love
                        </p>
                    </div>
                    <div>
                        <ul className="flex space-x-6 text-sm">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#" className="hover:text-white transition">Collection</a></li>
                            <li><a href="#" className="hover:text-white transition">Create</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 py-2 text-center text-xs text-gray-500">
                    © 2026 Fullstack-Gamelist.
                </div>
            </footer>
        </>
    )
}

export default Layout;