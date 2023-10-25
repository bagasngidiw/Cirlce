import { Card, CardBody, Button, Flex, Avatar, Text, FormControl, Input, Box } from '@chakra-ui/react'
import { ThreadCard } from '../thread/ThreadCard';
import { useHooks } from '../../hooks/useHooks';
import { RootState } from '../../stores/types/rootState';
import { useSelector } from 'react-redux';
// import { AttachmentIcon } from '@chakra-ui/icons';
// import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useRef } from 'react';


export function Homebar() {

    const { threads, previewImage, dataContent, fileInputRef, handleContentChange, handleImageChange, handleClosePreview, fetchCreatePost } = useHooks();
    const user = useSelector((state: RootState) => state.auth)
    const homebarRef = useRef<HTMLDivElement | null>(null);
    return (
        <>
            <Card ref={homebarRef}  fontFamily={'Montserrat'} marginTop={'10px'} m={'3'} >
                <CardBody>
                    <Text fontWeight={'bold'} fontSize={'2xl'} >Home</Text>
                    <Flex marginTop={'20px'}>
                        <Avatar size={'md'} src={user.picture} />
                        <form onSubmit={fetchCreatePost}>
                            <FormControl >
                                <Flex justifyContent={'flex-end'} >
                                    <Input name='content' value={dataContent} onChange={handleContentChange} border={'none'} resize={'none'} borderRadius={'10px'} marginLeft={'10px'} placeholder='What is Happening!?' />

                                    <label htmlFor="imageInput" className="file-input-label">
                                        <i className='fa-solid fa-image'></i>
                                    </label>
                                    <Input id="imageInput" name='image' ref={fileInputRef} accept='image/*' onChange={handleImageChange} type='file' border={'none'} resize={'none'} borderRadius={'10px'} marginLeft={'10px'} placeholder='Image!?' style={{ display: 'none' }} />
                                </Flex>

                                <Flex justifyContent={'flex-end'}>
                                    <Button marginLeft={'25px'} type='submit'>Post</Button>
                                </Flex>
                                <Box mt={'50px'} mr={'50px'}>
                                    {previewImage &&
                                        <Flex justifyContent={'flex-end'} mb={'20px'}>
                                            <img src={previewImage} alt="Preview" />
                                            <CloseIcon onClick={handleClosePreview} cursor={'pointer'} />
                                        </Flex>}
                                </Box>
                            </FormControl>
                        </form>

                    </Flex>
                    {threads?.map((item, index) => {
                        return (
                            <ThreadCard key={index} id={item.id} content={item.content} image={item.image} user={item.user} posted_at={item.posted_at} likes_count={item.likes_count} is_liked={item.is_liked} replies_count={item.replies_count} />
                        )
                    })}
                </CardBody>
            </Card>
        </>
    )
}
