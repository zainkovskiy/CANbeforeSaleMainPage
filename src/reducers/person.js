import { createReducer } from "@reduxjs/toolkit";
import { get, Map } from 'immutable';
import { getPerson, setValuePerson, setToggleValue, setValuePersonFinal, clearPerson } from 'actions/person';

const initialState = new Map({
  loadingPerson: false,
  person: null
})

export const person = createReducer(initialState, {
  [getPerson]: (state, action) => {
    return state.set('person', action.payload)
  },
  [setToggleValue]: (state, action) => {
    return state.setIn(['person', action.payload.name], action.payload.value)
  },
  [setValuePerson]: (state, action) => {
    return state.setIn(['person', action.payload.name], action.payload.data)
  },
  [setValuePersonFinal]: (state, action) => {
    return state.set('person', { ...state.get('person'), ...action.payload })
  },
  [clearPerson]: (state, action) => {
    return state.set('person', null)
  },
})