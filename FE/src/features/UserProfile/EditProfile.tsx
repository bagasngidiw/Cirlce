import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Text, Input, Button, HStack, IconButton, Flex} from '@chakra-ui/react'
import {
    FormControl,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEditProfile } from '../../hooks/useEdit'


export function EditUserProfile(){


    const {previewImage, fileInputRef, handleNameChange, handleClosePreview, handleDescriptionChange, handleUsernameChange, handleProfilePictureChange, fetchUpdateUser} = useEditProfile()

    return(
    
        <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box m={'auto'} width={'600px'}>
                {/* <Button onClick={handleOnClick}>Pencat untuk Nerima datanya ya bang</Button> */}
                <HStack>
                    <Link to={"/"}>
                        <IconButton  aria-label='Search database'  icon={<ArrowBackIcon/>}/>
                    </Link>
                    <Text fontWeight={'bold'} m={2} fontSize={'2xl'}>Back</Text>
                </HStack>
                <Box mb={4}>
                    <Text color={'green'} fontWeight={'bold'} fontSize={'30'}>Edit Profile</Text>
                </Box>
                <form onSubmit={fetchUpdateUser}>
                    <FormControl>
                        <Input onChange={handleNameChange} name='full_name' mb={4} placeholder={'Name'} _placeholder={{ opacity: 1, color: 'gray.500' }} type={'text'} borderColor={'gray'} color={'white'}/>

                        <Input onChange={handleUsernameChange} name='username' mb={4} placeholder={'Username'} _placeholder={{ opacity: 1, color: 'gray.500' }} type={'text'} borderColor={'gray'} color={'white'} />
                        
                        <Input onChange={handleDescriptionChange} name='description' mb={4} placeholder={'Description'} _placeholder={{ opacity: 1, color: 'gray.500' }} type={'text'} borderColor={'gray'} color={'white'} />
                        
                        <Input onChange={handleProfilePictureChange} name='picture' mb={4} _placeholder={{ opacity: 1, color: 'gray.500' }} type={'file'} borderColor={'gray'} color={'white'} ref={fileInputRef} />
                        
                        <Box mt={'50px'} mr={'50px'}>
                                { previewImage &&  
                                <Flex justifyContent={'flex-end'} mb={'20px'}>
                                    <img src={previewImage} alt="Preview" />
                                    <CloseIcon onClick={handleClosePreview} cursor={'pointer'}/>
                                </Flex> }
                            </Box>
                        <Box justifyContent={'center'}>
                            <Button type='submit' borderRadius={'20px'} width={'100%'} bg={'green'} color={'white'} _hover={{ bg:   'green.700' }}>
                                Update
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            </Box>
        </Box>
        
        
    )
}