import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { getOneCampusFromServer } from '../actionCreators';

class SingleCampus extends Component {
  componentDidMount() {
    this.props.loadOneCampus();
  }

  render() {
    const campus = this.props.campus;

    if (!campus || !Object.keys(campus).length) {
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
      return (
        <div>
          <div className="profileSingle">
            <h2 className="pageTitle">{campus.name} Campus</h2>
            <p className="smallText">{campus.address}</p>
            <p className="description">{campus.description}</p>
            <button type="button" className="button">
              <Link to={`/campuses/${campus.id}/update`} className="editLink">
                edit this campus
              </Link>
            </button>
            <img src={campus.imageUrl} className="singleImage" />
            <Switch>
              <Route
                exact
                path={`/campuses/${campus.id}`}
                render={() => (
                  <Link
                    to={`/campuses/${campus.id}/students`}
                    className="viewLink"
                  >
                    View Enrolled Students
                  </Link>
                )}
              />

              <Route
                exact
                path={`/campuses/${campus.id}/students`}
                render={() => (
                  <Link
                    to={`/campuses/${campus.id}`}
                    className="viewLink"
                    id="closeLink"
                  >
                    Close Enrolled Students
                  </Link>
                )}
              />
            </Switch>
          </div>
        </div>
      );
    }
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

const ConnectedSingleCampusComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);

export default ConnectedSingleCampusComponent;
