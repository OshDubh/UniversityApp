import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function SearchSingle()
{
  const [selected, setSelected] = React.useState('Degree');
  const [search, setSearch] = React.useState('');
  const location = useLocation();

  // a dictionary for the example text for each type of search
  const exampleText = {
    'Degree': 'Enter a degree code, e.g. COMBUS.',
    'Cohort': 'Enter a cohort code, e.g. COMSCI1.',
    'Module': 'Enter a module code, e.g. CA106.',
    'Student': 'Enter a student ID, e.g. 12345678.'
  }

  // handle the change of the select to update the page
  const handleChange = (event) =>
  {
    setSelected(event.target.value);
  }

  // format the input after we submit the form
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    // go to the link
    window.location.assign(`/${selected.toLowerCase()}/${search.toUpperCase()}`);
  }

  // get the selected value from the url
  React.useEffect(() => {
    switch (location.pathname) {
      case '/degree':
        setSelected('Degree');
        break;
      case '/cohort':
        setSelected('Cohort');
        break;
      case '/module':
        setSelected('Module');
        break;
      case '/student':
        setSelected('Student');
        break;
      default:
        setSelected('Degree');
        break;
    }
  }, [location]);

  return (
      <div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 class="mb-8 text-5xl font-bold text-gray-800">
              Search The University for a {selected.toLowerCase()}.
            </h1>

            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Enter the ID of the {selected.toLowerCase()} you want to search for. Use the dropdown to change the type of search.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mt-8 mx-auto text-gray-600">
              <input
                type="text"
                name={selected}
                id={selected}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full px-8 py-8 text-9xl rounded-md border-0 py-1.5 px-auto pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={exampleText[selected]}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select
                  onChange={handleChange}
                  className="h-full rounded-md border-0 bg-transparent px-1 py-0 pl-2 pr-1 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  value={selected} // get the default value from the url
                >
                  <option>Degree</option>
                  <option>Cohort</option>
                  <option>Module</option>
                  <option>Student</option>
                </select>
                  <button type="submit" className="text-gray-500 text-lg border-s py-8 px-3 mx-1 rounded">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>  
      </div>
    )
}