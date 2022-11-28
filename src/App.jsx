import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { getData } from "actions/mainActions";

import { Linear } from 'components/Linear';
import { router } from "./router";

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.main.get('loading'));
  const error = useSelector((state) => state.main.get('error'));

  useEffect(() => {
    dispatch(getData());
  }, [])

  return (
    <>
      {
        loading ?
          <Linear /> :
          <>
            {
              error ?
                <span className="text">error</span> :
                <RouterProvider router={router} />
            }
          </>
      }
    </>
  )
}