import React, { useState, useEffect } from 'react';

export default function CreateModule()
{
  const [moduleData, setModuleData] = useState({ // where we will store the data from the form
    code: "",
    full_name: "",
    delivered_to: [],
    ca_split: 0
  });
  const [ cohorts, setCohorts ] = useState(); // where we will store the cohorts data
  const [ isLoaded, setIsLoaded ] = useState(false);

  // fetches the cohorts data from the API
  useEffect(() =>
  {
    fetch(`http://localhost:8000/api/cohort/`)
    .then(response => response.json())
    .then(data => {
      setCohorts(data.map(e => e))
      setIsLoaded(true);
    })
  }, [])

  // the function to handle the form submission
  const handleSubmit = (event) =>
  {
    moduleData.ca_split = parseInt(moduleData.ca_split); // turn the ca split into an int

    console.log(moduleData);
    console.log(JSON.stringify(moduleData))
    event.preventDefault();  // prevent the page from reloading

    // validate the form data
    if (moduleData.full_name === "" || moduleData.code === "" || moduleData.delivered_to === [])
    {
      alert("Please fill out all the fields.");
      return;
    }
    // code is max 5 characters
    if (moduleData.code.length > 5)
    {
      alert("Code must be 5 characters or less.");
      return;
    }

    // send the data to the API
    fetch('http://localhost:8000/api/module/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(moduleData)
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      alert("There was an error creating the module.");
    });

    // redirect to the Module page
    window.location.assign(`/module/${(moduleData.code).toUpperCase()}`);
  }

  if (isLoaded)
  {
    return (
      <form onSubmit={ handleSubmit }>
        <div className="mx-auto max-w-5xl py-32 lg:py-56">

        {/* title */}
        <h1 className="text-5xl font-semibold leading-7 text-gray-900">Create a Module</h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 py-6">
          Enter the details of the Module you want to add to The University.
        </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pt-4">

            {/* Name */}
            <div className="col-span-full pt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Module Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={ (e) => setModuleData({ ...moduleData, full_name: e.target.value }) }
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
                  name="Module-id"
                  id="Module-id"
                  onChange={ (e) => setModuleData({ ...moduleData, code: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Percentage Continuous Assesment
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="year"
                  id="year"
                  onChange={ (e) => setModuleData({ ...moduleData, ca_split: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                  />
              </div>
            </div>
          </div>

          <div class="col-span-full pt-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">
                Associated Cohorts
            </label>
            <div class="mt-2 grid grid-cols-3 gap-4">
                {cohorts && cohorts.map((cohort) => (
                <label class="flex items-center">
                    <input
                    type="checkbox"
                    name="cohorts"
                    value={cohort.id}
                    onChange={(e) => setModuleData({ ...moduleData, delivered_to: [...moduleData.delivered_to, `http://localhost:8000/api/cohort/${e.target.value}/`] })}
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span class="ml-2 text-sm font-medium leading-5 text-gray-900">{cohort.name}</span>
                </label>
                ))}
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
