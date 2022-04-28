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
import { FormattedMessage } from 'react-intl';
import { saveUserToLocalStorage } from '../../../shared/localStorageService/localStorageService';
import { AppContext } from '../../../app/context/AppContext';

export default function SignIn(props: {
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [isPasswordError, setPasswordError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [textPasswordError, setTextPasswordError] = useState('');
  const [textEmailError, setTextEmailError] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));
    const password = String(data.get('password'));
    try {
      const response = await login({
        email: email,
        password: password,
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
      if (status === 401) {
        setEmailError(true);
        setTextEmailError('Wrong email or password');
      }
      if (status === 402) {
        setPasswordError(true);
        setTextPasswordError('Wrong password');
      }
      if (status === 403) {
        /*  this.setState({
          snackBlocked: true,
        }); */
        return;
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h3">
            <FormattedMessage id="signin-title" />
          </Typography>
          <Typography variant="body1">
            <FormattedMessage id="signin-content" />
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            error={isEmailError}
            helperText={textEmailError}
            label={<FormattedMessage id="signup-email" />}
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={() => {
              setEmailError(false);
              setTextEmailError('');
            }}
            onChange={() => {
              setEmailError(false);
              setTextEmailError('');
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={<FormattedMessage id="signup-password" />}
            error={isPasswordError}
            helperText={textPasswordError}
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={() => {
              setPasswordError(false);
              setTextPasswordError('');
            }}
            onChange={() => {
              setPasswordError(false);
              setTextPasswordError('');
            }}
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
    </Container>
  );
}
