import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getStudentsFromServer,
  removeStudentFromServer,
} from '../actionCreators';

class AllStudents extends Component {
  componentDidMount() {
    this.props.loadStudents();
  }

  render() {
    const students = this.props.allStudents || [];
    const remove = this.props.removeStudent;

    return (
      <div>
        <ul className="profileList">
          {students.map(student => {
            return (
              <div key={student.id} className="profileElem">
                <div key={student.id}>
                  <Link to={`/students/${student.id}`}>
                    {student.firstName} {student.lastName}
                  </Link>{' '}
                  <button
                    type="button"
                    className="remove"
                    onClick={() => {
                      remove(student.id);
                    }}
                  >
                    X
                  </button>
                </div>
                <Link to={`/students/${student.id}`}>
                  <img src={student.imageUrl} className="profileImage" />
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allStudents: state.studentState.students,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStudents: () => {
      const thunkAction = getStudentsFromServer();
      dispatch(thunkAction);
    },
    removeStudent: studentId => {
      const thunkAction = removeStudentFromServer(studentId);
      dispatch(thunkAction);
    },
  };
};

const ConnectedAllStudentsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);

export default ConnectedAllStudentsComponent;
