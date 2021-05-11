import actions from './actions';

const initState = {
  staff_members: [],
  selected_staff_id: "",
  selected_staff_member: {},
  error: "",
  insert_errors: {},
  insert_staff_modal: false,
  edit_staff_modal: false,
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_STAFF_SUCCESS:
      const members = payload.memebers.map(staff => {
        return {
          id: staff.id,
          key: staff.id,
          name: staff.name,
          email: staff.email,
          phone_number: staff.phone_number,
          job_title: staff.job_title
        }
      })
      return {
        ...state,
        staff_members: members
      };
    case actions.GET_ALL_STAFF_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.UPDATE_SELECTED_STAFF_FORM:
      return {
        ...state,
        selected_staff_member: {
          ...state.selected_staff_member,
          [payload.key]: payload.value
        }
      };
    case actions.OPEN_INSERT_STAFF_MODAL:
      return {
        ...state,
        insert_staff_modal: true,
        edit_staff_modal: false,
      };
    case actions.CLOSE_INSERT_STAFF_MODAL:
      return {
        ...state,
        selected_staff_member: {},
        insert_staff_modal: false,
        edit_staff_modal: false,
      };
    case actions.STORE_NEW_STAFF_SUCCESS:
      const newStaff = {
        id: payload.staff.id,
        key: payload.staff.id,
        name: payload.staff.name,
        email: payload.staff.email,
        phone_number: payload.staff.phone_number,
        job_title: payload.staff.job_title
      }
      return {
        ...state,
        staff_members: [newStaff, ...state.staff_members]
      };
    case actions.STORE_NEW_STAFF_ERROR:
      return {
        ...state,
        insert_errors: payload.error
      };
    case actions.OPEN_EDIT_STAFF_MODAL:
      const member = state.staff_members.filter(staff => {
        return staff.id === payload.staff_id
      })
      return {
        ...state,
        selected_staff_id: member[0].id,
        selected_staff_member: member[0],
        edit_staff_modal: true,
        insert_staff_modal: false
      };
    case actions.CLOSE_EDIT_STAFF_MODAL:
      return {
        ...state,
        selected_staff_id: "",
        selected_staff_member: {},
        insert_staff_modal: false,
        edit_staff_modal: false,
      };
    case actions.EDIT_STAFF_SUCCESS:
      const editedStaff = {
        id: payload.staff.id,
        key: payload.staff.id,
        name: payload.staff.name,
        email: payload.staff.email,
        phone_number: payload.staff.phone_number,
        job_title: payload.staff.job_title
      }
      const newStaffList = state.staff_members.map(staff => {
        if(staff.id === editedStaff.id){
          return editedStaff
        }
        return staff;
      });
      return {
        ...state,
        staff_members: newStaffList
      };
    default:
      return state;
  }
}
