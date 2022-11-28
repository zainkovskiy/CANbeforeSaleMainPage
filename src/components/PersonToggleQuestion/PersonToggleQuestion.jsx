import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToggleValue } from "actions/person";
import {
  usePersonName, usePersonQuestion,
  usePersonFirstAnswer,
  usePersonSecondAnswer,
  usePersonNextPath
} from "hooks/personHooks";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { usePersonNextName } from "../../hooks/personHooks";

export const PersonToggleQuestion = ({ toggleButtonShow }) => {
  const person = useSelector((state) => state.person.get('person'));
  const location = useLocation();
  const dispatch = useDispatch();
  const keyName = usePersonName(location.state);
  const question = usePersonQuestion(location.state);

  const handleChange = () => {
    dispatch(setToggleValue({
      name: keyName,
      value: event.target.value === 'true',
    }))
  }

  return (
    <div className="person-set">
      <span className="text">{question}</span>
      <ToggleButtonGroup
        color="primary"
        value={person?.[keyName]}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value={true}>{usePersonFirstAnswer(location.state)}</ToggleButton>
        <ToggleButton value={false}>{usePersonSecondAnswer(location.state)}</ToggleButton>
      </ToggleButtonGroup>
      {
        toggleButtonShow &&
        <Button
          size="small"
          variant="contained"
          // disabled={(person && !person.hasOwnProperty(keyName)) || person?.[keyName] === null || !person}
          sx={{ alignSelf: 'flex-end' }}
        >
          <Link
            style={{ color: '#fff', textDecoration: 'none' }}
            to={usePersonNextPath(location.state, person?.[keyName])}
            state={usePersonNextName(location.state, person?.[keyName])}
          >
            далее
          </Link>
        </Button>
      }
    </div>
  )
}