import React from 'react';
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import EnrolledStudents from './EnrolledStudents'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent'
import AddCampus from './AddCampus'
import UpdateCampus from './UpdateCampus'
import UpdateStudent from './UpdateStudent'
import NoMatch from './NoMatch'
import Home from './Home'
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
            <Route exact path="/students/:studentId" component={SingleStudent} />
            <Route path="/campuses/:campusId/update" component={UpdateCampus} />
            <Route path="/students/:studentId/update" component={UpdateStudent} />
            <Route component={NoMatch} />
          </Switch>
            <Route path="/campuses/:campusId/students" component={EnrolledStudents} />
        </main>
      </div>
    </Router>
  );
};

export default Root;
