import "./sideBarLeft.css"
import { Box, Text, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/authHooks"
import { useRef } from "react"

const SideBar = () => {

    const { handleLogout } = useLogin()
    const homebarRef = useRef<HTMLDivElement | null>(null);

    const handleCreatePostClick = () => {
        if (homebarRef.current) {
            homebarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (

        <Box fontFamily={'Montserrat'} height={'100%'} color={'white'} position='fixed' zIndex={1} top='0'>
            <Box>
                <Text marginTop={'25px'} marginLeft={'25px'} marginBottom={'25px'} fontWeight={'bold'} color={'green'} fontSize={'40px'}>circle</Text>
                <UnorderedList listStyleType={'none'} fontFamily={'Montserrat'}>
                    <Link to={'/'}>
                        <ListItem as={'span'} cursor={'pointer'}><i id="item" className="fa-solid fa-house"></i>Home</ListItem>
                    </Link>
                    <ListItem><i id="item" className="fa-solid fa-magnifying-glass"></i>Search</ListItem>
                    <Link to={'/follow'}>
                        <ListItem><i id="item" className="fa-regular fa-heart"></i>Follow</ListItem>
                    </Link>
                    <Link to={'/profile'}>
                        <ListItem><i id="item" className="fa-regular fa-user"></i>Profile</ListItem>
                    </Link>
                </UnorderedList>
                <Box marginLeft={'15px'} justifyContent={'center'}>
                    <Button onClick={handleCreatePostClick} marginBottom={'15px'} borderRadius={'20px'} w={'150%'} bg={'green'} color={'white'} _hover={{ bg: 'green.700' }}>
                        Create Post
                    </Button>
                </Box>
                <UnorderedList listStyleType={'none'} marginBottom={'15px'}>
                    <ListItem cursor={'pointer'} onClick={handleLogout} position={'absolute'} bottom={0}><i id="item" className="fa-solid fa-right-from-bracket fa-rotate-180 fa-sm"></i>Logout</ListItem>
                </UnorderedList>
            </Box>
        </Box>

    )

}


export default SideBar