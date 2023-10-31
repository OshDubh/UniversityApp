import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Cohort()
{
  const [cohort, setCohort] = useState(null)
  const [students, setStudents] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()

  useEffect(() =>
  {
      fetch(`http://localhost:8000/api/cohort/${id}`)
      .then(response => {
        if (!response.ok)
        {
          window.location.assign("/404"); // go the 404 page if the cohort doesn't exist
        }
        return response.json();
      })
      .then(data => {
        setCohort(data);
        setIsLoaded(true);
      })

      fetch(`http://localhost:8000/api/student/?cohort=${id}`)
      .then(response => response.json())
      .then(data => {
          setStudents(data.map(e => e))
      }
      )
      .catch(err => console.log(err))

  }, [])

  const displayStudents = () =>
  {
    return students.map(elem =>
    {
      return (
        <tbody>
          <tr>
            <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
              <Link to={`/student/${elem.student_id}`}>
                {elem.first_name} {elem.last_name}
              </Link>
            </th>
            <td className="py-4">
              <Link to={`/student/${elem.student_id}`}>
                {elem.student_id}
              </Link>
            </td>
            <td class="py-4">
              <a href={"mailto:" + elem.email}>
              {elem.email}
              </a>
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
          <h1 className="mb-8 px-16">{cohort.name}.</h1>
          <p className="mt-1 max-w-8xl text-sm text-gray-500 mb-8 px-16">Full details about the {(cohort.name).toLowerCase()} degree that The University offers to its students.</p>
        </div>

        {/* The table */}
        <div className="border-gray-200">

          <dl className="px-10">

            {/* Degree Name */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{cohort.name}</dd>
            </div>

            {/* Module Code */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Code</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{cohort.id}</dd>
            </div>

            {/* Students */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Students</dt>
              
              {/* The Students Sub-Table, */}
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
                                Student ID
                              </th>
                              <th scope="col">
                                Email
                              </th>
                          </tr>
                      </thead>

                      {displayStudents()}
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
      // tailwind centered container
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
            <img className="no-bg" src="/loading.gif" alt="loading..."/>
        </div>
      </div>
    )
  }
}
