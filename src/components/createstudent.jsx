import React, { useState, useEffect } from 'react';

export default function CreateStudent()
{
  const [studentData, setStudentData] = useState({ // where we will store the data from the form
    student_id: "",
    first_name: "",
    last_name: "",
    cohort: "",
    email: ""
  });

  const [ cohort, setCohort ] = useState(); // where we will store the Cohort data
  const [ isLoaded, setIsLoaded ] = useState(false);

  // fetches the cohort data from the API to populate the dropdown
  useEffect(() =>
  {
    fetch(`http://localhost:8000/api/cohort/`)
    .then(response => response.json())
    .then(data => {
      setCohort(data.map(e => e))
      setIsLoaded(true);
    })
  }, [])

  // the function to handle the form submission
  const handleSubmit = (event) =>
  {
    // prevent the page from reloading
    event.preventDefault();

    // validate the form data
    if (studentData.first_name === "" || studentData.last_name === "" || studentData.student_id === "" || studentData.cohort === "" || studentData.email === "")
    {
      alert("Please fill out all the fields.");
      return;
    }

    // the id needs to be 8 characters to match the API
    if (studentData.student_id.length !== 8)
    {
      alert("The ID must be 8 characters.");
      return;
    }

    // format the degree to unclude the url
    studentData.cohort = `http://localhost:8000/api/cohort/${studentData.cohort}/`;

    // send the data to the API
    fetch('http://localhost:8000/api/student/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert("Student created successfully.");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("There was an error creating the Student.");
    });

    // redirect to the Student page
    window.location.assign(`/student/${studentData.student_id}`);
  }

  if (isLoaded)
  {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mx-auto max-w-5xl py-32 lg:py-56">

        {/* title */}
        <h1 className="text-5xl font-semibold leading-7 text-gray-900">Create a Student</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 py-6">
          Enter the details of the Student you want to add to The University.
        </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-4">

            {/* First Name */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={ (e) => setStudentData({ ...studentData, first_name: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            {/* Last Name */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={ (e) => setStudentData({ ...studentData, last_name: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            {/* Student ID */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Student ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="student_id"
                  id="student_id"
                  onChange={ (e) => setStudentData({ ...studentData, student_id: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            {/* Email */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={ (e) => setStudentData({ ...studentData, email: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            {/* Associated Cohort */}
            <div className="col-span-full pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Associated Cohort
              </label>
              <div className="mt-2">
              <select
                name="cohort"
                id="cohort"
                onChange={ (e) => setStudentData({ ...studentData, cohort: e.target.value }) }
                className=" bg-transparent block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
              >
                <option value="">Select a cohort</option>
                {cohort && cohort.map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
                ))}
              </select>
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
