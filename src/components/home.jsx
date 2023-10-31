import React from 'react';

export default function Home()
{
    return (
  <div>
      {/* Hero Text */}
      <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="mb-8 text-8xl font-extrabold text-gray-900">
          Welcome to
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#7c3f58] from-[#eb6b6f]"> The University.</span>
          </h1>

          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Use the top navigation bar to view and manage all our degrees, cohorts, modules and students.
          </p>
        </div>
      </div>  
  </div>
    )
}