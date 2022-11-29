import React from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { removePerson } from 'actions/mainActions';

import './Person.scss';
import { getPerson } from "actions/person";

const centrLogo = {
  backgroundImage: 'url(https://crm.centralnoe.ru/dealincom/assets/img/centr2.png)',
  backgroundPosition: '',
  backgroundRepeat: 'no - repeat',
  backgroundSize: 'contain',
  height: 24,
  width: 24,
}

export const Person = ({ person }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removePerson({ UID: person.UID, type: person.type }));
  }

  const handlerClickLink = () => {
    dispatch(getPerson(person));
  }


  return (
    <div className="person">
      <div className="person__top">
        <span style={person?.isCanClient && centrLogo}></span>
        <IconButton
          size="small"
          color='error'
          onClick={handleClick}
        >
          <CloseIcon size='small' />
        </IconButton>
      </div>
      <p className="text person__text">ФИО: <span>
        {person?.secondName} {person?.firstName} {person?.lastName}
        </span></p>
      <p className="text person__text">Дата рождения: <span>{moment(person.dateBorn).locale('ru').format('DD MMMM YYYY')}</span></p>
      {
        person?.realtor &&
        <p className="text person__text">Риелтор: <span>{person?.realtor?.name}</span></p>
      }
      {
        person?.contract &&
        <p className="text person__text">Договор: <span>{person?.contract?.type}</span></p>
      }
      <div className="person__bottom">
        <Button
          size='small'
          variant="outlined"
        >
          <Link 
            to='person'
            state='private'
            style={{ color: '#0c54a0', textDecoration: 'none' }}
            onClick={handlerClickLink}
          >
            Редактировать
          </Link>
        </Button>
      </div>
    </div>
  )
}