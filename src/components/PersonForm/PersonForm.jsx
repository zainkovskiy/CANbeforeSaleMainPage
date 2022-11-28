import React from "react";
import { useForm } from 'react-hook-form';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { PersonUpload } from "../PersonUpload/PersonUpload";

export const PersonForm = ({ onSubmit }) => {
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        location.state !== 'сapable' &&
        <>
          <TextField
            autoComplete="off"
            label="Имя"
            variant="outlined"
            size='small'
            // defaultValue={requisitesValue?.downCount || ''}
            {...register('firstName', {
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
            {...register('secondName', {
              // required: true
            })}
          />
          <TextField
            autoComplete="off"
            label="Имя"
            variant="outlined"
            size='small'
            // defaultValue={requisitesValue?.downCount || ''}
            {...register('lastName', {
              // required: true
            })}
          />
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