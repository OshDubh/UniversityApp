import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Modules({endpoint})
{
  const [modules, setModules] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
                    {/* display the list of modules as a comma separated string, formatted into a Link, 
                        where each module is a Link in the format of "/cohort/[module]" */}

                    {matches.map((e, i) => {
                        if (i === matches.length - 1)
                        {
                            return (
                                <Link to={`/cohort/${e}`}>
                                    {e}
                                </Link>
                            )
                        }
                        else // if not the last element
                        {
                            return (
                                <Link to={`/cohort/${e}`}>
                                    {e + ", "}
                                </Link>
                            )
                        }
                    })}
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
  useEffect(() =>
  {
      fetch(`http://localhost:8000/api/module/`)
      .then(response => response.json())
      .then(data => {
          setModules(data.map(e => e))
          setIsLoaded(true);
      })
      .catch(err => console.log(err))

  }, [])

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
                        Cohorts
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
            <img className="no-bg" src="loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }
}

export default Modules;
