import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCampusesFromServer,
  removeCampusFromServer,
} from '../actionCreators';

class AllCampuses extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.props.loadCampuses();
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
    const campuses = this.props.allCampuses || [];
    const remove = this.props.removeCampus;

    return (
      <div className="center">
        {this.load()}
        <ul className="profileList">
          {campuses.map(campus => {
            return (
              <div key={campus.id}>
                <div className="profileElem">
                  <div>
                    <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>{' '}
                    <button
                      type="button"
                      className="remove"
                      onClick={() => {
                        remove(campus.id);
                      }}
                    >
                      x
                    </button>
                  </div>
                  <Link to={`/campuses/${campus.id}`}>
                    <img src={campus.imageUrl} className="profileImage" />
                  </Link>
                </div>
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
    allCampuses: state.campusState.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCampuses: () => {
      const thunkAction = getCampusesFromServer();
      dispatch(thunkAction);
    },
    removeCampus: campusId => {
      const thunkAction = removeCampusFromServer(campusId);
      dispatch(thunkAction);
    },
  };
};

const ConnectedAllCampusesComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);

export default ConnectedAllCampusesComponent;
