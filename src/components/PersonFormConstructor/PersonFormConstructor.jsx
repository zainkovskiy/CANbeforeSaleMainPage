import React, { useEffect } from "react";
import { PersonToggleQuestion } from "components/PersonToggleQuestion";
import { PersonForm } from "../PersonForm/PersonForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { usePersonNextPath, usePersonNextName, usePersonName } from "hooks/personHooks";
import { setValuePerson, setValuePersonFinal, clearPerson } from "actions/person";
import { setPerson } from "actions/mainActions";

export const PersonFormConstructor = () => {
  const navigate = useNavigate();
  const person = useSelector((state) => state.person.get('person'));
  const location = useLocation();
  const dispatch = useDispatch();
  const nextName = usePersonNextName(location.state, person[usePersonName(location.state)]);

  useEffect(() => {
    if (nextName === 'final' && person?.final) {
      setFinalValue();
    }
  }, [person])

  const onSubmit = (data) => {
    if (nextName === 'final') {
      dispatch(setValuePersonFinal({ ...data, final: true }));
      return
    }
    dispatch(setValuePerson({
      name: `${usePersonName(location.state)}Value`,
      data: data
    }))
    navigate(usePersonNextPath(location.state), { state: nextName })
  }
  const setFinalValue = () => {
    navigate(usePersonNextPath(location.state), { state: nextName })
    dispatch(setPerson(person));
    dispatch(clearPerson());
  }

  const toggleButtonShow = () => {
    if (location.state === 'private') {
      return person.isPrivateClient
    }
    if (location.state === 'guardian') {
      return false
    }
    if (location.state === 'сapable') {
      return person.isСapable
    }
    if (location.state === 'proxy') {
      return false
    }
    return person.hasOwnProperty(usePersonName(location.state))
  }

  const isShowForm = () => {
    if (location.state === 'private') {
      return person.hasOwnProperty('isPrivateClient') && !person.isPrivateClient
    }
    if (location.state === 'guardian') {
      return person.hasOwnProperty('isGuardian')
    }
    if (location.state === 'proxy') {
      return person.hasOwnProperty('byProxy')
    }
    if (location.state === 'сapable') {
      return person.hasOwnProperty('isСapable') && !person.isСapable
    }
    return false
  }

  return (
    <>
      <PersonToggleQuestion
        toggleButtonShow={toggleButtonShow()}
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