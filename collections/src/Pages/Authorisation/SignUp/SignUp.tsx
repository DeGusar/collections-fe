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
import { FormattedMessage } from 'react-intl';
import { saveUserToLocalStorage } from '../../../shared/localStorageService/localStorageService';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props: {
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [isErrorEmail, setEmailError] = useState(false);
  const [textError, setTextError] = useState('');
  const [isOpen, handleClose] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password'));
    const email = String(data.get('email'));
    const firtstName = String(data.get('firstName'));
    const lastName = String(data.get('lastName'));
    try {
      const response = await registrateUser({
        email: email,
        password: password,
        lastName: lastName,
        firstName: firtstName,
      });
      if (response.status === 200) {
        saveUserToLocalStorage(response.data);
        dispatch({ type: 'setIsLogin', payload: true });
        navigate('/');
      }
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 409) {
        setEmailError(true);
        setTextError('User with this email already exist');
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h3">
              <FormattedMessage id="signup-title" />
            </Typography>
            <Typography variant="body1">
              <FormattedMessage id="signup-content" />
            </Typography>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={<FormattedMessage id="signup-signup" />}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={<FormattedMessage id="signup-firstname" />}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={isErrorEmail}
                  fullWidth
                  helperText={textError}
                  id="email"
                  label={<FormattedMessage id="signup-email" />}
                  name="email"
                  autoComplete="email"
                  onBlur={() => {
                    setEmailError(false);
                    setTextError('');
                  }}
                  onChange={() => {
                    setEmailError(false);
                    setTextError('');
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={<FormattedMessage id="signup-password" />}
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
