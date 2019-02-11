// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!

import {combineReducers} from 'redux'
import {GET_CAMPUSES, GET_ONE_CAMPUS, GET_STUDENTS, GET_ONE_STUDENT, GET_ENROLLED_STUDENTS} from '../actionCreators'

const initialCampusState = {
  campuses: [],
  selectedCampus: {}
}

const initialStudentState = {
  students: [],
  enrolledStudents: [],
  selectedStudent: {}
}

export const campusReducer = (state=initialCampusState, action) => {
  switch(action.type){
    case GET_CAMPUSES:
      return {...state, campuses: action.campuses}
    case GET_ONE_CAMPUS:
      return {...state, selectedCampus: action.campus}  
    default: return state
  }
}

export const studentReducer = (state=initialStudentState, action) => {
  switch(action.type){
    case GET_STUDENTS:
      return {...state, students: action.students}
    case GET_ONE_STUDENT:
      return {...state, selectedStudent: action.student}
    case GET_ENROLLED_STUDENTS:
      return {...state, enrolledStudents: action.students}
    default: return state
  }
}

const rootReducer = combineReducers({campusState: campusReducer, studentState: studentReducer})

export default rootReducer

// const initialState = {}

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state
//   }
// }

// export default rootReducer
