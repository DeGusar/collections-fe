import { Box, Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { dateFormats } from '../../../shared/constants/dataFormats';
import { ItemsResultProps } from '../../../types';
import { useStyles } from './styles';
import date from 'date-and-time';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/constants/routes';

export const ItemsResult = ({ items }: ItemsResultProps) => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const navigate = useNavigate();
  return (
    <Box>
      {items.map((item) => {
        return (
          <>
            <Divider />
            <Box
              className={classes.collectionContainer}
              onClick={() => {
                navigate(
                  `${`${routes.COLLECTIONS_ROOT}/${item.userId}/${item.idCollection}/item/${item._id}`}`
                );
              }}
            >
              <Box className={classes.contentWrapper}>
                <Box className={classes.headerContent}>
                  <span className={classes.headerTypeSearch}>item</span>
                  <Typography>{item.nameItem}</Typography>
                </Box>
                <Box className={classes.footerContent}>
                  <Typography>
                    {date.format(new Date(item.createdAt as Date), `${dateFormats.TIME}`)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        );
      })}
    </Box>
  );
};
