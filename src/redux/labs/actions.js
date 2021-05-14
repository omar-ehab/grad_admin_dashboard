const actions = {
  GET_LABS_REQUEST: 'GET_LABS_REQUEST',
  GET_LABS_SUCCESS: 'GET_LABS_SUCCESS',
  GET_LABS_ERROR: 'GET_LABS_ERROR',

  

  fetchLabs: () => ({
    type: actions.GET_LABS_REQUEST,
  })
}

export default actions;