import { createReducer } from "@reduxjs/toolkit";
import { Map } from 'immutable';
import { getPerson, setValuePerson } from 'actions/person';

const initialState = new Map({
  person: {}
})

export const person = createReducer(initialState, {
  [getPerson]: (state, action) => {
    return state.set('person', action.payload)
  },
  [setValuePerson]: (state, action) => {
    return state.setIn(['person', action.payload.name], action.payload.value)
  },
})