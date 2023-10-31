import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function SearchStudents()
{
  const [search, setSearch] = React.useState('');

  // format the input after we submit the form
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    // go to the link
    window.location.assign(`/grade/student/${search}`);
  }

  return (
      <div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 class="mb-8 text-5xl font-bold text-gray-800">
              Grade a student.
            </h1>

            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Enter the ID of the student you want to grade.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mt-8 mx-auto text-gray-600">
              <input
                type="text"
                name="student"
                className="block w-full px-8 py-8 text-9xl rounded-md border-0 py-1.5 px-auto pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter a student ID, e.g. 12345678."
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                  <button type="submit" className="text-gray-500 text-lg border-s py-8 px-3 mx-1 rounded">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>  
      </div>
    )
}