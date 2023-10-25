import { Grid, GridItem } from '@chakra-ui/react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import data from "../../utils/fakeData.json";
import SideBar from "../../features/SideBar/SideBarLeft";
import {RightBar, SuggestionBar, DevelopedByYourName} from "../../features/RightBar/RightBar";
// import { SuggestionBar } from "../../features/RightBar/RightBar";
// import { DevelopedByYourName } from "../../features/RightBar/RightBar";
// import { DetailThreadCard } from '../../features/HomeBar/ThreadCardDetail';
import { DetailThread } from '../../features/thread/ThreadCardDetail';




function ThreadCardDetail() {

    return (
  
      <>
      {/* // <Box bg={'blackAlpha.800'}> */}
        <Grid templateColumns='repeat(6, 1fr)' bg={'blackAlpha.800'}>
          <GridItem colSpan={1}>
            <SideBar/>
          </GridItem>
          <GridItem colSpan={3}>
              <DetailThread/>
          </GridItem>
          <GridItem colSpan={2}>
            <RightBar/>
            <SuggestionBar/>
            <DevelopedByYourName/>
          </GridItem>
      
        </Grid>
      {/* // </Box> */}
      
      
   
      </>
      
    )
  }
  
  
  
  export default ThreadCardDetail