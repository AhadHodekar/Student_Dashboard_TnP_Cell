import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext({
  theme: "dark", // Default theme
  changeTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme(theme === "dark" ? "cmyk" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
