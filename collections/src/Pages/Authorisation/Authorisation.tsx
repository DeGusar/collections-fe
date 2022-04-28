import { Box } from '@mui/material';
import React, { useState } from 'react';
import SignUp from './SignUp/SignUp';

export default function Authorisation() {
  const [showSignin, setShowSignin] = useState(true);
  return <Box>{showSignin && <SignUp handleClickLink={() => setShowSignin(false)} />}</Box>;
}
