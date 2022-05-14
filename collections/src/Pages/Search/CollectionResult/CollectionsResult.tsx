import { Box, Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { dateFormats } from '../../../shared/constants/dataFormats';
import { CollectionsResultProps } from '../../../types';
import { useStyles } from './styles';
import date from 'date-and-time';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/constants/routes';

export const CollectionsResult = ({ collections }: CollectionsResultProps) => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const navigate = useNavigate();
  return (
    <Box>
      {collections.map((collection) => {
        return (
          <>
            <Divider />
            <Box
              className={classes.collectionContainer}
              onClick={() => {
                navigate(`${routes.COLLECTIONS_ROOT}/${collection.userId}/${collection._id}`);
              }}
            >
              <Box className={classes.imgWrapper}>
                <img src={collection.imageSrc}></img>
              </Box>
              <Box className={classes.contentWrapper}>
                <Box className={classes.headerContent}>
                  <span className={classes.headerTypeSearch}>collection</span>
                  <Typography>{collection.nameCollection}</Typography>
                </Box>
                <Box className={classes.description}>
                  <Typography>{collection.description}</Typography>
                </Box>
                <Box className={classes.footerContent}>
                  <Typography className={classes.author}>{collection.author} ·</Typography>
                  <Typography>
                    {date.format(new Date(collection.createdAt), `${dateFormats.TIME}`)}
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
