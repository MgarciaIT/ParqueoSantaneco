/****************************************************************
 * @author Manuel Garcia                                        *
 * @date 20/05/2023                                             *
 * @description Modulo de Bienvenida                            *
****************************************************************/

import React from 'react'
import "./home.scss"
import { Grid, Typography } from '@mui/material'

const Home = () => {
  return (
    <div className='home'>
      <div>
        <Typography variant='h3'>Bienvenido</Typography>
      </div>
      <div className='center'>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={8}>
            <div className='imagen'></div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Home