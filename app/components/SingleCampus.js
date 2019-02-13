import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { getOneCampusFromServer } from '../actionCreators';
import Loading from './Loading';

class SingleCampus extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this.props.loadOneCampus();
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
    const campus = this.props.campus;

    if (!campus || !Object.keys(campus).length) {
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
      return (
        <div>
          <div className="profileSingle">
            {this.load()}
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
