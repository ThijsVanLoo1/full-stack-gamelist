function Home() {
    return (
        <>
            <div className="flex justify-center px-4 my-41">
                <div className="max-w-3xl from-indigo-50 to-white border border-indigo-100 rounded-2xl shadow-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to my first Fullstack project
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        This project is part of the final assignment for fullstack development.
                        The front-end of this website is built using React and the back-end handles
                        my own webservice with data built in Express.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Home;