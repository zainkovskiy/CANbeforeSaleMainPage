import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getData } from "actions/mainActions";

import { Header } from 'components/Header';
import { Layout } from 'components/Layout';
import { Linear } from 'components/Linear';

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
      <Header />
      {
        loading ?
          <Linear /> :
          <>
            {
              error ?
                <span className="text">error</span> :
                <Layout />
            }
          </>
      }
    </>
  )
}