import actions from './actions';

const initState = {
  doctors: [],
  selected_doctor_id: "",
  selected_doctor: {},
  error: "",
  insert_errors: {},
  insert_doctor_modal: false,
  edit_doctor_modal: false,
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_DOCTORS_SUCCESS:
      const doctors = payload.doctors.map(doctor => {
        return {
          id: doctor.id,
          key: doctor.id,
          name: doctor.name,
          email: doctor.email,
          phone_number: doctor.phone_number
        }
      })
      return {
        ...state,
        doctors
      };
    case actions.GET_ALL_DOCTORS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.UPDATE_SELECTED_DOCTORS_FORM:
      return {
        ...state,
        selected_doctor: {
          ...state.selected_doctor,
          [payload.key]: payload.value
        }
      };
    case actions.OPEN_INSERT_DOCTORS_MODAL:
      return {
        ...state,
        insert_doctor_modal: true,
        edit_doctor_modal: false,
      };
    case actions.CLOSE_INSERT_DOCTORS_MODAL:
      return {
        ...state,
        selected_doctor: {},
        insert_doctor_modal: false,
        edit_doctor_modal: false,
      };
    case actions.STORE_NEW_DOCTORS_SUCCESS:
      const newDoctor = {
        id: payload.doctor.id,
        key: payload.doctor.id,
        name: payload.doctor.name,
        email: payload.doctor.email,
        phone_number: payload.doctor.phone_number
      }
      return {
        ...state,
        doctors: [newDoctor, ...state.doctors]
      };
    case actions.STORE_NEW_DOCTORS_ERROR:
      return {
        ...state,
        insert_errors: payload.error
      };
    case actions.OPEN_EDIT_DOCTORS_MODAL:
      const doctor = state.doctors.filter(doc => {
        return doc.id === payload.doctor_id
      })
      return {
        ...state,
        selected_doctor_id: doctor[0].id,
        selected_doctor: doctor[0],
        edit_doctor_modal: true,
        insert_doctor_modal: false
      };
    case actions.CLOSE_EDIT_DOCTORS_MODAL:
      return {
        ...state,
        selected_doctor_id: "",
        selected_doctor: {},
        insert_doctor_modal: false,
        edit_doctor_modal: false,
      };
    case actions.EDIT_DOCTORS_SUCCESS:
      const editedDoctor = {
        id: payload.doctor.id,
        key: payload.doctor.id,
        name: payload.doctor.name,
        email: payload.doctor.email,
        phone_number: payload.doctor.phone_number,
      }
      const newDoctorsList = state.doctors.map(doc => {
        if(doc.id === editedDoctor.id){
          return editedDoctor
        }
        return doc;
      });
      return {
        ...state,
        doctors: newDoctorsList
      };
    default:
      return state;
  }
}
