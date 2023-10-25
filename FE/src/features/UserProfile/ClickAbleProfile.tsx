import { Card, CardHeader, CardBody, Avatar, Text, Box, Image, HStack, IconButton} from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {useState, useEffect} from 'react'
import { IUser } from '../../interface/interface'
import { API } from '../../lib/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/types/rootState'
import { ThreadCard } from '../thread/ThreadCard'

export function ClickAbleUserProfile(){

    const threads = useSelector((state: RootState) => state.thread.threads)


    //getUserId
    const {id} = useParams()

    const [detailUser, setUser] = useState<IUser>()
    async function getUser() { 
        try{
            const response = await API.get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setUser(response.data)
        }catch (error){
            console.error("error pas masuk ke user id", error)
        }
    }
    useEffect(()=>{
        getUser()
        window.scrollTo(0, 0)
    }, [id])


    return detailUser ? (
        <>
        
        <Card fontFamily={'Montserrat'}marginTop={'10px'} bg={'blackAlpha.600'} textColor={'white'} m={'3'}>
        <CardHeader backgroundColor="auditorCard.headerBg1" p={4} >
            <HStack mb={3}>
                <Link to={"/"}>
                    <IconButton  aria-label='Search database'  icon={<ArrowBackIcon/>}/>
                </Link>
                <Text fontWeight={'bold'} m={2} fontSize={'2xl'}>{detailUser.full_name}</Text>
            </HStack>
            <Box>
                <Box h={'150px'}>
                    <Image borderRadius={'10'}  objectFit='cover' height={'100%'} width={'100%'}  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkXNrqW3T83sCnQtTtewajd2Bhemp2Qcq1A&usqp=CAU'/>  
                </Box>
                <Avatar position="absolute" size='lg' marginLeft={'4'} bottom="7em" src={detailUser?.picture}/>

                {/* <Box display={'Flex'} justifyContent={'space-between'} bg={'red'} width='50%'>
                    <Button justifyContent={'end'}></Button>
                </Box> */}

            </Box>

        </CardHeader>
       <CardBody lineHeight={'30px'}>
          <Text fontWeight={'bold'} fontSize={'20px'}>✨{detailUser.full_name}✨<i className="fa-solid fa-circle-check" color='green'></i></Text>
          <Text color={'gray'} fontSize='12px'>@{detailUser.username}</Text>
          <Text>{detailUser?.description}</Text>
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
          
       {threads?.map((item, index)=>{
            if(item.user?.id === detailUser?.id){
                return(
                    <ThreadCard key={index}id={item.id} content={item.content} image={item.image} user={item.user} posted_at={item.posted_at} likes_count={item.likes_count} is_liked={item.is_liked} replies_count={item.replies_count} />
                )
            }
            return null
        
       })}
        
       </CardBody>
     </Card>
    </>

    ) : (
        null
    )
}