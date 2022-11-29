import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { PersonUpload } from "../PersonUpload/PersonUpload";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { usePersonName } from "hooks/personHooks";

import './PersonForm.scss';

export const PersonForm = ({ onSubmit }) => {
  const person = useSelector((state) => state.person.get('person'));
  const location = useLocation();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const getValue = (fieldName) => {
    if (location.state === 'proxy') {
      return person?.[fieldName] || null;
    }
    if (location.state === 'private' && !person[usePersonName(location.state)]) {
      return person?.[fieldName] || null;
    }
    return person?.[usePersonName(location.state) + 'Value']?.[fieldName] || null;
  }

  return (
    <form className="form-person" onSubmit={handleSubmit(onSubmit)}>
      {
        location.state !== 'сapable' &&
        <>
          <TextField
            autoComplete="off"
            label={location.state === 'private' ? 'Название организации' : 'Фамилия'}
            variant="outlined"
            size='small'
            defaultValue={getValue(location.state === 'private' ? 'name' : 'secondName')}
            {...register(`${location.state === 'private' ? 'name' : 'secondName'}`, {
              // required: true
            })}
            error={errors.firstName && true}
          />
          <TextField
            autoComplete="off"
            label={location.state === 'private' ? 'Адрес' : 'Имя'}
            variant="outlined"
            size='small'
            defaultValue={getValue(location.state === 'private' ? 'address' : 'firstName')}
            {...register(`${location.state === 'private' ? 'address' : 'firstName'}`, {
              // required: true
            })}
          />
          <TextField
            autoComplete="off"
            label={location.state === 'private' ? 'ИНН' : 'Отчество'}
            variant="outlined"
            size='small'
            defaultValue={getValue(location.state === 'private' ? 'inn' : 'lastName')}
            {...register(`${location.state === 'private' ? 'inn' : 'lastName'}`, {
              // required: true
            })}
          />
          {
            location.state !== 'private' &&
            <Controller
              control={control}
              name='dateBorn'
              defaultValue={getValue('dateBorn')}
              // rules={{ required: true }}
              render={({ field }) => (
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale={moment.locale('ru')}
                >
                  <DatePicker
                    {...field}
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
              )}
            />
          }
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