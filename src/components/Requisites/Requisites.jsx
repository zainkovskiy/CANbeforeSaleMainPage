import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import moment, { locale } from "moment";

import { setRequisites, setRequisitesValue } from 'actions/mainActions';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './Requisites.scss';

export const Requisites = () => {
  const dispatch = useDispatch();
  const requisitesValue = useSelector((state) => state.main.getIn(['data', 'requisites']))

  const [timeFreeValue, setTimeFreeValue] = useState(requisitesValue?.timeFree ? moment(requisitesValue?.timeFree) : null);
  const [timePDKPValue, setTimePDKPValue] = useState(requisitesValue?.timePDKP ? moment(requisitesValue?.timePDKP) : null);
  const [up, setUp] = useState(requisitesValue?.up || false);
  const [down, setDown] = useState(requisitesValue?.down || false);
  const [expenses, setExpenses] = useState(requisitesValue?.expenses || '');

  const { register, setValue } = useForm();

  const handleChange = (event) => {
    dispatch(setRequisites(event))
  }
  const handleValue = (newValue) => {
    dispatch(setRequisitesValue(newValue))
  }
  const toggleUpAndDown = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      name === 'up' ? setDown(false) : setUp(false);
      setValue(name === 'up' ? 'dowmCount' : 'upCount', '');
      setValue(name === 'up' ? 'down' : 'up', false)
      const setValueCheckbox = {
        name: name === 'up' ? 'down' : 'up',
        value: false
      }
      const setValueInput = {
        name: name === 'up' ? 'dowmCount' : 'upCount',
        value: ''
      }
      handleValue(setValueCheckbox);
      handleValue(setValueInput);
    }
  }
  const setDateValue = (event, name) => {
    if (event && event.format() !== 'Invalid date') {
      handleValue({ name: name, value: event.format('YYYY-MM-DD') })
      return
    }
    if (!event) {
      handleValue({ name: name, value: null })
    }
  }
  return (
    <div className="requisites">
      <FormControlLabel
        control={<Switch
          color="primary"
          {...register('up', {
            onChange: (event) => {
              handleChange(event);
              setUp(!up);
              toggleUpAndDown(event);
            }
          })}
          checked={up}
        />}
        label="Завышение"
        labelPlacement="start"
        sx={{ margin: 0, justifySelf: 'start' }}
      />
      {
        up ?
          <TextField
            autoComplete="off"
            variant="outlined"
            size='small'
            label="Сумма"
            defaultValue={requisitesValue?.upCount || ''}
            {...register('upCount', {
              onChange: (event) => handleChange(event)
            })}
          /> :
          <div style={{ height: 40 }}></div>
      }
      <FormControlLabel
        control={<Switch color="primary"
          checked={down}
          {...register('down', {
            onChange: (event) => {
              handleChange(event);
              setDown(!down);
              toggleUpAndDown(event);
            }
          })}
        />}
        label="Занижение"
        labelPlacement="start"
        sx={{ margin: 0, justifySelf: 'start' }}
      />
      {
        down ?
          <TextField
            autoComplete="off"
            label="Сумма"
            variant="outlined"
            size='small'
            name='downCount'
            defaultValue={requisitesValue?.downCount || ''}
            {...register('upCount', {
              onChange: (event) => handleChange(event)
            })}
          /> :
          <div style={{ height: 40 }}></div>
      }
      <FormControlLabel
        control={<Switch color="primary" onChange={handleChange} name='chain' defaultChecked={requisitesValue?.chain || false} />}
        label="Сделка по цепи"
        labelPlacement="start"
        sx={{ margin: 0, justifySelf: 'start' }}
      />
      <div></div>
      <FormControlLabel
        control={<Switch color="primary" onChange={handleChange} name='terms' defaultChecked={requisitesValue?.terms || false} />}
        label="Отлагательные условия"
        labelPlacement="start"
        sx={{ margin: 0, justifySelf: 'start' }}
      />
      {
        requisitesValue?.terms ?
          <textarea
            className="requisites__area text"
            name='termsDescription'
            onChange={handleChange}
          ></textarea> :
          <div></div>
      }
      <div className="requisites__label-wrap">
        <span className="text requisites__label">
          Срок ПДКП
        </span>
      </div>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale={locale('ru')}
      >
        <DatePicker
          value={timePDKPValue}
          onChange={(event) => {
            setTimePDKPValue(event);
            setDateValue(event, 'timePDKP');
          }}
          renderInput={(params) => <TextField {...params} size='small'
            inputProps={{
              ...params.inputProps,
              placeholder: 'дд.мм.гггг'
            }}
          />}
        />
      </LocalizationProvider>
      <div className="requisites__label-wrap">
        <span className="text requisites__label">
          Срок освобождения ОН
        </span>
      </div>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale={locale('ru')}
      >
        <DatePicker
          value={timeFreeValue}
          onChange={(event) => {
            setTimeFreeValue(event);
            setDateValue(event, 'timeFreeValue');
          }}
          renderInput={(params) => <TextField {...params} size='small'
            inputProps={{
              ...params.inputProps,
              placeholder: 'дд.мм.гггг'
            }}
          />}
        />
      </LocalizationProvider>
      <div className="requisites__label-wrap">
        <span className="text requisites__label">
          Расходы, связанные с заключением Договора
        </span>
      </div>
      <FormControl fullWidth size='small'>
        <InputLabel>Расходы несет</InputLabel>
        <Select
          name="expenses"
          value={expenses}
          label="Расходы несет"
          onChange={(event) => {
            handleChange(event);
            setExpenses(event.target.value);
          }}
          size='small'
        >
          <MenuItem value={'buyer'}>Покупатель</MenuItem>
          <MenuItem value={'seller'}>Продавец</MenuItem>
          <MenuItem value={'equally'}>Поровну Покупатель и Продавец</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}