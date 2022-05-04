/* eslint-disable react/no-children-prop */
import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
import { CardCollectionType } from '../../../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import routes from '../../../shared/constants/routes';

export const CardCollection = ({
  nameCollection,
  imageSrc,
  description,
  createdAt,
  userId,
  _id,
}: CardCollectionType) => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={nameCollection}
        subheader={createdAt}
      />
      <CardActionArea component={NavLink} to={`${routes.COLLECTIONS_ROOT}/${userId}/${_id}`}>
        <CardMedia component="img" height="auto" image={imageSrc} alt="card image" />
        <CardContent sx={{ padding: '0' }}>
          {description && (
            <Typography sx={{ padding: '10px', fontSize: '16px' }} variant="body1">
              <ReactMarkdown children={description} />
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
