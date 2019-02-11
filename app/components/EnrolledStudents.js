import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEnrolledStudentsFromServer} from '../actionCreators'
import {Link} from 'react-router-dom'

class EnrolledStudents extends Component {

  componentDidMount(){
    this.props.loadEnrolledStudents()
  }

  render(){
    const students = this.props.students || []
    if (students.length) {
      return (
        <div className="enrolledStudents">
          <ul className="enrolledStudents">
            {
              students.map(student => {
                return (
                  <div key={student.id}>
                    <li>
                      <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                    </li>
                  </div>
                )
              })
            }
          </ul>
        </div>
      )
    } else return (
      <div className="enrolledStudents">
        <p>No students on roster at this campus
        <br/>Interested in becoming a student? <Link to={'/students/add'} className="enrollLink">Click here to enroll!</Link></p>
      </div>    
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentState.enrolledStudents
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadEnrolledStudents: () => {
      const campusId = ownProps.match.params.campusId
      const thunkAction = getEnrolledStudentsFromServer(campusId)
      dispatch(thunkAction)
    }
  }
}

const ConnectedEnrolledStudentsComponent = connect(mapStateToProps, mapDispatchToProps)(EnrolledStudents)

export default ConnectedEnrolledStudentsComponent
