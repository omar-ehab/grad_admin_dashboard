import actions from './actions';

const initState = {
  students: [],
  selected_student_id: "",
  selected_student: {},
  error: "",
  insert_errors: {},
  insert_student_modal: false,
  edit_student_modal: false,
};

 
export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_ALL_STUDENTS_SUCCESS:
      const students = payload.students.map(student => {
        return {
          id: student.id,
          key: student.id,
          card_id: student.card_id,
          name: student.name,
          email: student.email,
          mobile: student.student_phone_number,
          parent_mobile: student.parent_phone_number,
          birth_date: student.birth_date
        }
      })
      return {
        ...state,
        students
      };
    case actions.GET_ALL_STUDENTS_ERROR:
      return {
        ...state,
        error: payload.message
      };
    case actions.UPDATE_SELECTED_STUDENT_FORM:
      return {
        ...state,
        selected_student: {
          ...state.selected_student,
          [payload.key]: payload.value
        }
      };
    case actions.OPEN_INSERT_STUDENT_MODAL:
      return {
        ...state,
        insert_student_modal: true,
        edit_student_modal: false,
      };
    case actions.CLOSE_INSERT_STUDENT_MODAL:
      return {
        ...state,
        selected_student: {},
        insert_student_modal: false,
        edit_student_modal: false,
      };
    case actions.STORE_NEW_STUDENT_SUCCESS:
      const newStudent = {
        id: payload.student.id,
        key: payload.student.id,
        card_id: payload.student.card_id,
        name: payload.student.name,
        email: payload.student.email,
        mobile: payload.student.student_phone_number,
        parent_mobile: payload.student.parent_phone_number,
        birth_date: payload.student.birth_date
      }
      return {
        ...state,
        students: [newStudent, ...state.students]
      };
    case actions.STORE_NEW_STUDENT_ERROR:
      return {
        ...state,
        insert_errors: payload.error
      };
    case actions.OPEN_EDIT_STUDENT_MODAL:
      const student = state.students.filter(std => {
        return std.id === payload.student_id
      })
      return {
        ...state,
        selected_student_id: student[0].id,
        selected_student: student[0],
        edit_student_modal: true,
        insert_student_modal: false
      };
    case actions.CLOSE_EDIT_STUDENT_MODAL:
      return {
        ...state,
        selected_student_id: "",
        selected_student: {},
        insert_student_modal: false,
        edit_student_modal: false,
      };
    case actions.EDIT_STUDENT_SUCCESS:
      const editedStudent = {
        id: payload.student.id,
        key: payload.student.id,
        card_id: payload.student.card_id,
        name: payload.student.name,
        email: payload.student.email,
        mobile: payload.student.student_phone_number,
        parent_mobile: payload.student.parent_phone_number,
        birth_date: payload.student.birth_date
      }
      const newStudentsList = state.students.map(std => {
        if(std.id === editedStudent.id){
          return editedStudent
        }
        return std;
      });
      return {
        ...state,
        students: newStudentsList
      };
    default:
      return state;
  }
}
