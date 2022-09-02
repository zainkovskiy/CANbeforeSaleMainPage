import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogContent,
  DialogTitle
} from "@mui/material";

import { setCalculation } from 'actions/mainActions';

import './ModalType.scss';

export const ModalType = ({ onClose, calculation }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, watch, getValues, formState: { isDirty, errors } } = useForm();
  const [allCash, setAllCash] = useState(0);

  const onSubmit = (formData) => {
    isDirty && dispatch(setCalculation(formData));
    onClose();
  }

  const isCash = watch('cash');
  const isMortgage = watch('mortgage');
  const isMsk = watch('msk');
  const isGzhs = watch('gzhs');
  const isPrepayment = watch('prepayment');

  useEffect(() => {
    getAllCount();
  }, [])

  const getAllCount = () => {
    const cash = getValues('cash') ? getValues('cashCount') || calculation?.cashCount : 0;
    const mortgage = getValues('mortgage') ? getValues('mortgageCount') || calculation?.mortgageCount : 0;
    const mortgageFirst = getValues('mortgage') ? getValues('mortgageFirst') || calculation?.mortgageFirst : 0;
    const msk = getValues('msk') ? getValues('mskCount') || calculation?.mskCount : 0;
    const gzhs = getValues('gzhs') ? getValues('gzhsCount') || calculation?.gzhsCount : 0;
    const allSum = (+cash || 0) + (+mortgage || 0) + (+mortgageFirst || 0) + (+msk || 0) + (+gzhs || 0);
    setAllCash(allSum);
  }

  return (
    <>
      <DialogTitle>
        Форма расчета
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='type-form'>
          <div className="type-form__block">
            <Controller
              name="cash"
              control={control}
              defaultValue={calculation?.cash || false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={field.value}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      getAllCount();
                    }}
                  />}
                  label="Наличные" />
              )}
            />
            <Controller
              name="cashCount"
              control={control}
              defaultValue={calculation?.cashCount || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Сумма'
                  size="small"
                  disabled={!isCash}
                  autoComplete='off'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    getAllCount();
                  }}
                  value={field.value}
                  error={errors?.cashCount ? true : false}
                  helperText={errors?.cashCount?.message ? errors?.cashCount?.message : ''}
                />
              )}
            />
          </div>
          <div className="type-form__block">
            <Controller
              name="mortgage"
              control={control}
              defaultValue={calculation?.mortgage || false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={field.value}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      getAllCount();
                    }}
                  />}
                  label="Ипотека" />
              )}
            />
            <Controller
              name="mortgageCount"
              control={control}
              defaultValue={calculation?.mortgageCount || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Сумма'
                  size="small"
                  disabled={!isMortgage}
                  autoComplete='off'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    getAllCount();
                  }}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="mortgageBank"
              control={control}
              defaultValue={calculation?.mortgageBank || ''}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label='Банк'
                  size="small"
                  disabled={!isMortgage}
                  autoComplete='off'
                  {...field}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="mortgageFirst"
              control={control}
              defaultValue={calculation?.mortgageFirst || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Первоначальный взнос'
                  size="small"
                  disabled={!isMortgage}
                  autoComplete='off'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    getAllCount();
                  }}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="type-form__block">
            <Controller
              name="msk"
              control={control}
              defaultValue={calculation?.msk || false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={field.value}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      getAllCount();
                    }}
                  />}
                  label="МСК" />
              )}
            />
            <Controller
              name="mskCount"
              control={control}
              defaultValue={calculation?.mskCount || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Сумма'
                  size="small"
                  disabled={!isMsk}
                  autoComplete='off'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    getAllCount();
                  }}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="type-form__block">
            <Controller
              name="gzhs"
              control={control}
              defaultValue={calculation?.gzhs || false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={field.value}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      getAllCount();
                    }}
                  />}
                  label="ГЖС" />
              )}
            />
            <Controller
              name="gzhsCount"
              control={control}
              defaultValue={calculation?.gzhsCount || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Сумма'
                  size="small"
                  disabled={!isGzhs}
                  autoComplete='off'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    getAllCount();
                  }}
                  value={field.value}
                />
              )}
            />
          </div>
          <div className="type-form__block">
            <Controller
              name="prepayment"
              control={control}
              defaultValue={calculation?.prepayment || false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox
                    checked={field.value}
                    {...field}
                  />}
                  label="Задаток" />
              )}
            />
            <Controller
              name="prepaymentCount"
              control={control}
              defaultValue={calculation?.prepaymentCount || ''}
              render={({ field }) => (
                <TextField
                  type='number'
                  variant="outlined"
                  label='Сумма'
                  size="small"
                  disabled={!isPrepayment}
                  autoComplete='off'
                  {...field}
                  value={field.value}
                />
              )}
            />
          </div>
          <p className="text count">Итого: <span>{allCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</span></p>
          <div className="type-form__buttons">
            <Button
              size="small"
              variant="contained"
              type='submit'
            >
              Сохранить
            </Button>
            <Button
              size="small"
              variant="text"
              color="error"
              onClick={onClose}
            >
              Отменить
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}