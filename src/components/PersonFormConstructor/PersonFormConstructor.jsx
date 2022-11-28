import React from "react";
import { PersonToggleQuestion } from "components/PersonToggleQuestion";
import { PersonForm } from "../PersonForm/PersonForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { usePersonNextPath, usePersonNextName, usePersonName } from "hooks/personHooks";

export const PersonFormConstructor = () => {
  const person = useSelector((state) => state.person.get('person'));
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    //записать в объект (создать диспатч)
    navigate(usePersonNextPath(location.state), { state: usePersonNextName(location.state) })
  }

  const inVisibleButton = () => {
    if (location.state === 'private'){
      return !person.isPrivateClient
    }
    if (location.state === 'сapable'){
      return !person.isСapable
    }
    return person.hasOwnProperty(usePersonName(location.state))
  }

  const isShowForm = () => {
    if (location.state === 'private'){
      return person.hasOwnProperty('isPrivateClient') && !person.isPrivateClient
    }
    if (location.state === 'guardian'){
      return person.hasOwnProperty('isGuardian')
    }
    if (location.state === 'proxy'){
      return person.hasOwnProperty('byProxy')
    }
    if (location.state === 'сapable'){
      return person.hasOwnProperty('isСapable') && !person.isСapable
    }
  }

  return (
    <>
      <PersonToggleQuestion
        buttonInVisible={inVisibleButton()}
      />
      {
        isShowForm() && 
        <PersonForm
          onSubmit={onSubmit}
        />
      }
    </>
  )
}