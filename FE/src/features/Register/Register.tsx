import { Box, Text, Input, Button, Flex } from '@chakra-ui/react'
import {
    FormControl,
    FormHelperText,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/authHooks'




export function Register() {

    const { handleChange, handleRegister } = useRegister()

    return (
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box m={'auto'} width={'600px'}>
                <Box mb={4}>
                    <Text color={'green'} fontWeight={'bold'} fontSize={40}>circle</Text>
                    <Text color={'white'} fontWeight={'bold'} fontSize={'30'}>Create account Circle</Text>
                </Box>
                <FormControl isRequired>
                    <Input name='full_name' mb={4} placeholder='Your Full Name' _placeholder={{ opacity: 1, color: 'gray.500' }} borderColor={'gray'} color={'white'} onChange={handleChange} />
                    <Input name='username' mb={4} placeholder='Your username' _placeholder={{ opacity: 1, color: 'gray.500' }} borderColor={'gray'} color={'white'} onChange={handleChange} />
                    <Input name='email' mb={4} placeholder='Your Email' _placeholder={{ opacity: 1, color: 'gray.500' }} type={'email'} borderColor={'gray'} color={'white'} onChange={handleChange} />
                    <Input name='password' mb={4} placeholder='Your Password' _placeholder={{ opacity: 1, color: 'gray.500' }} type={'password'} borderColor={'gray'} color={'white'} onChange={handleChange} />
                    <Box justifyContent={'center'}>
                        <Button onClick={handleRegister} borderRadius={'20px'} width={'100%'} bg={'green'} color={'white'} _hover={{ bg: 'green.700' }}>
                            Create
                        </Button>
                        <Flex gap={2} mb={5}>
                            <FormHelperText color={'white'}>Already Have an Account?</FormHelperText>
                            <Link to={'/login'}>
                                <FormHelperText color={'green'} cursor={'pointer'} _hover={{ textDecoration: 'underline' }}>Login</FormHelperText>
                            </Link>
                        </Flex>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}