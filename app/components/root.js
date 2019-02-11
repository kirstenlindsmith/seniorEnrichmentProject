import React from 'react'
import AllCampuses from './AllCampuses'
import SingleCampus from './SingleCampus'
import EnrolledStudents from './EnrolledStudents'
import AllStudents from './AllStudents'
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent'
import AddCampus from './AddCampus'
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom'

const Root = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul id="navList">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/campuses'}>Campuses</Link></li>
            <li><Link to={'/students'}>Students</Link></li>
            <li><Link to={'/students/add'}>Register</Link></li>
            <li><Link to={'/campuses/add'}>Start A Campus</Link></li>
          </ul>
        </nav>
        <main>
          <h1>Margaret Hamilton Academy of JavaScript!</h1>
          <Switch>
            <Route exact path='/campuses' component={AllCampuses} />
            <Route path='/campuses/add' component={AddCampus} />
            <Route path='/campuses/:campusId' component={SingleCampus} />
            <Route exact path='/students' component={AllStudents} />
            <Route path='/students/:studentId' component={SingleStudent} />
            {/* <Route exact path='/students/add' component={AddStudent} /> */}
          </Switch>
          <Route path='/campuses/:campusId/students' component={EnrolledStudents} />
        </main>
      </div>
    </Router>
  )
}

export default Root
