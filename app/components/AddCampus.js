import React, { Component } from 'react';

class AddCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      imageUrl: '',
      interactedWith: {
        name: false,
        address: false,
        imageUrl: false
      }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleBlurWhenInteracting = this.handleBlurWhenInteracting.bind(this);
    this.isImageValidUrl = this.isImageValidUrl.bind(this);
    this.doFieldsHaveErrors = this.doFieldsHaveErrors.bind(this);
    this.shouldTheFieldMarkError = this.shouldTheFieldMarkError.bind(this);
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
  
  handleBlurWhenInteracting(field) {
    return () => {
      this.setState({
        interactedWith: {...this.state.interactedWith, [field]: true}
      })
    }
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
      imageUrl.includes('.com') ||
      imageUrl.includes('.org');

    const imageIsUrl = isValidFileTypePresent && containsUrlTraits;

    return imageIsUrl;
  }
  
  doFieldsHaveErrors(){
    const {name, address} = this.state
    return {
      name: name.length === 0,
      address: address.length === 0,
      imageUrl: this.isImageValidUrl() === false
    }
  }
  
  shouldTheFieldMarkError(field){
    const errors = this.doFieldsHaveErrors()
    const hasError = errors[field]
    const shouldDisplayError = this.state.interactedWith[field]
    
    return hasError ? shouldDisplayError : false
  }

  render() {
    const isButtonWorking = !(Object.values(this.doFieldsHaveErrors()).includes(true))
    const errorDisplay = this.shouldTheFieldMarkError
    const isWarningDisplayed = this.shouldTheFieldMarkError('imageUrl') ? 'errorWarning' : 'hidden'

    return (
      <div>
        <h4>Become a franchisee! Start your own Margaret Hamilton Campus:</h4>
        <form method="POST" action="http://localhost:1337/api/campuses" >
          <div className="formSection">
            <label htmlFor="name">Campus Name</label>
            <div>
              <input
                name="name"
                type="text"
                onChange={this.handleNameChange}
                className = {errorDisplay('name') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('name')}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="address">Address</label>
            <div>
              <input
                name="address"
                type="text"
                onChange={this.handleAddressChange}
                className = {errorDisplay('address') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('address')}
              />
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="imageUrl">Campus Image</label>
            <div>
              <input
                name="imageUrl"
                type="text"
                onChange={this.handleImageChange}
                className = {errorDisplay('imageUrl') ? 'error' : ''}
                onBlur={this.handleBlurWhenInteracting('imageUrl')}
              />
              <span className={isWarningDisplayed}>Must be direct URL to image file</span>
            </div>
          </div>

          <div className="formSection">
            <label htmlFor="description">Description <i>(optional)</i></label>
            <div>
              <textarea name="description" />
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

export default AddCampus;
