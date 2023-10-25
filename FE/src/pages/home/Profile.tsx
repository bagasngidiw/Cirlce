import { Grid, GridItem } from '@chakra-ui/react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import data from "../../utils/fakeData.json";
import SideBar from "../../features/SideBar/SideBarLeft";
import {RightBar, SuggestionBar, DevelopedByYourName} from "../../features/RightBar/RightBar";
import { UserProfile  } from '../../features/UserProfile/Profile';
// import { User } from '../../features/UserProfile/testuser';




function Profile() {

    return (
  
      <>
      {/* // <Box bg={'blackAlpha.800'}> */}
        <Grid templateColumns='repeat(6, 1fr)' bg={'blackAlpha.800'}>
          <GridItem colSpan={1}>
            <SideBar/>
          </GridItem>
          <GridItem colSpan={3}>
              <UserProfile/>
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
  
  
  
  export default Profile