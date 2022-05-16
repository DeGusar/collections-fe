import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { AppContext } from '../../../app/context/AppContext';
import { registrateUser } from '../../../shared/api/authApi';
import { FormattedMessage, useIntl } from 'react-intl';
import { saveUserToLocalStorage } from '../../../shared/localStorageService/localStorageService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { regulars } from '../../../shared/constants/regularExpressions';
import { SignUpDataType } from '../../../types';

export default function SignUp(props: {
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpDataType>();
  const intl = useIntl();
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [isOpen, handleClose] = useState(false);

  const onSubmit = async ({ email, password, lastName, firstName }: SignUpDataType) => {
    try {
      const response = await registrateUser({
        email,
        password,
        lastName,
        firstName,
      });
      if (response.status === 200) {
        saveUserToLocalStorage(response.data);
        dispatch({ type: 'setIsLogin', payload: true });
        dispatch({ type: 'setName', payload: `${firstName} ${lastName}` });
        navigate('/');
      }
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 409) {
        setError('email', {
          type: 'custom',
          message: intl.formatMessage({ id: 'signup-email-already-exist' }),
        });
      }
      if (status === 400) {
        handleClose(true);
      }
    }
  };
  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h3">
              <FormattedMessage id="signup-title" />
            </Typography>
            <Typography variant="body1">
              <FormattedMessage id="signup-content" />
            </Typography>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  fullWidth
                  id="firstName"
                  error={errors?.firstName ? true : false}
                  helperText={errors?.firstName?.message}
                  label={<FormattedMessage id="signup-firstname" />}
                  {...register('firstName', {
                    required: intl.formatMessage({ id: 'sighup-firstname-required' }),
                    pattern: {
                      value: regulars.NAME,
                      message: intl.formatMessage({ id: 'signup-wrong-name' }),
                    },
                  })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  error={errors?.lastName ? true : false}
                  helperText={errors?.lastName?.message}
                  id="lastName"
                  label={<FormattedMessage id="signup-lastname" />}
                  {...register('lastName', {
                    required: intl.formatMessage({ id: 'sighup-lastname-required' }),
                    pattern: {
                      value: regulars.NAME,
                      message: intl.formatMessage({ id: 'signup-wrong-name' }),
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={errors?.email ? true : false}
                  helperText={errors?.email?.message}
                  label={<FormattedMessage id="signup-email" />}
                  {...register('email', {
                    required: intl.formatMessage({ id: 'signup-email-required' }),
                    pattern: {
                      value: regulars.EMAIL,
                      message: intl.formatMessage({ id: 'signup-wrong-email' }),
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={errors?.password ? true : false}
                  helperText={errors?.password?.message}
                  label={<FormattedMessage id="signup-password" />}
                  {...register('password', {
                    required: intl.formatMessage({ id: 'signup-password-required' }),
                    minLength: {
                      value: 8,
                      message: intl.formatMessage({ id: 'signup-password-min-length' }),
                    },
                  })}
                  type="password"
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              <FormattedMessage id="signup-signup" />
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={props.handleClickLink}>
                  <FormattedMessage id="signup-link" />
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        autoHideDuration={3000}
        open={isOpen}
        onClose={() => handleClose(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Error,please try one more time</Alert>
      </Snackbar>
    </>
  );
}
