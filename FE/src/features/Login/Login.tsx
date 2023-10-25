import { Box, Text, Input, Button, Flex} from '@chakra-ui/react'
import {
    FormControl,
    FormHelperText,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/authHooks'



  
export function Login(){


    const {handleChange, handleLogin} = useLogin()

    // const user = useSelector((state : RootState) => state.auth)

    // const handleOnClick = () => {
    //     console.log('Clicked user:', user);
    //   };
    

    return(
    
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box m={'auto'} width={'600px'}>
                {/* <Button onClick={handleOnClick}>Pencat untuk Nerima datanya ya bang</Button> */}
                <Box mb={4}>
                    <Text color={'green'} fontWeight={'bold'} fontSize={40}>circle</Text>
                    <Text color={'white'} fontWeight={'bold'} fontSize={'30'}>Login to Circle</Text>
                </Box>
                <FormControl>
                    <Input onChange={handleChange} name='email' mb={4} isRequired placeholder='Email'_placeholder={{ opacity: 1, color: 'gray.500' }} type={'email'} borderColor={'gray'} color={'white'}/>
                    <Input onChange={handleChange} name='password' mb={4} isRequired placeholder='Your Password'_placeholder={{ opacity: 1, color: 'gray.500' }} type={'password'} borderColor={'gray'} color={'white'} />
                    <Box justifyContent={'center'}>
                        <Flex mb={4} justifyContent={'flex-end'}>
                            <FormHelperText color={'white'} cursor={'pointer'} _hover={{textDecoration: 'underline' }}>Forgot Password?</FormHelperText>
                        </Flex>
                            <Button onClick={handleLogin} borderRadius={'20px'} width={'100%'} bg={'green'} color={'white'} _hover={{ bg: 'green.700' }}>
                                Login
                            </Button>
                        <Flex gap={2} mb={5}>
                            <FormHelperText color={'white'}>Don't Have an Account?</FormHelperText>
                            <Link to={'/register'}>
                                <FormHelperText color={'green'} cursor={'pointer'} _hover={{textDecoration: 'underline' }}>Create Account</FormHelperText>
                            </Link>
                        </Flex>
                    </Box>
                </FormControl>
            </Box>
        </Box>
        
        
    )
}