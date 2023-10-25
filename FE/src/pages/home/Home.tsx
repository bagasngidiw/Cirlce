
import { Grid, GridItem } from '@chakra-ui/react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import data from "../../utils/fakeData.json";
import SideBar from "../../features/SideBar/SideBarLeft";
import { RightBar } from "../../features/RightBar/RightBar";
import { SuggestionBar } from "../../features/RightBar/RightBar";
import { DevelopedByYourName } from "../../features/RightBar/RightBar";
import { Homebar } from "../../features/HomeBar/HomeBar";
import { useState, useEffect } from 'react';
import { API } from '../../lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/types/rootState';
// import { ThreadCardDetail } from '../../features/thread/ThreadCardDetail';
// import { DetailThread } from '../../features/thread/ThreadCardDetail';





function Home() {

  return (

    <>
      {/* // <Box bg={'blackAlpha.800'}> */}
      <Grid templateColumns='repeat(6, 1fr)' bg={'blackAlpha.800'}>
        <GridItem colSpan={1}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={3}>
          <Homebar />
        </GridItem>
        <GridItem colSpan={2}>
          <RightBar />
          <SuggestionBar />
          <DevelopedByYourName />
        </GridItem>

      </Grid>
      {/* // </Box> */}



    </>

  )
}



export default Home