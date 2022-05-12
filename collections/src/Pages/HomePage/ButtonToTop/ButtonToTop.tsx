import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';

export const ButtonToTop = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > document.documentElement.clientHeight);
  };

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
  }, []);
  return (
    <div
      className={showGoTop ? `${classes.backToTop} ${classes.backToTopShow}` : classes.backToTop}
      onClick={handleScrollUp}
    >
      <span className={classes.arrowTop}></span>
    </div>
  );
};
