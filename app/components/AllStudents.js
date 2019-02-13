import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getStudentsFromServer,
  removeStudentFromServer,
} from '../actionCreators';

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.props.loadStudents();
    this.setState({ loading: false });
  }

  load() {
    const loaderClass = this.state.loading ? 'lds-ring' : 'hidden';

    return (
      <div className={loaderClass}>
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }

  render() {
    const students = this.props.allStudents || [];
    const remove = this.props.removeStudent;

    return (
      <div>
        <ul className="profileList">
          {this.load()}
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
                    x
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
