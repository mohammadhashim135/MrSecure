import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [savedPasswords, setSavedPasswords] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [buttonImage, setButtonImage] = useState("src/assets/Dashboard.gif");

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
        setSavedPasswords(storedPasswords);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => toast.success("Copied to clipboard!", { position: "top-right" }))
            .catch((err) => console.error("Failed to copy:", err));
    };

    const isPasswordValid = (pwd) => {
        return pwd.length >= 8 && /\d/.test(pwd) && /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    };

    const savePassword = () => {
        if (!website || !username || !password) {
            toast.error("All fields are required!", { position: "top-right" });
            return;
        }
        if (!isPasswordValid(password)) {
            toast.error("Password must be at least 8 characters long and include a number & special character.", { position: "top-right" });
            return;
        }

        const newEntry = { website, username, password };

        if (editingIndex !== null) {
            // Update existing entry
            const updatedPasswords = [...savedPasswords];
            updatedPasswords[editingIndex] = newEntry;
            setSavedPasswords(updatedPasswords);
            setEditingIndex(null); // Exit edit mode
            toast.success("Password updated successfully!", { position: "top-right" });
        } else {
            // Add new entry
            const updatedPasswords = [...savedPasswords, newEntry];
            setSavedPasswords(updatedPasswords);
            toast.success("Password added successfully!", { position: "top-right" });
        }

        localStorage.setItem("passwords", JSON.stringify([...savedPasswords, newEntry]));

        setWebsite("");
        setUsername("");
        setPassword("");

        // Change button image to unlink.gif and reset after 1 second
        setButtonImage("src/assets/unlink.gif");
        setTimeout(() => {
            setButtonImage("src/assets/Dashboard.gif");
        }, 500);
    };

    const deletePassword = (index) => {
        if (window.confirm("Are you sure you want to delete this password?")) {
            const updatedPasswords = savedPasswords.filter((_, i) => i !== index);
            setSavedPasswords(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast.success("Password deleted successfully!", { position: "top-right" });
        } else {
            toast.info("Password deletion cancelled.", { position: "top-right" });
        }
    };

    const editPassword = (index) => {
        const entry = savedPasswords[index];
        setWebsite(entry.website);
        setUsername(entry.username);
        setPassword(entry.password);
        setEditingIndex(index);
    };

    return (
        <div className="p-4 flex flex-col items-center w-full">
            <ToastContainer />
            <div className="logo font-bold text-2xl text-blue-800 dark:text-white flex items-center space-x-2">
                <i className="fa-solid fa-user-secret text-gray-600 dark:text-blue-200"></i>
                <span>Mr.Secure</span>
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-[Birthstone] text-[28px] text-center mb-4">
                Your Personal Password Manager
            </div>

            <input
                className="rounded-full p-3 border border-gray-400 dark:border-gray-600 
                   bg-gray-100 dark:bg-gray-800 text-black dark:text-white 
                   w-full sm:w-4/5 max-w-4xl h-12 mb-4"
                type="text"
                placeholder="Enter website URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row w-full sm:w-4/5 max-w-4xl space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                    className="rounded-full p-3 border border-gray-400 dark:border-gray-600 
                     bg-gray-100 dark:bg-gray-800 text-black dark:text-white 
                     w-full sm:w-3/5 h-12"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="relative w-full sm:w-2/5">
                    <input
                        className="rounded-full p-3 border border-gray-400 dark:border-gray-600 
                       bg-gray-100 dark:bg-gray-800 text-black dark:text-white 
                       w-full h-12 pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </button>
                </div>
            </div>

            <button
                className="mt-5 rounded-full p-3 bg-purple-300 dark:bg-purple-950 hover:bg-purple-400 dark:hover:bg-violet-900 transition text-gray-600 dark:text-gray-300
                  w-full sm:w-1/6 h-12 flex items-center justify-center space-x-2 shadow-md"
                onClick={savePassword}
            >
                <img src={buttonImage} alt="Add Password Icon" className="h-10 w-10" />
                <span>{editingIndex !== null ? "Update Password" : "Add Password"}</span>
            </button>

            <div className="mt-6 w-full sm:w-4/5 max-w-4xl">
                <h2 className="text-lg font-bold text-blue-800 dark:text-white mb-2">Your Passwords</h2>
                {savedPasswords.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 dark:border-gray-600">
                            <thead>
                                <tr className="bg-purple-950 text-white dark:bg-purple-300 dark:text-black ">
                                    <th className="p-2 border border-gray-400">Site Name</th>
                                    <th className="p-2 border border-gray-400">User Name</th>
                                    <th className="p-2 border border-gray-400">Password</th>
                                    <th className="p-2 border border-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedPasswords.map((entry, index) => (
                                    <tr key={index} className="bg-purple-300 text-black dark:bg-purple-950 dark:text-white hover:bg-purple-400 dark:hover:bg-purple-800 cursor-pointer">
                                        <td className="p-2 border border-gray-400">
                                            <div className="flex justify-between items-center w-full">
                                                <span>{entry.website}</span>
                                                <button onClick={() => copyToClipboard(entry.website)} className="text-purple-800 dark:text-purple-300" title="Copy">
                                                    <i className="fa-solid fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 border border-gray-400">
                                            <div className="flex justify-between items-center w-full">
                                                <span>{entry.username}</span>
                                                <button onClick={() => copyToClipboard(entry.username)} className="text-purple-800 dark:text-purple-300" title="Copy">
                                                    <i className="fa-solid fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 border border-gray-400">
                                            <div className="flex justify-between items-center w-full">
                                                <span>{entry.password}</span>
                                                <button onClick={() => copyToClipboard(entry.password)} className="text-purple-800 dark:text-purple-300" title="Copy">
                                                    <i className="fa-solid fa-copy"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 border border-gray-400 space-x-2   ">
                                            <button className="text-blue-900 dark:text-blue-600" onClick={() => editPassword(index)} title="Edit">
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button className="text-red-600 dark:text-red-700" onClick={() => deletePassword(index)} title="Delete">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No passwords to display.</p>
                )}
            </div>
        </div>
    );
};

export default Manager;