import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@mui/material";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { useForm } from "react-hook-form";

import { ModalWindow } from 'components/ModalWindow';
import { ModalObject } from 'components/ModalObject';

import { setObject, setObjectPart } from 'actions/mainActions';

import './Object.scss';

export const Object = () => {
  const object = useSelector((state) => state.main.getIn(['data', 'object']));
  const dispatch = useDispatch();
  const { register, watch } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }
  const handleChange = () => {
    dispatch(setObjectPart(event));
  }
  const handleClick = () => {
    dispatch(setObject(null));
  }

  const isPart = watch('part');
  return (
    <>
      {
        object ?
          <div className="object">
            <div className="object-item">
              <p className="text object__text">{object.reqTypeofRealty}<span>{object.fullAddress}</span></p>
              <span className="text object__text-price">{object.reqPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}&#8381;</span>
            </div>
            <div style={{ display: 'flex' }}>
              <FormControlLabel
                control={<Switch color="primary"
                  {...register('part')}
                />}
                label="Указать долю"
                labelPlacement="start"
                sx={{ margin: 0, justifySelf: 'start' }}
              />
              {
                isPart ?
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    size='small'
                    {...register('partCount')}
                    onChange={handleChange}
                  /> :
                  <div style={{ height: 40 }}></div>
              }
            </div>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color='error'
              sx={{
                alignSelf: 'flex-end'
              }}
              onClick={handleClick}
              size='small'
            >
              удалить объект
            </Button>
          </div> :
          <div className="object">
            <span className="text object__change">
              Вы можете <Link
                sx={{ cursor: 'pointer' }}
                onClick={handleOpen}
              >
                выбрать объект
              </Link>
            </span>
          </div>
      }
      <ModalWindow
        open={open}
        onClose={handleOpen}
        maxWidth='md'
      >
        <ModalObject
          onClose={handleOpen}
        />
      </ModalWindow>
    </>
  )
}