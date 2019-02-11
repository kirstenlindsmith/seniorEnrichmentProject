import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOneCampusFromServer} from '../actionCreators'
import {Link} from 'react-router-dom'

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
