import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  const navigationItems = [
    {
      navItem: "Users",
      link: "/users",
    },
    {
      navItem: "Tournaments",
      link: "/tournaments",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 h-screen fixed bg-blue-600 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-blue-500">
          EXCELERATE ADMIN
        </div>
        <nav className="flex-grow">
          <ul>
            {navigationItems.map((navItem, index) => (
              <li key={index}>
                <NavLink
                  to={navItem.link}
                  className={({ isActive }) =>
                    isActive
                      ? "block p-4 bg-blue-700"
                      : "block p-4 hover:bg-blue-700"
                  }
                >
                  {navItem.navItem}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-500">
          <NavLink
            to="/"
            onClick={() => {
              localStorage.clear();
            }}
            className="block p-4 hover:bg-blue-700"
          >
            Logout
          </NavLink>
        </div>
      </aside>
      <main className="flex-grow ml-64 p-8 min-w-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
