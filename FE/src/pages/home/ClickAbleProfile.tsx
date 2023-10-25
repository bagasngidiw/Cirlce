import { Grid, GridItem } from '@chakra-ui/react'
import SideBar from "../../features/SideBar/SideBarLeft";
import {RightBar, SuggestionBar, DevelopedByYourName} from "../../features/RightBar/RightBar";
import { ClickAbleUserProfile } from '../../features/UserProfile/ClickAbleProfile';




function ClickAbleProfile() {

    return (
  
      <>
      {/* // <Box bg={'blackAlpha.800'}> */}
        <Grid templateColumns='repeat(6, 1fr)' bg={'blackAlpha.800'}>
          <GridItem colSpan={1}>
            <SideBar/>
          </GridItem>
          <GridItem colSpan={3}>
              <ClickAbleUserProfile/>
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
  
  
  
  export default ClickAbleProfile