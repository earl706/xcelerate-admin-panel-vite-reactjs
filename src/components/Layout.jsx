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
    {
      navItem: "Create User",
      link: "/create-user",
    },
    {
      navItem: "Create Tournament",
      link: "/create-tournament",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 h-[calc(100vh-2rem)] my-4 ml-4 px-2 flex sticky top-4 flex-col text-blue-900">
        <div className="p-4 text-l text-center font-bold mb-4 bg-white rounded-[5px] drop-shadow-lg overflow-hidden">
          EXCELERATE ADMIN
        </div>
        <nav className="flex-grow font-semibold px-2 drop-shadow-lg overflow-hidden mb-4">
          <ul>
            {navigationItems.map((navItem, index) => (
              <li key={index}>
                <NavLink
                  to={navItem.link}
                  className={({ isActive }) =>
                    isActive
                      ? "block p-4 my-2 rounded-[5px] bg-blue-700 text-white"
                      : "transition block p-4 my-2 rounded-[5px] hover:bg-blue-700 hover:text-white"
                  }
                >
                  {navItem.navItem}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className=" overflow-hidden">
          <NavLink
            to="/"
            onClick={() => {
              localStorage.clear();
            }}
            className="transition font-semibold block p-4 my-2 hover:bg-blue-700 hover:text-white rounded-[5px]"
          >
            Logout
          </NavLink>
        </div>
      </aside>
      <main className="flex-grow p-8 w-[1134px]">
        <div className="p-6 ">{children}</div>
      </main>
    </div>
  );
}
