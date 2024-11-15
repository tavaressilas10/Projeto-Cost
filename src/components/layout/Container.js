import React from 'react';
import styles from './Container.module.css';
import { Box } from '@mui/material';

function Container(props) {
  return (
    <Box className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </Box>
  );
}

export default Container;
