const actions = {
  GET_ALL_STUDENTS_REQUEST: 'GET_ALL_STUDENTS_REQUEST',
  GET_ALL_STUDENTS_SUCCESS: 'GET_ALL_STUDENTS_SUCCESS',
  GET_ALL_STUDENTS_ERROR: 'GET_ALL_STUDENTS_ERROR',

  UPDATE_SELECTED_STUDENT_FORM: "UPDATE_SELECTED_STUDENT_FORM",

  OPEN_INSERT_STUDENT_MODAL: "OPEN_INSERT_STUDENT_MODAL",
  CLOSE_INSERT_STUDENT_MODAL: "CLOSE_INSERT_STUDENT_MODAL",

  OPEN_EDIT_STUDENT_MODAL: "OPEN_EDIT_STUDENT_MODAL",
  CLOSE_EDIT_STUDENT_MODAL: "CLOSE_EDIT_STUDENT_MODAL",
  
  STORE_NEW_STUDENT_REQUEST: "STORE_NEW_STUDENT_REQUEST",
  STORE_NEW_STUDENT_SUCCESS: "STORE_NEW_STUDENT_SUCCESS",
  STORE_NEW_STUDENT_ERROR: "STORE_NEW_STUDENT_ERROR",

  EDIT_STUDENT_REQUEST: "EDIT_STUDENT_REQUEST",
  EDIT_STUDENT_SUCCESS: "EDIT_STUDENT_SUCCESS",
  EDIT_STUDENT_ERROR: "EDIT_STUDENT_ERROR",

  fetchStudents: () => ({
    type: actions.GET_ALL_STUDENTS_REQUEST
  }),

  storeNewStudent: () => ({
    type: actions.STORE_NEW_STUDENT_REQUEST
  }),

  editStudent: (student_id) => ({
    type: actions.EDIT_STUDENT_REQUEST,
    payload: { student_id }
  }),

  updateSelectedStudentForm: (key, value) => ({
    type: actions.UPDATE_SELECTED_STUDENT_FORM,
    payload: {key, value}
  }),

  openInsertStudentModal: () => ({
    type: actions.OPEN_INSERT_STUDENT_MODAL,
  }),

  closeInsertStudentModal: () => ({
    type: actions.CLOSE_INSERT_STUDENT_MODAL,
  }),

  openEditStudentModal: (student_id) => ({
    type: actions.OPEN_EDIT_STUDENT_MODAL,
    payload: { student_id }
  }),

  closeEditStudentModal: () => ({
    type: actions.CLOSE_EDIT_STUDENT_MODAL
  })

};
export default actions;
