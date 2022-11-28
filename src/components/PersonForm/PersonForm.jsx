import React from "react";
import { useForm } from 'react-hook-form';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { PersonUpload } from "../PersonUpload/PersonUpload";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment/moment";

import './PersonForm.scss';

export const PersonForm = ({ onSubmit }) => {
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form className="form-person" onSubmit={handleSubmit(onSubmit)}>
      {
        location.state !== 'сapable' &&
        <>
          <TextField
            autoComplete="off"
            label="Фамилия"
            variant="outlined"
            size='small'
            // defaultValue={requisitesValue?.downCount || ''}
            {...register('secondName', {
              // required: true
            })}
            error={errors.firstName && true}
          />
          <TextField
            autoComplete="off"
            label="Имя"
            variant="outlined"
            size='small'
            // defaultValue={requisitesValue?.downCount || ''}
            {...register('firstName', {
              // required: true
            })}
          />
          <TextField
            autoComplete="off"
            label="Отчество"
            variant="outlined"
            size='small'
            // defaultValue={requisitesValue?.downCount || ''}
            {...register('lastName', {
              // required: true
            })}
          />
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            adapterLocale={moment.locale('ru')}
          >
            <DatePicker
              onChange={() => {}}
              {...register('dateBorn', {
                // required: true
              })}
              renderInput={(params) => 
              <TextField {...params}
                size='small'
                inputProps={{
                  ...params.inputProps,
                  placeholder: 'дд.мм.гггг'
                }}
              />}
            />
          </LocalizationProvider>
        </>
      }
      <PersonUpload
        {...register('doc', {
          // required: true
        })}
      />
      <Button
        size="small"
        variant="contained"
        type='submit'
        sx={{ alignSelf: 'flex-end' }}
      >
        далее
      </Button>
    </form>
  )
}