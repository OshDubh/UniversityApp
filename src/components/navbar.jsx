import { React, useState } from "react";
import { Link } from 'react-router-dom';

// Navigation list, with a sub list of items to display as a dropdown
const navigationWithSublist = [
  
  // degrees
  {
    name: "Degrees",
    href: "#",
    current: false,
    sublist: [
      { name: "View All Degrees", href: "/degrees" },
      { name: "View A Single Degree", href: "/degree" },
      { name: "Create A New Degree", href: "/create/degree" },
    ],
  },

  // cohort
  {
    name: "Cohorts",
    href: "#",
    current: false,
    sublist: [
      { name: "View All Cohorts", href: "/cohorts" },
      { name: "View A Single Cohort", href: "/cohort" },
      { name: "Create A New Cohort", href: "/create/cohort" },
    ],
  },

  // modules
  {
    name: "Modules",
    href: "#",
    current: false,
    sublist: [
      { name: "View All Modules", href: "/modules" },
      { name: "View A Single Module", href: "/module" },
      { name: "Create A New Module", href: "/create/module" },
      { name: "Modules By Cohort", href: "/modules/cohort" },
    ],
  },

  // students
  {
    name: "Students",
    href: "#",
    current: false,
    sublist: [
      { name: "View A Single Student", href: "/student" },
      { name: "Create A New Student", href: "/create/student" },
      { name: "Set A Student's Grade", href: "/grade/student" },
    ],
  },
];

export default function Navbar() {
  const [showSublist, setShowSublist] = useState(false);

  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-centre p-6 lg:px-8" aria-label="Global">

          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">The University.</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </a>
          </div>

          {/* Desktop Navbar */}
          <div className="lg:flex lg:gap-x-12 justify-center">
            {navigationWithSublist.map((item) => (
              <div key={item.name} className="relative">
                <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={() => setShowSublist(showSublist === item.name ? null : item.name)}>
                  {item.name}
                </button>
                {showSublist === item.name && (
                  <div className="absolute top-full left-0 w-60 bg-white rounded-md shadow-lg">
                    <ul className="py-1">
                      {item.sublist.map((subitem) => (
                        <li key={subitem.name}>
                          <Link to={subitem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex lg:flex-1 justify-end">
            <p className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"> :3 </p>
          </div>
        </nav>
      </header>
    </div>
  );
}