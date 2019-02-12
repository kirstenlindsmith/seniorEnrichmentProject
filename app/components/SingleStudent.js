import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOneStudentFromServer } from '../actionCreators';
import { Link } from 'react-router-dom';

class SingleStudent extends Component {

  componentDidMount() {
    this.props.loadOneStudent();
  }

  render() {
    const student = this.props.student;

    if (!student || !Object.keys(student).length) {
      return (
        <div className="NotFound">
          <div>
            <img
              src="https://www.hostinger.co.uk/assets/images/404-3a53e76ef1.png"
              id="NotFoundImg"
            />
          </div>
          <div>
            <h1>404</h1>
            <h4>
              Sorry for the inconvenience, but the URL in your address bar goes
              nowhere...
            </h4>
          </div>
        </div>
      );
    } else {

      const campus = this.props.student.campus || {};

      if (Object.keys(campus).length) {
      return (
        <div>
          <div className="profileSingle">
            <h2 className="pageTitle">
              {student.firstName} {student.lastName}
            </h2>
            <h4>
              Enrolled Campus:
              <Link to={`/campuses/${campus.id}`} id="studentCampusLink">
                {campus.name}
              </Link>
            </h4>
            <p className="smallText">GPA: {student.gpa}</p>
            <p className="smallText">{student.email}</p>
            <img src={student.imageUrl} className="singleImage" />
          </div>
        </div>
      );
    } else {return (
        <div>
          <div className="profileSingle">
            <h2 className="pageTitle">
              {student.firstName} {student.lastName}
            </h2>
            <h4>Not Enrolled Student</h4>
            <p className="smallText">GPA: {student.gpa}</p>
            <p className="smallText">{student.email}</p>
            <img src={student.imageUrl} className="singleImage" />
          </div>
        </div>
      );}
    }
  }
}

const mapStateToProps = state => {
  return {
    student: state.studentState.selectedStudent,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOneStudent: () => {
      const studentId = ownProps.match.params.studentId;
      const thunkAction = getOneStudentFromServer(studentId);
      dispatch(thunkAction);
    },
  };
};

const ConnectedSingleStudentComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

export default ConnectedSingleStudentComponent;
