import { Card, CardHeader, CardBody, Avatar, Text, Box, Image, Button, Flex, HStack, IconButton } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/types/rootState'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ThreadCard } from '../thread/ThreadCard'
import { useEffect, useState } from 'react'
import { API } from '../../lib/api'
import { IUser } from '../../interface/interface'

export function UserProfile() {

    const {id} = useParams()


    const [detailUser, setUser] = useState<IUser | null>(null)
    async function getUser() { 
        try{
            const response = await API.get(`/user/${id}`) 
            setUser(response.data)
            console.log("ini respon UserId", response)

        }catch (error){
            console.error("error pas masuk ke user id", error)
        }
    }

    useEffect(()=>{
        getUser()
    }, [id])

    const user = useSelector((state: RootState) => state.auth)
    const threads = useSelector((state: RootState) => state.thread.threads)



    return (
        <Card fontFamily={'Montserrat'} marginTop={'10px'} bg={'blackAlpha.600'} textColor={'white'} m={'3'}>
            <CardHeader backgroundColor="auditorCard.headerBg1" p={4} >
                <HStack mb={3}>
                    <Link to={"/"}>
                        <IconButton aria-label='Search database' icon={<ArrowBackIcon />} />
                    </Link>
                    <Text fontWeight={'bold'} m={2} fontSize={'2xl'}>{user.full_name}</Text>
                </HStack>
                <Box>
                    <Box h={'150px'}>
                        <Image borderRadius={'10'} objectFit='cover' height={'100%'} width={'100%'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkXNrqW3T83sCnQtTtewajd2Bhemp2Qcq1A&usqp=CAU'>
                        </Image>
                    </Box>
                    <Avatar position="absolute" size='lg' marginLeft={'4'} bottom="7em" src={user?.picture} />

                    <Flex justifyContent={'flex-end'}>
                        <Link to={'/editProfile/' + user.id}>
                            <Button textColor={'white'} borderRadius={'10px'} bg={'transparent'} border={'2px solid grey'} size={'sm'} marginTop={'10px'}>Edit Profile</Button>
                        </Link>
                    </Flex>
                </Box>

            </CardHeader>
            <CardBody lineHeight={'30px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>✨{user.full_name}✨<i className="fa-solid fa-circle-check" color='green'></i></Text>
                <Text color={'gray'} fontSize='12px'>@{user.username}</Text>
                <Text>{user?.description}</Text>
                <Box display={'flex'}>
                    <Box display={'flex'} marginRight={'20px'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}>200</Text>
                        <Text>Following</Text>
                    </Box>
                    <Box display={'flex'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}>2M</Text>
                        <Text>Followers</Text>
                    </Box>
                </Box>
                {threads?.map((item, index) => {
                    if (item.user?.id === detailUser?.id) {
                        return (
                            <ThreadCard key={index} id={item.id} content={item.content} image={item.image} user={item.user} posted_at={item.posted_at} likes_count={item.likes_count} is_liked={item.is_liked} replies_count={item.replies_count} />
                        )
                    }
                    return null

                })}
            </CardBody>
        </Card>
    )
}