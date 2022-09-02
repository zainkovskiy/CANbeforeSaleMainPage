import React from "react";
import { useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Person } from 'components/Person';

const stylePeople = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
}

export const People = ({ title, stateName }) => {
  const people = useSelector((state) => state.main.getIn(['data', stateName]))
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
        >
          <AddCircleOutlineIcon size='small' />
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