import axios from 'axios'

//action types
export const GET_CAMPUSES = 'GET_CAMPUSES'
export const GET_ONE_CAMPUS = 'GET_ONE_CAMPUS'
export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_ONE_STUDENT = 'GET_ONE_STUDENT'

//sync action creators
export const loadCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

export const loadOneCampus = (campus) => {
  return {
    type: GET_ONE_CAMPUS,
    campus
  }
}

export const loadStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}

export const loadOneStudent = (student) => {
  return {
    type: GET_ONE_STUDENT,
    student
  }
}

//async action creators

export const getCampusesFromServer = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/campuses')
      dispatch(loadCampuses(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getOneCampusFromServer = (campusId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/campuses/${campusId}`)
      dispatch(loadOneCampus(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getStudentsFromServer = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/students')
      dispatch(loadStudents(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getOneStudentFromServer = (studentId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/students/${studentId}`)
      dispatch(loadOneStudent(data))
    } catch (err) {
      console.error(err)
    }
  }
}

