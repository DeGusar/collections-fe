import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { login } from '../../../shared/api/authApi';
import { FormattedMessage, useIntl } from 'react-intl';
import { saveUserToLocalStorage } from '../../../shared/localStorageService/localStorageService';
import { AppContext } from '../../../app/context/AppContext';
import { useForm } from 'react-hook-form';
import { SignInDataType } from '../../../types';
import { Snack } from '../../AdminPanel/Snack/Snack';

export default function SignIn(props: {
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInDataType>();

  const intl = useIntl();
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const messageSnack = intl.formatMessage({ id: 'signin-blocked-user' });

  const onSubmit = async ({ email, password }: SignInDataType) => {
    try {
      const response = await login({
        email,
        password,
      });
      if (response.status === 200) {
        saveUserToLocalStorage(response.data);
        const { firstName, lastName } = response.data;
        dispatch({ type: 'setIsLogin', payload: true });
        dispatch({ type: 'setName', payload: `${firstName} ${lastName}` });
        navigate('/');
      }
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 401) {
        setError('password', {
          type: 'custom',
          message: intl.formatMessage({ id: 'signin-wrong-password' }),
        });
      }
      if (status === 402) {
        setError('password', {
          type: 'custom',
          message: intl.formatMessage({ id: 'signin-wrong-password' }),
        });
      }
      if (status === 403) {
        setIsOpenSnack(true);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Typography variant="h3">
            <FormattedMessage id="signin-title" />
          </Typography>
          <Typography variant="body1">
            <FormattedMessage id="signin-content" />
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            error={errors?.email ? true : false}
            helperText={errors?.email?.message}
            label={<FormattedMessage id="signup-email" />}
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: intl.formatMessage({ id: 'signup-email-required' }),
            })}
          />
          <TextField
            margin="normal"
            fullWidth
            label={<FormattedMessage id="signup-password" />}
            error={errors?.password ? true : false}
            helperText={errors?.password?.message}
            type="password"
            {...register('password', {
              required: intl.formatMessage({ id: 'signup-password-required' }),
            })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={<FormattedMessage id="signin-remember" />}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <FormattedMessage id="signin-signin" />
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={props.handleClickLink}>
                <FormattedMessage id="signin-link" />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snack
        isOpen={isOpenSnack}
        handleClose={() => setIsOpenSnack(false)}
        message={messageSnack}
        severityType="error"
      />
    </Container>
  );
}
