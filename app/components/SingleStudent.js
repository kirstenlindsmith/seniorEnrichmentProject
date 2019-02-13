import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOneStudentFromServer } from '../actionCreators';
import { Link } from 'react-router-dom';

class SingleStudent extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.props.loadOneStudent();
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
    const student = this.props.student;

    if (!student || !Object.keys(student).length) {
      return (
        <div className="NotFound center">
          {this.load()}
          <div>
            <img
              src="https://aik.com.ua/image/catalog/404-cat.png"
              id="NotFoundImg"
            />
          </div>
          <div>
            <h4>
              Sorry for the inconvenience,<br /> but the URL in your address bar
              goes nowhere...
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
              {this.load()}
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
              <button type="button" className="button">
                <Link
                  to={`/students/${student.id}/update`}
                  className="editLink"
                >
                  edit student profile
                </Link>
              </button>
              <img src={student.imageUrl} className="singleImage" />
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div className="profileSingle">
              {this.load()}
              <h2 className="pageTitle">
                {student.firstName} {student.lastName}
              </h2>
              <h4>Not Enrolled Student</h4>
              <p className="smallText">GPA: {student.gpa}</p>
              <p className="smallText">{student.email}</p>
              <button type="button" className="button">
                <Link
                  to={`/students/${student.id}/update`}
                  className="editLink"
                >
                  edit student profile
                </Link>
              </button>
              <img src={student.imageUrl} className="singleImage" />
            </div>
          </div>
        );
      }
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
