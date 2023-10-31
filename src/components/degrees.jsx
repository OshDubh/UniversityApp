import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Degrees()
{
  const [degrees, setDegrees] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  // formats the degrees data into a list
  const displayDegrees = () =>
  {
    return degrees.map(elem =>
    {
      return (  
        <tbody key={elem.shortcode}>
          <tr className="border-b border-gray-400 ">
            <th id={elem.shortcode} scope="row" className="px-16 py-4 font-medium text-gray-900 whitespace-nowrap">
              <Link to={`/degree/${elem.shortcode}`}>
                {elem.full_name}
              </Link>
            </th>
            <td className="px-6 py-4">
              <Link to={`/degree/${elem.shortcode}`}>
                {elem.shortcode}
              </Link>
            </td>
          </tr>
      </tbody>
    )
    })
  }

  // fetches the degrees data from the API
  useEffect(() =>
  {
      fetch(`http://localhost:8000/api/degree/`)
      .then(response => response.json())
      .then(data => {
          setDegrees(data.map(e => e))
          setIsLoaded(true);
      })
      .catch(err => console.log(err))
  }, [])

  // displays the degrees data after it has been fetched
  if (isLoaded)
  {
    return (
      <div className="relative overflow-x-auto pt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          {/* Table headings */}
          <thead key="head" className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-16 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
            </tr>
          </thead>

          {/* Table body fetched from the API*/}
          {displayDegrees()}
      </table>
    </div>
    )
  }
  else // displays a loading gif while the data is being fetched
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <img className="no-bg" src="loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }
}