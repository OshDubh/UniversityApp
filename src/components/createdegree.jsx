import React, { useState } from 'react';

export default function CreateDegree()
{
  const [degreeData , setDegreeData] = useState({ // where we will store the data from the form
    full_name: "",
    shortcode: ""
  }); 

  // the function to handle the form submission
  const handleSubmit = (event) =>
  {
    // prevent the page from reloading#
    event.preventDefault();

    // validate the form data
    if (degreeData.full_name === "" || degreeData.shortcode === "")
    {
      alert("Please fill out all the fields.");
      return;
    }

    // shortcode is max 5 characters
    if (degreeData.shortcode.length > 5)
    {
      alert("Shortcode must be 5 characters or less.");
      return;
    }

    // send the data to the API
    fetch('http://localhost:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(degreeData)
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
      alert("There was an error creating the degree.");
    });

    // redirect to the degree page
    window.location.assign(`/degree/${(degreeData.shortcode).toUpperCase()}`);
  }    

  return (
    <form onSubmit={ handleSubmit }>
      <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">

          {/* title */}
          <h1 className="text-5xl font-semibold leading-7 text-gray-900">Create a Degree</h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 py-6">
            Enter the details of the degree you want to add to The University.
          </p>

            <div className="col-span-full pt-4">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Degree Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  onChange={ (e) => setDegreeData({ ...degreeData, full_name: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                />
              </div>
            </div>

            <div className="col-span-full pt-4">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Shortcode
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  onChange={ (e) => setDegreeData({ ...degreeData, shortcode: e.target.value }) }
                  className="block w-full text-sm rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
                />
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
