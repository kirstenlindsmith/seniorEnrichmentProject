import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOneCampusFromServer} from '../actionCreators'
import {Link, Route, Switch} from 'react-router-dom'

class SingleCampus extends Component {

  componentDidMount(){
    this.props.loadOneCampus()
  }

  render(){
    const campus = this.props.campus
    
    return (
      <div>
        <div className='profileSingle'>
          <h2 className='pageTitle'>{campus.name} Campus</h2>
          <p className='smallText'>{campus.address}</p>
          <p className='description'>{campus.description}</p>
        <img src={campus.imageUrl} className='singleImage'/>
        <Switch>
          <Route exact path={`/campuses/${campus.id}`} render={() =>
            <Link to={`/campuses/${campus.id}/students`} className='viewLink'>View Enrolled Students</Link>
          } />
          
          <Route exact path={`/campuses/${campus.id}/students`} render={() =>
            <Link to={`/campuses/${campus.id}`} className='viewLink' id="closeLink">Close Enrolled Students</Link>
          } />
        </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campusState.selectedCampus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOneCampus: () => {
      const campusId = ownProps.match.params.campusId
      const thunkAction = getOneCampusFromServer(campusId)
      dispatch(thunkAction)
    }
  }
}

const ConnectedSingleCampusComponent = connect(mapStateToProps, mapDispatchToProps)(SingleCampus)

export default ConnectedSingleCampusComponent
