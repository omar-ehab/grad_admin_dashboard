const actions = {
  GET_ALL_DOCTORS_REQUEST: 'GET_ALL_DOCTORS_REQUEST',
  GET_ALL_DOCTORS_SUCCESS: 'GET_ALL_DOCTORS_SUCCESS',
  GET_ALL_DOCTORS_ERROR: 'GET_ALL_DOCTORS_ERROR',


  UPDATE_SELECTED_DOCTORS_FORM: "UPDATE_SELECTED_DOCTORS_FORM",


  OPEN_INSERT_DOCTORS_MODAL: "OPEN_INSERT_DOCTORS_MODAL",
  CLOSE_INSERT_DOCTORS_MODAL: "CLOSE_INSERT_DOCTORS_MODAL",

  OPEN_EDIT_DOCTORS_MODAL: "OPEN_EDIT_DOCTORS_MODAL",
  CLOSE_EDIT_DOCTORS_MODAL: "CLOSE_EDIT_DOCTORS_MODAL",


  STORE_NEW_DOCTORS_REQUEST: "STORE_NEW_DOCTORS_REQUEST",
  STORE_NEW_DOCTORS_SUCCESS: "STORE_NEW_DOCTORS_SUCCESS",
  STORE_NEW_DOCTORS_ERROR: "STORE_NEW_DOCTORS_ERROR",

  EDIT_DOCTORS_REQUEST: "EDIT_DOCTORS_REQUEST",
  EDIT_DOCTORS_SUCCESS: "EDIT_DOCTORS_SUCCESS",
  EDIT_DOCTORS_ERROR: "EDIT_DOCTORS_ERROR",


  fetchDoctors: () => ({
    type: actions.GET_ALL_DOCTORS_REQUEST
  }),


  storeNewDoctor: () => ({
    type: actions.STORE_NEW_DOCTORS_REQUEST
  }),

  editDoctor: (doctor_id) => ({
    type: actions.EDIT_DOCTORS_REQUEST,
    payload: { doctor_id }
  }),

  updateSelectedDoctorForm: (key, value) => ({
    type: actions.UPDATE_SELECTED_DOCTORS_FORM,
    payload: {key, value}
  }),

  openInsertDoctorModal: () => ({
    type: actions.OPEN_INSERT_DOCTORS_MODAL,
  }),

  closeInsertDoctorModal: () => ({
    type: actions.CLOSE_INSERT_DOCTORS_MODAL,
  }),

  openEditDoctorModal: (doctor_id) => ({
    type: actions.OPEN_EDIT_DOCTORS_MODAL,
    payload: { doctor_id }
  }),

  closeEditDoctorModal: () => ({
    type: actions.CLOSE_EDIT_DOCTORS_MODAL
  })
};
export default actions;
