import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Student()
{
    const [student, setStudent] = useState(null)
    const [cohort, setCohort] = useState(null)
    const [degree, setDegree] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [grades, setGrades] = useState([])
    const { sid } = useParams()

    useEffect(() =>
    {
        fetch(`http://localhost:8000/api/student/${sid}`)
        .then(response => {
          if (!response.ok)
          {
            window.location.assign("/404"); // go the 404 page if the student doesn't exist
          }
          return response.json();
        })
        .then(data => {
          setStudent(data);
          setIsLoaded(true);
        })

        // fetch the grades for the student
        fetch(`http://localhost:8000/api/grade/?student=${sid}`)
        .then(response => response.json())
        .then(data => {
            setGrades(data.map(e => e))
        }
        )
        .catch(err => console.log(err))
    }, [])

    // display the list of grades for the student
    const displayGrades = () =>
    {
      return grades.map(elem =>
      {
        return (
          <tbody>
            <tr>
              <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
                {/* extract the module name from the module field */}
                {elem.module.split("/")[5]}
              </th>
              <td className="py-4">
                {/* Do not render it if it's zero */}
                {elem.ca_mark === 0 ? "Not Applicable" : elem.ca_mark + "%"}
              </td>
              <td class="py-4">
                {/* Do not render it if it's zero */}
                {elem.exam_mark === 0 ? "Not Applicable" : elem.exam_mark + "%"}
              </td>
              <td class="py-4">
                {elem.total_grade}%
              </td>
            </tr>
          </tbody>
        )
      })
    }

  if (isLoaded)
  {
    // extract the Cohort codes from the delivered_to field
    const str = student.cohort;
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
          <h1 className="mb-8 px-16">{student.first_name} {student.last_name}.</h1>
          <p className="mt-1 max-w-8xl text-sm text-gray-500 mb-8 px-16">
            {student.first_name} {student.last_name} is a student currently attending The University. See below for their details, their grades and the modules they are registered for.
            </p>
        </div>

        {/* The table */}
        <div className="border-gray-200">

          <dl className="px-10">

            {/* Student Name */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{student.first_name} {student.last_name}</dd>
            </div>

            {/* Student Code */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Student ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{student.student_id}</dd>
            </div>

            {/* Delivered to */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Cohort</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                
                {/* display the list of Students as a comma separated string, formatted into a Link,
                    where each Student is a Link in the format of "/cohort/[Student]" */}
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
                    else // if not the last Student
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
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <a href={`mailto:${student.email}`}>{student.email}</a>
              </dd>
            </div>

            {/* Grades */}
            <div className="border-t px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Modules</dt>
              
              {/* The Students Sub-Table, */}
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

              <div className="relative overflow-x-auto">

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table headings */}
                      <thead className="text-xs text-gray-700 uppercase">
                          <tr>
                              <th scope="col">
                                Module
                              </th>
                              <th scope="col">
                                Continuous Assesment Mark
                              </th>
                              <th scope="col">
                                Exam Mark
                              </th>
                              <th scope="col">
                                Overall Grade
                              </th>
                          </tr>
                      </thead>

                      {displayGrades()}
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
