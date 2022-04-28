import { Box } from '@mui/material';
import React, { useState } from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

export default function Authorisation() {
  const [showSignin, setShowSignin] = useState(false);

  return (
    <Box>
      {!showSignin && <SignIn handleClickLink={() => setShowSignin(true)} />}
      {showSignin && <SignUp handleClickLink={() => setShowSignin(false)} />}
    </Box>
  );
}
