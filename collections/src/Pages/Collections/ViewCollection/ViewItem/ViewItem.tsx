import React from 'react';
import { useParams } from 'react-router-dom';

export const ViewItem = () => {
  const { idItem } = useParams();
  return <div>{idItem}</div>;
};
