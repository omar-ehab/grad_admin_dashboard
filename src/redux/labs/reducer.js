import actions from './actions';

const initState = {
  labs: [],
  error: {},
}

export default function reducer(state = initState, { type, payload }) {
  switch(type) {
    case actions.GET_LABS_SUCCESS:
      const labs = payload.labs.map(lab => {
        return {
          id: lab.id,
          key: lab.id,
          lab_name: lab.name,
        }
      })
      return {
        ...state,
        labs
      }
    case actions.GET_LABS_ERROR:
      return {
        ...state,
        error: payload.error
      }
    default:
      return state
  }
}