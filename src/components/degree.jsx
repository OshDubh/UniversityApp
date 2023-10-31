import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Degree()
{
  const [degree, setDegree] = useState(null);
  const [cohorts, setCohorts] = useState([]); 
  const [isLoaded, setIsLoaded] = useState(false);
  const { shortcode } = useParams();

  // fetch both the details of the single degree and the cohorts that are associated with it
  useEffect(() => {
    // fetch the details of the degree
    fetch(`http://localhost:8000/api/degree/${shortcode}`)
    .then(response => {
      if (!response.ok)
      {
        window.location.assign("/404"); // go the 404 page if the degree doesn't exist
      }
      return response.json();
    })
    .then(data => {
      setDegree(data);
      setIsLoaded(true);
    })

    // fetch the cohorts that are associated with the degree
    fetch(`http://localhost:8000/api/cohort/?degree=${shortcode}`)
    .then(response => response.json())
    .then(data => {
        setCohorts(data.map(e => e))
    })
    .catch(err => console.log(err))
  }, [])

  // formats the cohorts data 
  const displayCohorts = () =>
  {
    return cohorts.map(elem =>
    {
      return (  
        <tbody key={elem.id}>
        <tr>
          <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
            <Link to={`/cohort/${elem.id}`}>
              {elem.name}
            </Link>
          </th>
          <td className="py-4">
            <Link to={`/cohort/${elem.id}`}>
              {elem.id}
            </Link>
          </td>
          <td className="py-4">
            {elem.year}{elem.year === 1 ? "st" : elem.year === 2 ? "nd" : elem.year === 3 ? "rd" : "th"} year
          </td>
        </tr>
      </tbody>
    )
    })
  }

  if (isLoaded)
  {
    return (
      <div className="overflow-hidden bg-white shadow">

        {/* Title */}
        <div className="text-6xl font-semibold leading-6 text-gray-900 mb-8 pt-16 leading-tight">
          <h1 className="mb-8 px-16">{degree.full_name}.</h1>
          <p className="mt-1 max-w-8xl text-sm text-gray-500 mb-8 px-16">Full details about the {(degree.full_name).toLowerCase()} degree that The University offers to its students.</p>
        </div>

        {/* The table */}
        <div className="border-gray-200">

          <dl className="px-10">

            {/* Degree Name */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{degree.full_name}</dd>
            </div>

            {/* Module Code */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Code</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{degree.shortcode}</dd>
            </div>

            {/* Cohorts */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cohorts</dt>
              
              {/* The Cohorts sub table */}
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="relative overflow-x-auto">

                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {/* Table headings */}
                    <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Code
                            </th>
                            <th scope="col">
                                Year
                            </th>
                        </tr>
                    </thead>
                    {displayCohorts()}
                  </table>
                </div>
              </dd>
            </div>
         </dl>
      </div>
    </div>
  )
  }
  else
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
            <img className="no-bg" src="/loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }
}
