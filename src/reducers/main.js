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
          "fullName": "Smith John Robert",
          "dataBorn": "2000-03-03",
          "type": "sellers",
          "UID": 12,
          "isCanClient": true,
          "isPrivateClient": true,
          "dateBorn": "1988-09-24",
          "isAdult": true, //Совершеннолений
          "isСapable": true, //Дееспособный
          "isGuardian": false, //Опекун/родитель
          "byProxy": false, //По доверенности
          "passDate": "2021-08-01",
          "passSeries": "8111",
          "passNumber": "421035",
          "passEntity": "Орган выдавший паспорт",
          "documents": [

          ],
          "realtor": {
            "UID": 9531,
            "name": "Соколов Александр",
            "isPayer": false,
            "organizationUID": "000000021",
            "departmentUID": "000050994",
            "price": 173160.00,
            "withoutСommissionAgent": false,
            "isIP": true,
          },
          "contract": {
            "UID": 54654,
            "type": "Договор поручения"
          }
        },
        {
          fullName: 'bla seller bla12',
          dataBorn: '2000-03-03',
          type: 'sellers',
          UID: 123
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