import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cohorts({endpoint})
{
  const [cohorts, setCohorts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // formats the cohorts data into a list
  const displayCohorts = () =>
  {
    return cohorts.map((elem) =>
    {
      return (
        <tbody key={elem.id}>
          <tr className="border-b border-gray-400 ">

            {/* Cohort Name */}
            <td scope="row" className="px-16 py-4 font-medium text-gray-900 whitespace-nowrap">
              <Link to={`/cohort/${elem.id}`}>
                {elem.name}
              </Link>
            </td>

            {/* Cohort Code */}
            <td className="px-6 py-4">
            <Link to={`/cohort/${elem.id}`}>
                {elem.id}
              </Link>
            </td>

            {/* Cohort Duration */}
            <td className="px-6 py-4">
              {elem.year}{elem.year === 1 ? "st" : elem.year === 2 ? "nd" : elem.year === 3 ? "rd" : "th"} year
            </td>
          </tr>
        </tbody>
        )
    })
  }

  // fetches the cohorts data from the API
  useEffect(() =>
  {
    fetch(`http://localhost:8000/api/cohort/`)
    .then(response => response.json())
    .then(data => {
        setCohorts(data.map(e => e))
        setIsLoaded(true);
    })
    .catch(err => console.log(err))
  }, [])

  if (isLoaded)
  {
    return (
      <div className="relative overflow-x-auto pt-8">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          {/* Table headings */}
          <thead className="text-xs text-gray-700 uppercase">
            <tr key="header">
              <th scope="col" className="px-16 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
            </tr>
          </thead>

          {displayCohorts()}
        </table>
      </div>
    )
  }
  else
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <img className="no-bg" src="/loading.gif" alt="/loading..."/>
        </div>
      </div>
    )
  }
}