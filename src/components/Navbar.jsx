import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-600  '}`}>
      <div className="logo font-bold text-xl text-blue-100"><i class="fa-solid fa-user-secret"></i> Mr.Secure</div>
      <ul className="flex space-x-4">
        <li>
          <a href="#" className=" text-blue-100 hover:text-gray-400">Home</a>
        </li>
        <li>
          <a href="#" className=" text-blue-100 hover:text-gray-400">About</a>
        </li>
        <li>
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full transition duration-100 bg-transparent text-blue-100 hover:text-gray-400 flex items-center text-xl"
          >
            {darkMode ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
