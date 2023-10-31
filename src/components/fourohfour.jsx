import React from 'react';
import { Link } from 'react-router-dom';

export default function FourOhFour()
{
    return (
  <div>

      {/* Hero Text */}
      <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
        <h1 class="mb-8 text-8xl font-extrabold text-gray-900">
          <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-[#7c3f58] from-[#eb6b6f]">404.</span>
          </h1>

          <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            The page you are looking for has taken a gap year. Please head back&nbsp;
            <Link to="/" class="underline font-bold decoration-[#eb6b6f]">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-[#7c3f58] from-[#eb6b6f]">home</span>
            </Link>
            &nbsp; and try again next semester. 
          </p>
          
        </div>
      </div>  
  </div>
    )
}