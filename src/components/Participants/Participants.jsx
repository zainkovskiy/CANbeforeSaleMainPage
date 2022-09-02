import React from "react";

import { People } from "components/People";

import './Participants.scss';

export const Participants = () => {
  return (
    <div className="participants">
      <People
        title={'Продавец'}
        stateName={'sellers'}
      />
      <People
        title={'Покупатель'}
        stateName={'buyers'}
      />
    </div>
  )
}