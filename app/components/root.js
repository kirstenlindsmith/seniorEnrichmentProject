import React from 'react';
import {
  About,
  AddCampus,
  AddStudent,
  AllCampuses,
  AllStudents,
  EnrolledStudents,
  Home,
  NoMatch,
  SingleCampus,
  SingleStudent,
  UpdateCampus,
  UpdateStudent,
} from './index';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Root = () => {
  return (
    <Router>
      <div>
        <nav>
          <div id="navDiv">
            <h1>Margaret Hamilton</h1>
            <p>Academy of JavaScript</p>
          </div>
          <div>
            <img
              id="catGif"
              src="https://thumbs.gfycat.com/TiredLameAsiaticmouflon.webp"
            />
          </div>
          <ul id="navList">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/campuses">Campuses</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/students/add">Register</Link>
            </li>
            <li>
              <Link to="/campuses/add">Start A Campus</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/campuses/add" component={AddCampus} />
            <Route exact path="/campuses/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={AllStudents} />
            <Route path="/students/add" component={AddStudent} />
            <Route
              exact
              path="/students/:studentId"
              component={SingleStudent}
            />
            <Route path="/campuses/:campusId/update" component={UpdateCampus} />
            <Route
              path="/students/:studentId/update"
              component={UpdateStudent}
            />
            <Route exact path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
          <Route
            path="/campuses/:campusId/students"
            component={EnrolledStudents}
          />
        </main>
      </div>
    </Router>
  );
};

export default Root;
