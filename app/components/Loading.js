import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible ? props.visible : false,
    };
  }
  render() {
    if (this.state.visible) {
      return (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    } else {
      return <div className="hidden" />;
    }
  }
}

export default Loading;
