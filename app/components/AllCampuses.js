import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getCampusesFromServer, removeCampusFromServer} from '../actionCreators'

class AllCampuses extends Component {
  
  componentDidMount(){
    this.props.loadCampuses()
  }
  
  render(){
    const campuses = this.props.allCampuses || []
    const remove = this.props.removeCampus

    return (
      <div className="center">
        <ul className="profileList">
          {
            campuses.map(campus => {
              return (
                <div key={campus.id}>
                  <div className="profileElem">
                  <div>
                    <Link to={`/campuses/${campus.id}`}>
                      {campus.name}
                    </Link>
                  </div>
                  <Link to={`/campuses/${campus.id}`}>
                    <img src={campus.imageUrl} className="profileImage" />
                  </Link>
                  </div>
                  <button type='button' className='remove' onClick={()=>{
                      remove(campus.id)
                    }}>remove
                  </button>
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
    },
    removeCampus: (campusId) => {
      const thunkAction = removeCampusFromServer(campusId)
      console.log("REMOVE HIT!!!", thunkAction)
      dispatch(thunkAction)
    }
  }
}

const ConnectedAllCampusesComponent = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default withRouter(ConnectedAllCampusesComponent)
