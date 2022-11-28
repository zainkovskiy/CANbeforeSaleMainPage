import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
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
            <div className="object__summary">
              <div className="object__wrap">
                <span className="text" style={{ fontWeight: 700 }}>Общие данные</span>
                <p className="text object__text">Цена: <span>{object?.reqPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}&#8381;</span></p>
                <p className="text object__text">{object?.reqTypeofRealty} <span>{object?.fullAddress}</span></p>
                <FormControlLabel
                  control={<Switch color="primary"
                    {...register('part')}
                  />}
                  label="Указать долю"
                  labelPlacement="start"
                  sx={{ margin: 0, justifySelf: 'start' }}
                />
                {
                  isPart &&
                  <TextField
                    autoComplete="off"
                    variant="outlined"
                    size='small'
                    {...register('partCount')}
                    onChange={handleChange}
                  />
                }
              </div>
              <div className="object__wrap">
                <span className="text" style={{ fontWeight: 700 }}>Данные росреестра</span>
                <p className="text object__text">Статус объекта: <span>{object?.rosreestrData?.objStatus}</span></p>
                <p className="text object__text">Площадь: <span>{object?.rosreestrData?.objArea}</span></p>
                <p className="text object__text">Этаж: <span>{object?.rosreestrData?.objFloor}</span></p>
                <p className="text object__text">Назначение: <span>{object?.rosreestrData?.objPurpose}</span></p>
                <p className="text object__text">Кадастровая стоимость: <span>{object?.rosreestrData?.cadPrice}&#8381;</span></p>
                <p className="text object__text">Кадастроый номер: <span>{object?.rosreestrData?.cadNumber}</span></p>
                <p className="text object__text">Дата обновдения: <span>{object?.rosreestrData?.updated && moment(object?.rosreestrData?.updated).locale('ru').format('DD MMMM YYYY')}</span></p>
              </div>
            </div>
            <div className="object__buttons">
              <Button
                variant="outlined"
                sx={{
                  alignSelf: 'flex-end'
                }}
                onClick={() => console.log('order')}
                size='small'
              >
                заказать егрн
              </Button>
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
            </div>
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