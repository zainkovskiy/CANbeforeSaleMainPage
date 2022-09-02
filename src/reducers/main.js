import { createReducer } from "@reduxjs/toolkit";
import { Map, fromJS } from 'immutable';

import {
  setLoading,
  setError,
  setData,
  setCalculation,
  removePerson,
  setAddress,
  setRequisites,
  setRequisitesValue,
  setObject,
  setObjectPart
} from 'actions/mainActions';

const initialState = new Map({
  loading: true,
  error: false,
  data: {},
})

export const main = createReducer(initialState, {
  [setLoading]: (state, action) => {
    return state.set('loading', !state.get('loading'))
  },
  [setError]: (state, action) => {
    return state.set('error', true)
  },
  [setData]: (state, action) => {
    return state.set('data', {
      calculation: {
        cash: true,
        cashCount: 500,
        mortgage: true,
        mortgageCount: 3000,
        mortgageFirst: 500,
        mortgageBank: 'PAO SPER',
        msk: false,
        gzhs: true
      },
      sellers: [
        {
          fullName: 'bla seller bla10',
          dataBorn: '2000-03-03',
          type: 'sellers',
          UID: 10
        },
        {
          fullName: 'bla seller bla12',
          dataBorn: '2000-03-03',
          type: 'sellers',
          UID: 12
        },
      ],
      buyers: [
        {
          fullName: 'bla buyer bla11',
          dataBorn: '2000-03-03',
          type: 'buyers',
          UID: 11
        }
      ],
      requisites: {
        // timePDKP: '2022-02-02'
      }
    })
  },
  [setCalculation]: (state, action) => {
    return state.setIn(['data', 'calculation'], action.payload)
  },
  [removePerson]: (state, action) => {
    const arr = state.getIn(['data', action.payload.type]);
    return state.setIn(['data', action.payload.type], arr.filter(item => item.UID !== action.payload.UID))
  },
  [setAddress]: (state, action) => {
    return state.setIn(['data', 'address'], action.payload)
  },
  [setRequisites]: (state, action) => {
    const name = action.payload.target.name;
    const type = action.payload.target.type;
    const value = type === 'checkbox' ? action.payload.target.checked : action.payload.target.value;
    return state.setIn(['data', 'requisites', name], value)
  },
  [setRequisitesValue]: (state, action) => {
    const name = action.payload.name;
    const value = action.payload.value;
    return state.setIn(['data', 'requisites', name], value)
  },
  [setObject]: (state, action) => {
    return state.setIn(['data', 'object'], action.payload)
  },
  [setObjectPart]: (state, action) => {
    const name = action.payload.target.name;
    const value = action.payload.target.value;
    return state.setIn(['data', 'object', name], value)
  },
})