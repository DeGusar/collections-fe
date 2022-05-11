import { Box } from '@mui/material';
import React, { useContext } from 'react';
import Swiper from 'react-id-swiper';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';

export const SwiperImages = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const params = {
    slidesPerView: 1,
    loop: true,
    mousewheel: true,
    pagination: {
      clickable: true,
    },
  };
  return (
    <Swiper {...params} wrapperClass={classes.swiper} containerClass={classes.container}>
      <img src="https://res.cloudinary.com/rss-collection/image/upload/v1652273255/julius-drost-oC66vXsqnc8-unsplash_1_wmb6vn.jpg"></img>
      <img src="https://res.cloudinary.com/rss-collection/image/upload/v1652273314/ning-shi-UQfScif_1T0-unsplash_dkow8p.jpg"></img>
      <img src="https://res.cloudinary.com/rss-collection/image/upload/v1652273372/surya-urs-YDf2T-Uyq7U-unsplash_1_t17lyi.jpg"></img>
      <img src="https://res.cloudinary.com/rss-collection/image/upload/v1652273574/peter-herrmann-aT88kga0g_M-unsplash_qufirk.jpg"></img>
      <img src="https://res.cloudinary.com/rss-collection/image/upload/v1652273624/brigitta-schneiter-MHGDVDWjAb4-unsplash_igipy2.jpg"></img>
    </Swiper>
  );
};
