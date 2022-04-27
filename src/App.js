import React,{useEffect, useState} from 'react'

import { CssBaseline, Grid } from '@mui/material'

import  getPlacesData  from './api';



import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App = () => {

  const [places, setPlaces] = useState([])

  const [coordinates, setCoordinates] = useState()
  const [bounds, setBounds] = useState(null)

  // Current location of user - only at the start of site
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})

    })
    
  }, [])
  



  // Location of edges when map is zoomed or moved
  useEffect(() => {

    getPlacesData(bounds.sw,bounds.ne)
      .then((data) => {
        console.log(data)
        setPlaces(data)
      })
    
  }, [coordinates,bounds])
  

  return (
    <>
    <CssBaseline/>
    <Header/>
    <Grid container spacing={2} style={{width:'100%'}}>
      <Grid item xs={12} md={4}>
          <List/>
      </Grid>
      <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
      </Grid>

    </Grid
    >

    


    </>
  )
}

export default App