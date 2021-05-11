const actions = {
  GET_ALL_STAFF_REQUEST: 'GET_ALL_STAFF_REQUEST',
  GET_ALL_STAFF_SUCCESS: 'GET_ALL_STAFF_SUCCESS',
  GET_ALL_STAFF_ERROR: 'GET_ALL_STAFF_ERROR',


  UPDATE_SELECTED_STAFF_FORM: "UPDATE_SELECTED_STAFF_FORM",


  OPEN_INSERT_STAFF_MODAL: "OPEN_INSERT_STAFF_MODAL",
  CLOSE_INSERT_STAFF_MODAL: "CLOSE_INSERT_STAFF_MODAL",

  OPEN_EDIT_STAFF_MODAL: "OPEN_EDIT_STAFF_MODAL",
  CLOSE_EDIT_STAFF_MODAL: "CLOSE_EDIT_STAFF_MODAL",


  STORE_NEW_STAFF_REQUEST: "STORE_NEW_STAFF_REQUEST",
  STORE_NEW_STAFF_SUCCESS: "STORE_NEW_STAFF_SUCCESS",
  STORE_NEW_STAFF_ERROR: "STORE_NEW_STAFF_ERROR",

  EDIT_STAFF_REQUEST: "EDIT_STAFF_REQUEST",
  EDIT_STAFF_SUCCESS: "EDIT_STAFF_SUCCESS",
  EDIT_STAFF_ERROR: "EDIT_STAFF_ERROR",


  fetchStaffMembers: () => ({
    type: actions.GET_ALL_STAFF_REQUEST
  }),


  storeNewStaff: () => ({
    type: actions.STORE_NEW_STAFF_REQUEST
  }),

  editStaff: (staff_id) => ({
    type: actions.EDIT_STAFF_REQUEST,
    payload: { staff_id }
  }),

  updateSelectedStaffForm: (key, value) => ({
    type: actions.UPDATE_SELECTED_STAFF_FORM,
    payload: {key, value}
  }),

  openInsertStaffModal: () => ({
    type: actions.OPEN_INSERT_STAFF_MODAL,
  }),

  closeInsertStaffModal: () => ({
    type: actions.CLOSE_INSERT_STAFF_MODAL,
  }),

  openEditStaffModal: (staff_id) => ({
    type: actions.OPEN_EDIT_STAFF_MODAL,
    payload: { staff_id }
  }),

  closeEditStaffModal: () => ({
    type: actions.CLOSE_EDIT_STAFF_MODAL
  })
};
export default actions;
