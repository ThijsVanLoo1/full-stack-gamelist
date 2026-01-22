import {Link, Outlet} from "react-router";

function Layout() {
    return (
        <>
            <header>
                <nav className="flex justify-start gap-4 p-4">
                    <Link to="/" className="bg-yellow-500 text-amber-50 rounded-xl px-4 py-2 text-xl hover:bg-amber-600 hover:ease-in-out duration-300">Home</Link>
                    <Link to="/games" className="bg-yellow-500 text-amber-50 rounded-xl px-4 py-2 text-xl hover:bg-amber-600 hover:ease-in-out duration-300">Collection</Link>
                    <Link to="/games/create" className="bg-yellow-500 text-amber-50 rounded-xl px-4 py-2 text-xl hover:bg-amber-600 hover:ease-in-out duration-300">Create</Link>
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