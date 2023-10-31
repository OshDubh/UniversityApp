import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';

// my own components
import Blur from './components/blur';
import Navbar from './components/navbar';
import Home from './components/home';
import FourOhFour from './components/fourohfour';

import Degrees from './components/degrees';
import Degree from './components/degree';
import CreateDegree from './components/createdegree';

import Cohorts from './components/cohorts';
import Cohort from './components/cohort';
import CreateCohort from './components/createcohort';

import Modules from './components/modules';
import Module from './components/module';
import ModulesByCohort from './components/modulesbycohort';
import CreateModule from './components/createmodule';

import Student from './components/student';
import CreateStudent from './components/createstudent';
import GradeStudent from './components/gradestudent';
import SearchStudents from './components/searchstudents';

import SearchSingle from './components/searchsingle';
import SearchModules from './components/searchmodules';

function App() {
  return (

    <div>
      <Blur />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/degrees" element={<Degrees />} />
          <Route path="/degree/:shortcode" element={<Degree />} />
          <Route path="/degree" element={<SearchSingle />} />
          <Route path="/create/degree" element={<CreateDegree />} />

          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/cohort/:id" element={<Cohort />} />
          <Route path="/cohort" element={<SearchSingle />} />
          <Route path="/create/cohort" element={<CreateCohort />} />

          <Route path="/modules" element={<Modules />} />
          <Route path="/module/:code" element={<Module />} />
          <Route path="/module" element={<SearchSingle />} />
          <Route path="/modules/cohort/:cohort" element={<ModulesByCohort />} />
          <Route path="/modules/cohort" element={<SearchModules />} />
          <Route path="/create/module" element={<CreateModule />} />

          <Route path="/student/:sid" element={<Student />} />
          <Route path="/student" element={<SearchSingle />} />
          <Route path="/create/student" element={<CreateStudent />} />
          <Route path="/grade/student/:sid" element={<GradeStudent />} />
          <Route path="/grade/student" element={<SearchStudents />} />
          
          <Route path="/search/" element={<SearchSingle />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
