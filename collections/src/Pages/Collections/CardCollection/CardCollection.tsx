import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
import { CardCollectionType } from '../../../types';

export const CardCollection = ({ nameCollection, imageSrc, description }: CardCollectionType) => {
  return (
    <Card sx={{ width: 'calc(25% - 60px/4 )' }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={imageSrc} alt="card image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nameCollection}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Optins
        </Button>
      </CardActions>
    </Card>
  );
};
