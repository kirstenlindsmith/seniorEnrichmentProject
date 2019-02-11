import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCampusesFromServer} from '../actionCreators'

class AllCampuses extends Component {
  
  componentDidMount(){
    this.props.loadCampuses()
  }
  
  render(){
    const campuses = this.props.allCampuses || []

    return (
      <div>
        <ul className="profileList">
          {
            campuses.map(campus => {
              return (
                <div key={campus.id} className="profileElem">
                <div key={campus.id}>
                  <Link to={`/campuses/${campus.id}`}>
                    {campus.name}
                  </Link>
                </div>
                <Link to={`/campuses/${campus.id}`}>
                  <img src={campus.imageUrl} className="profileImage" />
                </Link>
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allCampuses: state.campusState.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampuses: () => {
      const thunkAction = getCampusesFromServer()
      dispatch(thunkAction)
    }
  }
}

const ConnectedAllCampusesComponent = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default ConnectedAllCampusesComponent
