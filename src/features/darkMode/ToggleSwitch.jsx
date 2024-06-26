import { useState } from "react";
import { FaSun } from "react-icons/fa";

function ToggleSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="relative ml-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
      <input
        type="checkbox"
        id="toggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full bg-gray-300"
      />
      <label
        htmlFor="toggle"
        className={`toggle-label block h-6 cursor-pointer overflow-hidden rounded-full border-2 bg-gray-300`}
      >
        <span
          className={`toggle-circle absolute left-0 top-0 h-6 w-6 transform rounded-full border-2 shadow-inner transition-transform ${isDarkMode ? "translate-x-4 bg-gray-900" : "translate-x-0 bg-gray-100"}`}
        >
          {isDarkMode ? "" : <FaSun />}
        </span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
