import React from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { removePerson } from 'actions/mainActions';

import './Person.scss';

export const Person = ({ person }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removePerson({ UID: person.UID, type: person.type }));
  }

  return (
    <div className="person">
      <div className="person__name">
        <p className="text person__text">ФИО: <span>{person.fullName}</span></p>
        <IconButton
          size="small"
          color='error'
          onClick={handleClick}
        >
          <CloseIcon size='small' />
        </IconButton>
      </div>
      <p className="text person__text">Дата рождения: <span>{moment(person.dataBorn).locale('ru').format('DD MMMM YYYY')}</span></p>
    </div>
  )
}