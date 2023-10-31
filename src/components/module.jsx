import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Module()
{
    const [module, setModule] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const { code } = useParams()

  useEffect(() =>
  {
    fetch(`http://localhost:8000/api/module/${code}`)
    .then(response => {
      if (!response.ok)
      {
        window.location.assign("/404"); // go the 404 page if the module doesn't exist
      }
      return response.json();
    })
    .then(data => {
      setModule(data);
      setIsLoaded(true);
    })
  }, [])

  if (isLoaded)
  {
    // extract the module codes from the delivered_to field
    const str = module.delivered_to;
    const regex = /\/([A-Z\d]+)\//g;
    const matches = [];

    {/* loop over the matches and push them into the matches array */}
    let match;
    while (match = regex.exec(str))
    {
      matches.push(match[1]);
    }
    
    return (
      <div className="overflow-hcodeden bg-white shadow">

        {/* Title */}
        <div className="text-6xl font-semibold leading-6 text-gray-900 mb-8 pt-16 leading-tight">
          <h1 className="mb-8 px-16">{module.full_name}.</h1>
          <p className="mt-1 max-w-8xl text-sm text-gray-500 mb-8 px-16">Full details about the {(module.full_name).toLowerCase()} module that The University offers to its students.</p>
        </div>

        {/* The table */}
        <div className="border-gray-200">

          <dl className="px-10">

            {/* Module Name */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{module.full_name}</dd>
            </div>

            {/* Module Code */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Code</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{module.code}</dd>
            </div>

            {/* Delivered to */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cohorts</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                
                {/* display the list of modules as a comma separated string, formatted into a Link,
                    where each module is a Link in the format of "/cohort/[module]" */}
                {

                matches.map((e, i) => {
                    if (i === matches.length - 1)
                    {
                        return (
                            <Link to={`/cohort/${e}`}>
                                {e}
                            </Link>
                        )
                    }
                    else // if not the last module
                    {
                        return (
                            <Link to={`/cohort/${e}`}>
                                {e + ", "}  
                            </Link>
                        )
                    }
                })}
              </dd>
            </div>

            {/* CA Split, formatted correctly */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">CA Split</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {/* Show CA correctly */}
                {
                  (module.ca_split === 100)
                  ? "100% CA" 
                  : (module.ca_split === 0) ? "100% Exam" : module.ca_split + "% CA, " + (100 - module.ca_split) + "% Exam"
                }
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
      // tailwind centered container
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
            <img className="no-bg" src="/loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }
}
