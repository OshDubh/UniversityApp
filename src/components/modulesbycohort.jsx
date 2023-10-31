import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ModulesByCohort()
{
  const [modules, setModules] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { cohort } = useParams();

  // formats the Modules data into a list
  const displayModules = () =>
  {
      return modules.map(elem =>
      {
        // extract the module codes from the delivered_to field
        const str = elem.delivered_to;
        const regex = /\/([A-Z\d]+)\//g;
        const matches = [];

        // loop over the matches and push them into the matches array
        let match;
        while (match = regex.exec(str))
        {
          matches.push(match[1]);
        }

        return (
              <tbody>
              <tr class="border-b border-gray-400 ">
                <th scope="row" class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <Link to={`/module/${elem.code}`}>
                    {elem.full_name}
                  </Link>
                </th>
                <td class="px-6 py-4">
                    <Link to={`/module/${elem.code}`}>
                        {elem.code}
                    </Link>
                </td> 
                <td class="px-6 py-4">
                    {/* Show CA correctly */}
                    {
                      (elem.ca_split === 100)
                      ? "100% CA"
                      : (elem.ca_split === 0) ? "100% Exam" : elem.ca_split + "% CA, " + (100 - elem.ca_split) + "% Exam"
                    }
                </td>
              </tr>
            </tbody>
          )
      })
  }

  // fetches the Modules data from the API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohort}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setModules(data);
          setIsLoaded(true);
        }
        else
        {
          // redirect to 404 page because the cohort does not exist
          window.location.href = "/404";
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoaded)
  {
    return (
        <div class="relative overflow-x-auto pt-8">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            {/* Table headings */}
            <thead class="text-xs text-gray-700 uppercase">
                <tr>
                    <th scope="col" class="px-16 py-3">
                        Module Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Code
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Exam Split
                    </th>
                </tr>
            </thead>

            {displayModules()}
        </table>
      </div>
    )
  }
  else
  {
    return (
      // tailwind centered container
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
            <img className="no-bg" src="/loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }



}