import { createAction } from "@reduxjs/toolkit";
import axios from 'axios';

export const setLoading = createAction('setLoading');
export const setError = createAction('setError');
export const setData = createAction('setData');
export const setCalculation = createAction('setCalculation');
export const removePerson = createAction('removePerson');
export const setAddress = createAction('setAddress');
export const setRequisites = createAction('setRequisites');
export const setRequisitesValue = createAction('setRequisitesValue');
export const setObject = createAction('setObject');
export const setObjectPart = createAction('setObjectPart');
export const setPerson = createAction('setPerson');

export const getData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://catfact.ninja/fact");
      if (res.status === 200) {
        dispatch(setData());
      }
    } catch (err) {
      console.log(err);
      dispatch(setError());
    } finally {
      dispatch(setLoading());
    }
  }
}