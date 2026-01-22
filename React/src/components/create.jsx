import {useState} from "react";
import {useNavigate} from "react-router";
import {applescript} from "globals";
function CreateGame() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        studio: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://145.24.237.145:8000/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
            });

            navigate("/games");
        } catch (e) {
            console.error(e);
            alert("POST failed!");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6 my-18 shadow-lg max-w-1/3 m-auto">
                <div className="space-y-1">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titel</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="studio" className="block text-sm font-medium text-gray-700">Studio</label>
                    <input
                        type="text"
                        id="studio"
                        name="studio"
                        value={formData.studio}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschrijving</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                </div>

                <button type="submit"
                        className="w-full rounded-lg bg-zinc-800 px-4 py-2 font-semibold text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2">
                    Create
                </button>
            </form>
        </>
    )
}

export default CreateGame