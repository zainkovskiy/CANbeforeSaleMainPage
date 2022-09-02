import React from "react";

import './Title.scss';

export function Title({ title }) {
  return (<div className='title text'>
    {
      title
    }
  </div>)
}