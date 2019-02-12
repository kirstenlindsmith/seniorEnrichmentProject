import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOneCampusFromServer } from '../actionCreators';

class UpdateCampus extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      interactedWith: false
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this);
    this.isImageValidUrl = this.isImageValidUrl.bind(this);
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this);
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this);
  }
  
  componentDidMount(){
    this.props.loadOneCampus();
  }

  handleImageChange(event) {
    this.setState({ imageUrl: event.target.value });
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

  doFieldsHaveErrors() {
    return {
      imageUrl: this.isImageValidUrl() === false,
    };
  }

  shouldTheFieldMarkError(field) {
    const errors = this.doFieldsHaveErrors();
    const hasError = errors[field];
    const shouldDisplayError = this.state.interactedWith;

    return hasError ? shouldDisplayError : false;
  }

  render() {
    const campus = this.props.campus;
    const campusId = this.props.campus.id
    const isButtonWorking = !Object.values(this.doFieldsHaveErrors()).includes(
      true
    );
    const errorDisplay = this.shouldTheFieldMarkError;
    const isWarningDisplayed = this.shouldTheFieldMarkError('imageUrl')
      ? 'errorWarning'
      : 'hidden';

    return (
      <div className="center updateForm">
        <h4>Edit the {campus.name} Campus:</h4>
        <form method="PUT" action={`http://localhost:1337/api/campuses/${campusId}`} className="updateForm">
          <div className="formSection">
            <label htmlFor="name">Campus Name</label>
            <div>
              <input
                name="name"
                type="text"
                defaultValue={campus.name}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="address">Address</label>
            <div>
              <input
                name="address"
                type="text"
                defaultValue={campus.address}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="imageUrl">Campus Image</label>
            <div>
              <input
                name="imageUrl"
                type="text"
                defaultValue={campus.imageUrl}
                onChange={this.handleImageChange}
                className={errorDisplay('imageUrl') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('imageUrl')}
              />
              <span className={isWarningDisplayed}>
                Must be direct URL to image file
              </span>
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="description">
              Description
            </label>
            <div>
              <textarea
                name="description"
                defaultValue = {campus.description}
              />
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
    campus: state.campusState.selectedCampus,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOneCampus: () => {
      const campusId = ownProps.match.params.campusId;
      const thunkAction = getOneCampusFromServer(campusId);
      dispatch(thunkAction);
    },
  };
};

const ConnectedUpdateCampusComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCampus);

export default ConnectedUpdateCampusComponent;
