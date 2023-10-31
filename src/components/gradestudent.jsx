import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GradeStudent(props)
{
  const { sid } = useParams(); // get the student id from the url
  const [modules, setModules] = useState(props.module ? props.module : "Select Module"); // to default the dropdown if we want to preselect a module
  const [grades, setGrades] = useState([]); // to store the grades
  const [student, setStudent] = useState([]); // to store the student
  const [gradeExists, setGradeExists] = useState(false); // to check if the grade already exists
  const [isLoaded, setIsLoaded] = useState(false); // to check if the data has been loaded

  // grade details, which we will set later when we fetch the data
  const [grade, setGrade] = useState({});

  useEffect(() =>
  {
    // get the grades asociated with the student so we know if they have already been graded
    fetch(`http://localhost:8000/api/grade/?student=${sid}`)
    .then(response => response.json())
    .then(data => {
      setGrades(data)
    })

    // get the student details so we can add their link and their cohort to the grade
    fetch(`http://localhost:8000/api/student/${sid}`)
    .then(response => response.json())
    .then(data => {
      setStudent(data)
    })

    // get the modules so we can populate the dropdown
    fetch(`http://localhost:8000/api/module/`)
    .then(response => response.json())
    .then(data => {
      setModules(data.map(e => e))
      setIsLoaded(true);
    })
  }
  , [])

  // handle the module dropdown change
  const handleModuleChange = (event) =>
  {
    // loop through the grades and see if the module has already been graded
    for (let i = 0; i < grades.length; i++)
    {
      if ((grades[i].module).includes(event.target.value))
      {
        // update the grade data, save that a grade already exists and break out of the loop
        setGrade(grades[i]);
        setGradeExists(true);
        break;
      }      
      else
      {
        setGrade({...grade, module: event.target.value})
        setGradeExists(false);
      }
    }
  }

  // deal with when we submit the form
  const handleSubmit = (event) =>
  {
    event.preventDefault(); // prevent the page from reloading

    // validate the form data
    // at least one grade must be filled out
    if (grade.ca_mark === "" && grade.exam_mark === "")
    {
      alert("Please enter at least one grade");
      return;
    }
    // max 100
    if (grade.ca_mark > 100 || grade.exam_mark > 100)
    {
      alert("Grades must be 100 or less");
      return;
    }

    // send the data to the API as a put request if the grade already exists
    if (gradeExists)
    {
      fetch(`http://localhost:8000/api/grade/${grade.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(grade)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
    }
    // send the data to the API as a post request if the grade doesn't already exist
    else
    {
      // add the student and cohort to the grade data
      grade.student = `http://localhost:8000/api/student/${sid}/`;
      grade.cohort = student.cohort;

      // set the module field of the grade data to the one we have selected
      grade.module = `http://localhost:8000/api/module/${grade.module}/`;

      console.log(grade)

      fetch(`http://localhost:8000/api/grade/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(grade)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
    }

    window.location.href = `/student/${sid}`; // redirect to the student page after we grade them
  }

  // load the form if the data has been loaded
  if (isLoaded)
  {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mx-auto max-w-5xl py-32 lg:py-56">

        {/* title */}
        <h1 className="text-5xl font-semibold leading-7 text-gray-900">Grade a Student</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 py-6">
          Enter the module the grade is for and both the CA and Exam marks.
        </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-4">

            {/* Associated Module */}
            <div className="col-span-full pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Associated Module
              </label>
              <div className="mt-2">
              <select
                name="module"
                id="module"
                onChange={ handleModuleChange }
                className="bg-transparent block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
              >
                <option value="">Select a module</option>
                {modules && modules.map((module) => (
                  <option key={module.code} value={module.code}>{module.full_name}</option>
                ))}
              </select>
              </div>
            </div>

            {/* CA Mark */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Continuous Assesment Mark
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="ca-mark"
                  id="ca-mark"
                  onChange={ (e) => setGrade({ ...grade, ca_mark: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            {/* Exam Mark */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Exam Mark
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="exam-mark"
                  id="exam-mark"
                  onChange={ (e) => setGrade({ ...grade, exam_mark: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
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