import axios from 'axios'

//action types
export const GET_CAMPUSES = 'GET_CAMPUSES'
export const GET_ONE_CAMPUS = 'GET_ONE_CAMPUS'
export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_ONE_STUDENT = 'GET_ONE_STUDENT'
export const GET_ENROLLED_STUDENTS = 'GET_ENROLLED_STUDENTS'
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
export const REMOVE_STUDENT = 'REMOVE_STUDENT'
export const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'


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

export const removeCampus = (campusId) => {
  return {
    type: REMOVE_CAMPUS,
    id: campusId
  }
}

export const updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
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

export const loadEnrolledStudents = (students) => {
  return {
    type: GET_ENROLLED_STUDENTS,
    students
  }
}

export const removeStudent = (studentId) => {
  return {
    type: REMOVE_STUDENT,
    id: studentId
  }
}

export const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
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

export const removeCampusFromServer = (campusId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/campuses/${campusId}`)
      const action = removeCampus(campusId)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateCampusInServer = (campusId) => {
  return async (dispatch) => {
    try {
      const campus = await axios.get(`/api/campuses/${campusId}`)
      await axios.put(`/api/campuses/${campusId}`, campus.data)
      dispatch(updateCampus(campus.data))
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

export const getEnrolledStudentsFromServer = (campusId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/campuses/${campusId}/students`)
      dispatch(loadEnrolledStudents(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeStudentFromServer = (studentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/students/${studentId}`)
      dispatch(removeStudent(studentId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateStudentInServer = (studentId) => {
  return async (dispatch) => {
    try {
      const student = await axios.get(`/api/students/${campusId}`)
      await axios.put(`/api/students/${studentId}`, student.data)
      dispatch(updateStudent(student.data))
    } catch (err) {
      console.error(err)
    }
  }
}
