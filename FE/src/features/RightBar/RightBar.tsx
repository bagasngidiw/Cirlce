import { Card, CardHeader, CardBody, Avatar, Text, Box, Image, Button, VStack, Flex, HStack } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { API } from '../../lib/api';
import { GET_FOLLOWS, SET_FOLLOW_STATE } from '../../stores/rootReducer';
import { RootState } from '../../stores/types/rootState'

export function RightBar({followData} : any) {
    const dispatch = useDispatch();
    
    const followState = useSelector(
        (state: RootState) => state.follow.followState
    );
    const user = useSelector((state: RootState) => state.auth)
    
    async function getFollowData() {
        const response = await API.get(`/follow?type=${followState}`);

        dispatch(GET_FOLLOWS(response.data));
    }
    useEffect(() => {
        getFollowData();
    }, [followState]);


    // //jumlah followers

    // //jumlah followings


    return (
        <Card fontFamily={'Montserrat'} width="500px" marginTop={'10px'} bg={'blackAlpha.600'} textColor={'white'}>
            <CardHeader backgroundColor="auditorCard.headerBg1" p={4} >
                <Text fontWeight={'bold'} mb={'10px'} fontSize={'2xl'}>
                    My Profile
                </Text>
                <Box>
                    <Box h={'150px'}>
                        <Image borderRadius={'10'} objectFit='cover' height={'100%'} width={'100%'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkXNrqW3T83sCnQtTtewajd2Bhemp2Qcq1A&usqp=CAU'>

                        </Image>
                    </Box>
                    <Avatar position="absolute" size='lg' marginLeft={'4'} bottom="7em" src={user.picture} />

                    <Flex justifyContent={'flex-end'}>
                        <Link to={'/editProfile/' + user.id}>
                            <Button textColor={'white'} borderRadius={'10px'} bg={'transparent'} border={'2px solid grey'} size={'sm'} marginTop={'10px'}>Edit Profile</Button>
                        </Link>
                    </Flex>

                    {/* <Box display={'Flex'} justifyContent={'space-between'} bg={'red'} width='50%'>
                    <Button justifyContent={'end'}></Button>
                </Box> */}

                </Box>

            </CardHeader>
            <CardBody lineHeight={'30px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>✨{user.full_name}✨<i className="fa-solid fa-circle-check" color='green'></i></Text>
                <Text color={'gray'} fontSize='12px'>@{user.username}</Text>
                <Text>{user.description}</Text>
                <Box display={'flex'}>
                    <Box display={'flex'} marginRight={'20px'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}></Text>
                        <Text>Following</Text>
                    </Box>
                    <Box display={'flex'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}></Text>
                        <Text>Followers</Text>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    )
}

export function SuggestionBar() {
    return (
        <Card fontFamily={'Montserrat'} marginTop={'15px'} bg={'blackAlpha.600'} textColor={'white'}>
            <CardHeader>
                <Text fontWeight={'bold'} fontSize={'2xl'}>Suggested For You</Text>
            </CardHeader>
            <CardBody marginTop={'-20px'} display={'flex'} >
                <Flex justifyContent={'space-between'} w={"100%"}>
                    <Avatar src='https://i0.wp.com/esportsnesia.com/wp-content/uploads/2021/09/ONIC-Butss-1.jpg' />
                    <VStack marginLeft={'-200px'} spacing={'0'}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>msatrya</Text>
                        <Text fontSize={'10px'}>@onic_buuts</Text>
                    </VStack>
                    <Flex ms='5' alignItems={'center'}>
                        <Button border='1px'>Following</Button>
                    </Flex>
                </Flex>
            </CardBody>
            <CardBody marginTop={'-20px'} display={'flex'}>
                <Flex justifyContent={'space-between'} w={"100%"}>
                    <Avatar src='https://cdn-2.tstatic.net/tribunnews/foto/bank/images/profil-kiboy-salah-satu-roster-onic-esports-yang-meraih-gelar-mvp.jpg' />
                    <VStack marginLeft={'-200px'} spacing={'0'}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>kiboy</Text>
                        <Text fontSize={'10px'}>@onic_kiboy</Text>
                    </VStack>
                    <Flex ms='5' alignItems={'center'}>
                        <Button border='1px'>Following</Button>
                    </Flex>
                </Flex>

            </CardBody>
            <CardBody marginTop={'-20px'} display={'flex'}>
                <Flex justifyContent={'space-between'} w={"100%"}>
                    <Avatar src='https://dailyspin.id/wp-content/uploads/2023/01/ONIC-Sanz.jpg' />
                    <VStack marginLeft={'-200px'} spacing={'0'}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>S A N Z</Text>
                        <Text fontSize={'10px'}>@onic_SANZ</Text>
                    </VStack>
                    <Flex ms='5' alignItems={'center'}>
                        <Button border='1px'>Following</Button>
                    </Flex>
                </Flex>

            </CardBody>
            <CardBody marginTop={'-20px'} display={'flex'} >
                <Flex justifyContent={'space-between'} w={"100%"}>
                    <Avatar src='https://www.indoesports.com/storage/images/onic-cw-2-6-mar-2022.jpg' />
                    <VStack marginLeft={'-200px'} spacing={'0'}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>CW</Text>
                        <Text fontSize={'10px'}>@onic_CW</Text>
                    </VStack>
                    <Flex ms='5' alignItems={'center'}>
                        <Button border='1px'>Following</Button>
                    </Flex>
                </Flex>
            </CardBody>
            <CardBody marginTop={'-20px'} display={'flex'}>
                <Flex justifyContent={'space-between'} w={"100%"}>
                    <Avatar src='https://dailyspin.id/wp-content/uploads/2021/02/Drian-MPL-Season-7.jpg' />
                    <VStack marginLeft={'-200px'} spacing={'0'}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>Drian</Text>
                        <Text fontSize={'10px'}>@onic_Drian</Text>
                    </VStack>
                    <Flex ms='5' alignItems={'center'}>
                        <Button border='1px'>Following</Button>
                    </Flex>
                </Flex>

            </CardBody>
        </Card>
    )
}

export function DevelopedByYourName() {
    return (
        <Card fontFamily={'Montserrat'} marginTop={'15px'} bg={'blackAlpha.600'} textColor={'white'}>
            <CardHeader>
                <Flex>
                    <Text fontWeight={'bold'} fontSize={'xl'}>Developed By Your Name</Text>
                    <Flex gap={'10px'} marginTop={'10px'} marginLeft={'30px'}>
                        <i className="fa-brands fa-facebook fa-lg"></i>
                        <i className="fa-brands fa-github fa-lg"></i>
                        <i className="fa-brands fa-linkedin fa-lg"></i>
                        <i className="fa-brands fa-square-instagram fa-lg"></i>
                    </Flex>

                </Flex>
                <HStack fontSize={'15px'}>
                    <Text>Powered By</Text>
                    {/* <Box h={'150px'}>
                        <Image objectFit={'contain'} width={'50%'} height={'50%'} src='https://dumbways.id/assets/images/brandred.png'/>
                    </Box> */}
                    <Text>Dumbways Indonesia</Text>
                    <Text>#1 Coding Bootcamp</Text>

                </HStack>

            </CardHeader>

        </Card>

    )
}


