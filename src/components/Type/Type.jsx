import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import { ModalWindow } from 'components/ModalWindow';
import { ModalType } from 'components/ModalType';

import './Type.scss';

export const Type = () => {
  const calculation = useSelector((state) => state.main.getIn(['data', 'calculation']));
  const [open, setOpen] = useState(false);
  const [allCash, setAllCash] = useState(0);

  const handleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    getAllCount();
  }, [calculation])

  const getAllCount = () => {
    const cash = calculation?.cash ? calculation?.cashCount : 0;
    const mortgage = calculation?.mortgage ? calculation?.mortgageCount : 0;
    const mortgageFirst = calculation?.mortgage ? calculation?.mortgageFirst : 0;
    const msk = calculation?.mks ? calculation?.mskCount : 0;
    const gzhs = calculation?.gzhs ? calculation?.gzhsCount : 0;
    const allSum = (+cash || 0) + (+mortgage || 0) + (+mortgageFirst || 0) + (+msk || 0) + (+gzhs || 0);
    setAllCash(allSum);
  }

  return (
    <>
      <div className='subtitle text'>Форма расчета</div>
      <div
        className="type"
      >
        {
          calculation ?
            <div className="type__info">
              {
                calculation.cash &&
                <p className="text type__text">
                  Наличные
                  {
                    calculation.cashCount &&
                    <span>Сумма: {calculation.cashCount}</span>
                  }
                </p>
              }
              {
                calculation.mortgage &&
                <p className="text type__text">
                  Ипотека
                  {
                    calculation.mortgageCount &&
                    <span>Сумма: {calculation.mortgageCount}</span>
                  }
                  {
                    calculation.mortgageBank &&
                    <span>Банк: {calculation.mortgageBank}</span>
                  }
                  {
                    calculation.mortgageFirst &&
                    <span>Первоначальный взнос: {calculation.mortgageFirst}</span>
                  }
                </p>
              }
              <span className="text">
                МСК: {
                  calculation.msk ?
                    'да' :
                    'нет'
                }
              </span>
              <span className="text">
                ГЖС: {
                  calculation.gzhs ?
                    'да' :
                    'нет'
                }
              </span>
            </div> :
            <span className="text">Расчет и его форма не указано</span>
        }
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpen}
          sx={{
            alignSelf: 'flex-end'
          }}
        >
          Изменить
        </Button>
        <p className="text count">Итого: <span>{allCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</span></p>
        <ModalWindow
          open={open}
          onClose={handleOpen}
          maxWidth='sm'
        >
          <ModalType
            onClose={handleOpen}
            calculation={calculation}
          />
        </ModalWindow>
      </div>
    </>
  )
}