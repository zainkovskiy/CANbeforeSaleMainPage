import React from "react";

export const usePersonName = (name) => {
  const keyName = {
    private: 'isPrivateClient',
    adult: 'isAdult',
    сapable: 'isСapable',
    proxy: 'byProxy',
    guardian: 'isGuardian'
  }
  return keyName[name]
}


export const usePersonQuestion = (name) => {
  const personQuestion = {
    private: 'Физическое или юридическое лицо?',
    adult: 'Совершеннолетний?',
    сapable: 'Дееспособный?',
    proxy: 'Сам или по доверенности участвует в сделке?',
    guardian: 'Представляет опекун или родитель?',
  }
  return personQuestion[name]
}

export const usePersonFirstAnswer = (name) => {
  const personFirstAnswer = {
    private: 'Физическое лицо',
    adult: 'Да',
    сapable: 'Да',
    proxy: 'По доверенности',
    guardian: 'Родитель',
  }
  return personFirstAnswer[name]
}


export const usePersonSecondAnswer = (name) => {
  const personSecondAnswer = {
    private: 'Юридическое лицо',
    adult: 'Нет',
    сapable: 'Нет',
    proxy: 'Сам',
    guardian: 'Опекун',
  }
  return personSecondAnswer[name]
}


export const usePersonNextPath = (name, answer) => {
  const nextPath = {
    private: answer ? 'adult' : '/',
    adult: answer ? '/person/сapable' : '/person/guardian',
    сapable: '/person/proxy',
    proxy: '/',
    guardian: '/person/proxy',
  }
  return nextPath[name]
}

export const usePersonNextName = (name, answer) => {
  const nextPath = {
    private: answer ? 'adult' : 'final',
    adult: answer ? 'сapable' : 'guardian',
    сapable: 'proxy',
    proxy: 'final',
    guardian: 'proxy',
  }
  return nextPath[name]
}