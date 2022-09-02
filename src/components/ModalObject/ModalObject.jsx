import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Box,
  List,
  ListItemButton,
} from "@mui/material";

import { setObject } from 'actions/mainActions';

import './ModalObject.scss';

export const ModalObject = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [objectList, setObjectList] = useState([]);
  const [selectIndex, setSelectIndex] = useState('');
  const [selectObject, setSelectObject] = useState('');

  useEffect(() => {
    getList();
  }, [])

  const getList = async () => {
    try {
      const res = await axios.get("https://catfact.ninja/fact");
      if (res.status === 200) {
        setObjectList([
          {
            reqTypeofRealty: 'Дом',
            fullAddress: 'Novosib',
            reqPrice: 3000000,
            reqNumber: 56059000179
          },
          {
            reqTypeofRealty: 'Дом',
            fullAddress: 'Novosib',
            reqPrice: 2000000,
            reqNumber: 56059000180
          },
          {
            reqTypeofRealty: 'Дом',
            fullAddress: 'Novosib',
            reqPrice: 10000000,
            reqNumber: 56059000181
          },
        ])
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleClick = (idx, item) => {
    setSelectIndex(idx);
    setSelectObject(item);
  }

  const handleAgree = () => {
    if (!selectObject) {
      return
    }
    dispatch(setObject(selectObject));
    onClose();
  }

  return (
    <>
      <DialogTitle>
        Объект
      </DialogTitle>
      {
        loading ?
          <Box
            sx={{
              display: 'flex',
              height: '50vh',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box> :
          <>
            <DialogContent>
              <List>
                {
                  objectList.map((item, idx) =>
                    <ListItemButton
                      key={item.reqNumber}
                      selected={selectIndex === idx}
                      onClick={() => handleClick(idx, item)}
                    >
                      <div className="object-item">
                        <p className="text object__text">{item.reqTypeofRealty}<span>{item.fullAddress}</span></p>
                        <span className="text object__text-price">{item.reqPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}&#8381;</span>
                      </div>
                    </ListItemButton>
                  )
                }
              </List>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'flex-start'
              }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleAgree}
              >
                Выбрать
              </Button>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={onClose}
              >
                Отменить
              </Button>
            </DialogActions>
          </>
      }
    </>
  )
}
{/* <Controller
name="cash"
control={control}
defaultValue={calculation?.cash || false}
render={({ field }) => (
  <FormControlLabel
    control={<Checkbox
      checked={field.value}
      {...field}
    />}
    label="Наличные" />
)}
/> */}