import { Card, CardHeader, CardBody, CardFooter, Button, Flex, Avatar, Box, Heading, FormControl, Text, Image, HStack, Input } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { ChatIcon, TimeIcon, ArrowBackIcon } from '@chakra-ui/icons'
// import { useHooks } from '../../hooks/useHooks';
import { Link } from 'react-router-dom';
// import { useHooks } from '../../hooks/useHooks';
import { useReply } from '../../hooks/replyHooks';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/types/rootState';
import { useLike } from '../../hooks/likeHooks';


export function DetailThread() {


    const { thread, replies, form, handleChangeReply, handlePostReply } = useReply()
    const { handleLike } = useLike()
    const user = useSelector((state: RootState) => state.auth)


    return thread ? (

        <>
            <Card m={'3'} borderRadius={'none'} mt={6} fontFamily={'Montserrat'} mb={'-3'}>
                <CardHeader>
                    <HStack mb={4}>
                        <Link to={"/"} >
                            <IconButton aria-label='Search database' icon={<ArrowBackIcon />} />
                        </Link>
                        <Text fontWeight={'bold'} m={2} fontSize={'2xl'}>Status</Text>
                    </HStack>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src={thread.user?.picture} />
                        <HStack gap={'7'} justifyContent={'center'}>
                            <Text fontSize={'md'} fontWeight={'bold'}>{thread.user?.full_name}</Text>
                            <Text ms={-5} fontSize={'sm'} color={'gray'}>@{thread.user?.username}</Text>
                        </HStack>
                    </Flex>
                </CardHeader>
                <CardBody p={1} mb={4} ml={3}>
                    <Text>
                        {thread.content}
                    </Text>
                </CardBody>
                <Image
                    objectFit={'contain'}

                    marginLeft={'15px'}
                    marginRight={'15px'}
                    borderRadius={'25px'}
                    src={thread.image}
                />
                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}>
                    <Box ms={-4}>

                        <Button flex='1' variant='ghost' leftIcon={<i className="fa-regular fa-heart"></i>} backgroundColor={thread.is_liked ? "red" : "brand.grey"}
                            onClick={() => handleLike(thread.id, thread.is_liked)} >
                            {thread.likes_count} Like
                        </Button>
                        <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                            {thread.replies_count} Replies
                        </Button>

                    </Box>
                </CardFooter>
            </Card>
            <Card fontFamily={'Montserrat'} marginTop={'10px'} m={'3'} borderRadius={'none'} mb={'-3'} borderTop={'2px solid black'} >
                <CardBody py={1}>
                    <Flex marginTop={'20px'}>
                        <Avatar size={'md'} src={user.picture} />
                        <form onSubmit={handlePostReply}>
                            <FormControl>
                                <Input name='content' value={form.content} onChange={handleChangeReply} border={'none'} resize={'none'} borderRadius={'10px'} marginLeft={'10px'} placeholder='Reply Here' />
                            </FormControl>
                            <Button type='submit' marginTop={'25px'} marginLeft={'25px'}>Post</Button>

                        </form>
                    </Flex>
                </CardBody>
            </Card>

            {replies?.map((reply, index) => {
                return (

                    <Card key={index} fontFamily={'Montserrat'} p={4} m={'3'} mb={'-3'} borderRadius={"none"} borderTop={'2px solid black'}>
                        <CardHeader p={1} >
                            <Flex>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Segun Adebayo' src={user.picture} />
                                    <Box paddingBottom={'20px'}>
                                        <HStack>
                                            <Heading fontFamily={'Montserrat'} size='sm'>{reply.user?.full_name}</Heading>
                                            <Text fontSize={'xs'} color={'gray'}><TimeIcon boxSize={2.5} />{moment(reply.posted_at).startOf('hour').fromNow()}</Text>
                                        </HStack>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody p={1} mb={4}>
                            <Text>
                                {reply.content}
                            </Text>
                        </CardBody>
                        <Image
                            objectFit={'contain'}

                            marginLeft={'15px'}
                            marginRight={'15px'}
                            borderRadius={'25px'}
                            src='gua.jpg'
                        />

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}>
                            <Box ms={-4}>

                                <Button flex='1' variant='ghost' leftIcon={<i className="fa-regular fa-heart"></i>} >75 Like
                                </Button>
                            </Box>
                        </CardFooter>
                    </Card>
                )
            })}
        </>
    ) : (
        <h1>""</h1>
    )
}


