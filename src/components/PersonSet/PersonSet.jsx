import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import './PersonSet.scss';

export const PersonSet = () => {
  const person = useSelector((state) => state.person.get('person'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!person) {
      navigate('/');
    }
  }, [])
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      {
        person &&
        <>
          <div style={navTitle}>
            <Button
              size='small'
              onClick={goBack}
              startIcon={<KeyboardBackspaceIcon />}
            >
              Назад
            </Button>
            <span className="text">
              {/* {
            person ?
            'Редактирование участника сделки' :
            'Новый участник сделки'
          } */}
            </span>
          </div>
          <Outlet />
        </>
      }
    </>
  )
}

const navTitle = {
  display: 'flex',
  width: '100%',
  fontWeight: 600,
  border: '1px solid #737373',
  padding: '0.5rem 1rem',
  borderRadius: 5,
  boxSizing: 'border-box',
  gap: '1rem',
  alignItems: 'center'
}