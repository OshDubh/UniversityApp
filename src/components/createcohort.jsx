import React, { useState, useEffect } from 'react';
import Select from 'react-tailwindcss-select';

export default function CreateCohort()
{
  const [cohortData, setCohortData] = useState({ // where we will store the data from the form
    id: "",
    year: 0,
    degree: "",
    name: ""
  });

  const [ degrees, setDegrees ] = useState(); // where we will store the Degrees data
  const [ isLoaded, setIsLoaded ] = useState(false);

  // fetches the Degrees data from the API
  useEffect(() =>
  {
    fetch(`http://localhost:8000/api/degree/`)
    .then(response => response.json())
    .then(data => {
      setDegrees(data.map(e => e))
      setIsLoaded(true);
    })
  }, [])

  // the function to handle the form submission
  const handleSubmit = (event) =>
  {
    console.log(cohortData);
    // prevent the page from reloading
    event.preventDefault();

    // validate the form data
    if (cohortData.name === "" || cohortData.id === "" || cohortData.year === 0 || cohortData.degree === "")
    {
      alert("Please fill out all the fields.");
      return;
    }

    // the id needs to be less than 50 characters to match the API
    if (cohortData.id.length > 50)
    {
      alert("The ID must be less than 50 characters.");
      return;
    }

    // the year needs to be 1-4
    if (cohortData.year <1 || cohortData.year > 4)
    {
      alert("The year must be between 1 and 4");
      return;
    }
    
    // format the degree to unclude the url
    cohortData.degree = `http://localhost:8000/api/degree/${cohortData.degree}/`;

    // send the data to the API
    fetch('http://localhost:8000/api/cohort/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cohortData)
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
      alert("Cohort created successfully.");
    })
    .catch(error => {
      console.error('Error:', error);
      alert("There was an error creating the Cohort.");
    });

    // redirect to the Cohort page
    window.location.assign(`/cohort/${(cohortData.id).toUpperCase()}`);
  }

  if (isLoaded)
  {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mx-auto max-w-5xl py-32 lg:py-56">

        {/* title */}
        <h1 className="text-5xl font-semibold leading-7 text-gray-900">Create a Cohort</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 py-6">
          Enter the details of the cohort you want to add to The University.
        </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-4">

            {/* Name */}
            <div className="col-span-full pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Cohort Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={ (e) => setCohortData({ ...cohortData, name: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                />
              </div>
            </div>

            {/* ID */}
            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="cohort-id"
                  id="cohort-id"
                  onChange={ (e) => setCohortData({ ...cohortData, id: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Year
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="year"
                  id="year"
                  onChange={ (e) => setCohortData({ ...cohortData, year: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>
          </div>

          <div className="col-span-full pt-8">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Associated Degree
            </label>
            <div className="mt-2">
              <select
                name="shortcode"
                id="shortcode"
                onChange={ (e) => setCohortData({ ...cohortData, degree: e.target.value }) }
                className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 bg-transparent"
                >
                <option value="">Select a degree</option>
                {degrees && degrees.map((degree) => (
                  <option key={degree.id} value={degree.shortcode}>{degree.full_name}</option>
                ))}
              </select>
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
