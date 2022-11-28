import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from 'components/Layout';
import { MainPage } from 'components/MainPage';
import { PersonSet } from 'components/PersonSet';
import { PersonToggleQuestion } from 'components/PersonToggleQuestion';
import { PersonFormConstructor } from 'components/PersonFormConstructor';
export const router = createBrowserRouter([
  { 
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <MainPage/>
      },
      { 
        path: 'person/*',
        element: <PersonSet/>,
        children: [
          {
            index: true,
            element: <PersonFormConstructor/>
          },
          {
            path: 'adult',
            element: <PersonToggleQuestion/>
          },
          {
            path: 'сapable',
            element: <PersonFormConstructor/>
          },
          {
            path: 'proxy',
            element: <PersonFormConstructor/>
          },
          {
            path: 'guardian',
            element: <PersonFormConstructor/>
          },
        ]
      },
    ]
  },
  { 
    path: '*',
    element: <p className="text">page not found</p>
  },
])