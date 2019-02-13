import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampusesFromServer } from '../actionCreators';

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campus: '',
      interactedWith: {
        firstName: false,
        lastName: false,
        email: false,
        imageUrl: false,
        gpa: false,
        campus: false,
      },
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this);
    this.isImageValidUrl = this.isImageValidUrl.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this);
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this);
    this.variablesForRender = this.variablesForRender.bind(this);
  }

  componentDidMount() {
    this.props.loadCampuses();
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
    this.setState({ gpa: event.target.value })
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
    const imageFileTypes = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'JPG',
      'JPEG',
      'PNG',
      'GIF',
    ];
    const isValidFileTypePresent = imageFileTypes
      .map(fileExtension => {
        return imageUrl.includes(`.${fileExtension}`);
      })
      .includes(true);

    const containsUrlTraits =
      imageUrl.includes('http') ||
      imageUrl.includes('www') ||
      imageUrl.includes('.gov') ||
      imageUrl.includes('.edu') ||
      imageUrl.includes('.com') ||
      imageUrl.includes('.org') ||
      imageUrl.includes('.co');

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
    const campuses = this.props.allCampuses || [];
    const doesCampusExist = campuses
      .map(campusObj => {
        return campusObj.name.toLowerCase() === campus.toLowerCase();
      })
      .includes(true);
    return doesCampusExist;
  }

  doFieldsHaveErrors() {
    const { firstName, lastName, gpa } = this.state;
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      email: this.isEmailValid() === false,
      imageUrl: this.isImageValidUrl() === false,
      gpa: gpa.length === 0,
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
    const {
      isButtonWorking,
      errorDisplay,
      isEmailWarningDisplayed,
      isImageWarningDisplayed,
      isCampusWarningDisplayed,
    } = this.variablesForRender();

    return (
      <div>
        <h4>Start Your Path to Javascript Development! Enroll Today:</h4>
        <form method="POST" action="http://localhost:1337/api/students">
          <div className="formSection">
            <label htmlFor="firstName">First Name</label>
            <div>
              <input
                name="firstName"
                type="text"
                onChange={this.handleFirstNameChange}
                className={errorDisplay('firstName') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('firstName')}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="lastName">Last Name</label>
            <div>
              <input
                name="lastName"
                type="text"
                onChange={this.handleLastNameChange}
                className={errorDisplay('lastName') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('lastName')}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="email">Email</label>
            <div>
              <input
                name="email"
                type="text"
                onChange={this.handleEmailChange}
                className={errorDisplay('email') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('email')}
              />
              <span className={isEmailWarningDisplayed}>
                Must be a valid email address
              </span>
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="imageUrl">Profile Image</label>
            <div>
              <input
                name="imageUrl"
                type="text"
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
            <label htmlFor="gpa">
              Transcript GPA
            </label>
            <div>
              <input
                name="gpa"
                type="number"
                step="0.1"
                min="0.0"
                max="4.0"
                onChange={this.handleGPAChange}
                className={errorDisplay('gpa') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('gpa')}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="campus">Campus Of Choice</label>
            <div>
              <input
                name="campus"
                type="text"
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

const mapStateToProps = state => {
  return {
    allCampuses: state.campusState.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCampuses: () => {
      const thunkAction = getCampusesFromServer();
      dispatch(thunkAction);
    },
  };
};

const ConnectedAddStudentComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudent);

export default ConnectedAddStudentComponent;
