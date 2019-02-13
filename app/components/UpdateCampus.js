import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getOneCampusFromServer,
  updateCampusInServer,
} from '../actionCreators';

class UpdateCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus.name || '',
      address: this.props.campus.address || '',
      imageUrl: this.props.campus.imageUrl || '',
      description: this.props.campus.description || '',
      interactedWith: false,
      loading: true,
    };
    this.load = this.load.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this);
    this.isImageValidUrl = this.isImageValidUrl.bind(this);
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this);
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.props.loadOneCampus();
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.props.campus.name) {
      this.updateState();
    }
  }

  updateState() {
    this.setState({
      name: this.props.campus.name,
      address: this.props.campus.address,
      imageUrl: this.props.campus.imageUrl,
      description: this.props.campus.description,
      interactedWith: false,
      loading: true,
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(
      this.state.name,
      this.state.address,
      this.state.imageUrl,
      this.state.description
    );
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ imageUrl: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
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
    const isButtonWorking = !Object.values(this.doFieldsHaveErrors()).includes(
      true
    );
    const errorDisplay = this.shouldTheFieldMarkError;
    const isWarningDisplayed = this.shouldTheFieldMarkError('imageUrl')
      ? 'errorWarning'
      : 'hidden';

    return (
      <div className="center updateForm">
        {this.load()}
        <h4>Edit the {campus.name} Campus:</h4>
        <form className="updateForm" onSubmit={() => this.handleSubmit(event)}>
          <div className="formSection">
            <label htmlFor="name">Campus Name</label>
            <div>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="address">Address</label>
            <div>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.handleAddressChange}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="imageUrl">Campus Image</label>
            <div>
              <input
                name="imageUrl"
                type="text"
                value={this.state.imageUrl}
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
            <label htmlFor="description">Description</label>
            <div>
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
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

const mapStateToProps = (state, ownProps) => {
  return {
    campus: state.campusState.selectedCampus,
    campusId: ownProps.match.params.campusId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOneCampus: () => {
      const campusId = ownProps.match.params.campusId;
      const thunkAction = getOneCampusFromServer(campusId);
      dispatch(thunkAction);
    },
    handleSubmit: (name, address, imageUrl, description) => {
      dispatch(
        updateCampusInServer(
          {
            name: name,
            address: address,
            imageUrl: imageUrl,
            description: description,
          },
          ownProps.history
        )
      );
    },
  };
};

const ConnectedUpdateCampusComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCampus);

export default ConnectedUpdateCampusComponent;
