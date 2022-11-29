import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import { getPerson } from "actions/person";

import { Person } from 'components/Person';

const stylePeople = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
}


export const People = ({ title, stateName }) => {
  const people = useSelector((state) => state.main.getIn(['data', stateName]))
  const dispatch = useDispatch();
  const handlerClickLink = () => {
    dispatch(getPerson({type: stateName, UID: `New${Math.floor(Math.random() * (100 - 1) + 1)}`}));
  }
  return (
    <div style={stylePeople}>
      <div className='subtitle text'>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            right: '1rem'
          }}
          size="small"
          onClick={handlerClickLink}
        >
          <Link
            to='person'
            state='private'
            style={{ color: '#0c54a0', textDecoration: 'none' }}
          >
            <AddCircleOutlineIcon size='small' />
          </Link>
        </IconButton>
      </div>
      {
        (people && people?.length > 0) &&
        people.map((person) =>
          <Person key={person.UID} person={person} />
        )
      }
    </div>
  )
}