// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import {combineReducers} from 'redux'
import {GET_CAMPUSES, GET_ONE_CAMPUS, GET_STUDENTS, GET_ONE_STUDENT, GET_ENROLLED_STUDENTS, REMOVE_CAMPUS, REMOVE_STUDENT, UPDATE_CAMPUS} from '../actionCreators'

const initialCampusState = {
  campuses: [],
  selectedCampus: {},
}

const initialStudentState = {
  students: [],
  enrolledStudents: [],
  selectedStudent: {},
}

export const campusReducer = (state=initialCampusState, action) => {
  switch (action.type){
    case GET_CAMPUSES:
      return {...state, campuses: action.campuses}
    case GET_ONE_CAMPUS:
      return {...state, selectedCampus: action.campus}
    case REMOVE_CAMPUS: {
      const newCampuses = state.campuses.filter(campus => campus.id !== action.id)
      return {...state, campuses: newCampuses}
    }
    case UPDATE_CAMPUS: {
      const newCampuses = state.campuses.map(campus => (
        action.campus === campus ? {...action.campus } : campus
      ))
      return {...state, campuses: newCampuses}
    }
    default: return state
  }
}

export const studentReducer = (state=initialStudentState, action) => {
  switch (action.type){
    case GET_STUDENTS:
      return {...state, students: action.students}
    case GET_ONE_STUDENT:
      return {...state, selectedStudent: action.student}
    case GET_ENROLLED_STUDENTS:
      return {...state, enrolledStudents: action.students}
    case REMOVE_STUDENT: {
      const newStudents = state.students.filter(student => student.id !== action.id)
      return {...state, students: newStudents}
    }  
    default: return state
  }
}

const rootReducer = combineReducers({campusState: campusReducer, studentState: studentReducer})

export default rootReducer
