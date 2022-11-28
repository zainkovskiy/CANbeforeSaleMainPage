import React from "react";

import { Type } from 'components/Type';
import { Title } from 'components/Title';
import { Participants } from 'components/Participants';
import { Object } from 'components/Object';
import { Requisites } from 'components/Requisites';

export const MainPage = () => {
  return (
    <>
      <Title title='Объект недвижимости' />
      <Object />
      <Title title='Сторона сделки' />
      <Participants />
      <Type />
      <Title title='Реквизиты договора' />
      <Requisites />
    </>
  )
}