import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getOneStudentFromServer,
  updateStudentInServer,
} from '../actionCreators';

class UpdateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.student.firstName || '',
      lastName: this.props.student.lastName || '',
      email: this.props.student.email || '',
      imageUrl: this.props.student.imageUrl || '',
      gpa: this.props.student.gpa || '',
      campus: this.props.campus.name || '',
      interactedWith: {
        email: false,
        imageUrl: false,
        campus: false,
      },
      loading: true,
    };
    this.load = this.load.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this);
    this.isImageValidUrl = this.isImageValidUrl.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
    this.isCampusValid = this.isCampusValid.bind(this);
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this);
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.props.loadOneStudent();
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstName !== this.props.student.firstName) {
      this.updateState();
    }
  }

  updateState() {
    this.setState({
      firstName: this.props.student.firstName,
      lastName: this.props.student.lastName,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      campus: this.props.student.campus.name,
      interactedWith: {
        email: false,
        imageUrl: false,
        campus: false,
      },
    });
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

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ imageUrl: event.target.value });
  }

  handleGPAChange(event) {
    this.setState({ gpa: event.target.value });
  }

  handleCampusChange(event) {
    this.setState({ campus: event.target.value });
  }

  handleBlurWhenInteracting(field) {
    return () => {
      this.setState({
        interactedWith: { ...this.state.interactedWith, [field]: true },
      });
    };
  }

  isImageValidUrl() {
    const { imageUrl } = this.state;
    const imageFileTypes = ['jpg', 'jpeg', 'png', 'gif'];
    const isValidFileTypePresent = imageFileTypes
      .map(fileExtension => {
        return imageUrl.includes(`.${fileExtension}`);
      })
      .includes(true);

    const containsUrlTraits =
      imageUrl.includes('http') ||
      imageUrl.includes('https') ||
      imageUrl.includes('www') ||
      imageUrl.includes('.com') ||
      imageUrl.includes('.org');

    const imageIsUrl = isValidFileTypePresent && containsUrlTraits;

    return imageIsUrl;
  }

  isEmailValid() {
    const { email } = this.state;
    const containsUrlTraits =
      email.includes('http') ||
      email.includes('www') ||
      email.includes('.gov') ||
      email.includes('.edu') ||
      email.includes('.com') ||
      email.includes('.org') ||
      email.includes('.co');

    const isEmail = email.includes('@') && containsUrlTraits;

    return isEmail;
  }

  isCampusValid() {
    const { campus } = this.state;
    if (this.campus) {
      const campuses = this.props.allCampuses || [];
      const doesCampusExist = campuses
        .map(campusObj => {
          return campusObj.name.toLowerCase() === campus.toLowerCase();
        })
        .includes(true);
      return doesCampusExist;
    }
    return true;
  }

  doFieldsHaveErrors() {
    return {
      email: this.isEmailValid() === false,
      imageUrl: this.isImageValidUrl() === false,
      campus: this.isCampusValid() === false,
    };
  }

  shouldTheFieldMarkError(field) {
    const errors = this.doFieldsHaveErrors();
    const hasError = errors[field];
    const shouldDisplayError = this.state.interactedWith[field];

    return hasError ? shouldDisplayError : false;
  }

  variablesForRender() {
    const isButtonWorking = !Object.values(this.doFieldsHaveErrors()).includes(
      true
    );
    const errorDisplay = this.shouldTheFieldMarkError;
    const isEmailWarningDisplayed = this.shouldTheFieldMarkError('email')
      ? 'errorWarning'
      : 'hidden';
    const isImageWarningDisplayed = this.shouldTheFieldMarkError('imageUrl')
      ? 'errorWarning'
      : 'hidden';
    const isCampusWarningDisplayed = this.shouldTheFieldMarkError('campus')
      ? 'errorWarning'
      : 'hidden';

    return {
      isButtonWorking: isButtonWorking,
      errorDisplay: errorDisplay,
      isEmailWarningDisplayed: isEmailWarningDisplayed,
      isImageWarningDisplayed: isImageWarningDisplayed,
      isCampusWarningDisplayed: isCampusWarningDisplayed,
    };
  }
  render() {
    const student = this.props.student;

    const {
      isButtonWorking,
      errorDisplay,
      isEmailWarningDisplayed,
      isImageWarningDisplayed,
      isCampusWarningDisplayed,
    } = this.variablesForRender();

    return (
      <div className="center updateForm">
        {this.load()}
        <h4>Edit {student.firstName}'s Profile':</h4>
        <form
          className="updateForm"
          onSubmit={() => this.props.handleSubmit(event)}
        >
          <div className="formSection">
            <label htmlFor="firstName">First Name</label>
            <div>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="lastName">Last Name</label>
            <div>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="email">Email</label>
            <div>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleEmailChange}
                className={errorDisplay('email') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('email')}
              />
              <span className={isEmailWarningDisplayed}>
                Must be valid email address
              </span>
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="imageUrl">Profile Image</label>
            <div>
              <input
                name="imageUrl"
                type="text"
                value={this.state.imageUrl}
                onChange={this.handleImageChange}
                className={errorDisplay('imageUrl') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('imageUrl')}
              />
              <span className={isImageWarningDisplayed}>
                Must be direct URL to image file
              </span>
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="gpa">GPA</label>
            <div>
              <input
                name="gpa"
                type="text"
                value={this.state.gpa}
                onChange={this.handleGPAChange}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="campus">Enrolled Campus</label>
            <div>
              <input
                name="campus"
                type="text"
                value={this.state.campus}
                onChange={this.handleCampusChange}
                className={errorDisplay('campus') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('campus')}
              />
              <span className={isCampusWarningDisplayed}>
                Must be an existing school campus.{' '}
                <Link to="/campuses/add">Start your own</Link>
              </span>
            </div>
          </div>

          <div className="formSection">
            <button
              type="submit"
              className="button"
              disabled={!isButtonWorking}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: state.studentState.selectedStudent,
    studentId: ownProps.match.params.studentId,
    allCampuses: state.campusState.campuses,
    campus: state.campusState.campuses.filter(
      campus => campus.id === state.studentState.selectedStudent.campus.id
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOneStudent: () => {
      const studentId = ownProps.match.params.studentId;
      const thunkAction = getOneStudentFromServer(studentId);
      dispatch(thunkAction);
    },
    handleSubmit: event => {
      event.preventDefault();
      dispatch(
        updateStudentInServer(
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            gpa: this.state.gpa,
            campus: this.state.campus,
          },
          ownProps.history
        )
      );
    },
  };
};

const ConnectedUpdateStudentComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudent);

export default ConnectedUpdateStudentComponent;
