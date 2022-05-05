import { Typography, Breadcrumbs } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import routes from '../../../../shared/constants/routes';
import { useStyles } from './styles';
import { AppContext } from '../../../../app/context/AppContext';

export const BreadCrumps = () => {
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);
  const { userId } = useParams();
  return (
    <Breadcrumbs className={classes.breadcrumps} aria-label="breadcrumb">
      <NavLink className={classes.navLink} to="/">
        <FormattedMessage id="breadctumps-home" />
      </NavLink>
      <NavLink className={classes.navLink} to={`${routes.COLLECTIONS_ROOT}/${userId}`}>
        <FormattedMessage id="breadcrumps-collections" />
      </NavLink>
      <Typography sx={{ textDecoration: 'underline' }} color="text.primary">
        <FormattedMessage id="breadcrumps-collection" />
      </Typography>
    </Breadcrumbs>
  );
};
