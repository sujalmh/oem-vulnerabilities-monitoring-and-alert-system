import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Overlay */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setExpanded(false)}
        ></div>
      )}

      <aside
        className={`fixed z-50 h-screen bg-navColor transition-all duration-300 ${
          expanded ? "w-64" : "w-16"
        }`}
      >
        <nav className="h-full flex flex-col translate-y-14 text-gray-200 relative">
          <div className="py-4 pb-2 flex justify-center p-2 items-center">
            <span
              className={`overflow-hidden transition-all ml-3 font-medium text-lightWhite ${
                expanded ? "block" : "hidden"
              }`}
            >
              Browse
            </span>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 rounded-lg ${expanded && "ml-auto"} hover:bg-darkGray text-lightWhite`}
            >
              {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 p-1">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem(props) {
  const { expanded } = useContext(SidebarContext);
  const [isActive, setIsActive] = useState(false);

  return (
    <NavLink
      to={props.location}
      className={({ isActive }) =>
        isActive ? setIsActive(true) : setIsActive(false)
      }
    >
      <li
        className={`relative justify-center flex items-center py-2 px-3 my-1 font-normal rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-purpleLogo text-white bg-[rgb(145,71,255)]"
            : "hover:bg-darkGray text-lightWhite"
        }`}
      >
        {props.icon}
        <span
          className={`overflow-hidden transition-all text-sm text-nowrap ${
            expanded ? "w-40 ml-3" : "hidden"
          }`}
        >
          {props.text}
        </span>

        {!expanded && (
          <div
            className={`absolute z-30 left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {props.text}
          </div>
        )}
      </li>
    </NavLink>
  );
}