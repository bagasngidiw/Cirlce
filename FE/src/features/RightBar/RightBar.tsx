import { Card, CardHeader, CardBody, Avatar, Text, Box, Image, Button, Flex, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IFollow } from '../../interface/interface';
import { API, setAuthToken } from '../../lib/api';
import { GET_FOLLOWS, SET_FOLLOW } from '../../stores/rootReducer';
import { RootState } from '../../stores/types/rootState'

export function RightBar() {
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
                </Box>

            </CardHeader>
            <CardBody lineHeight={'30px'}>
                <Text fontWeight={'bold'} fontSize={'20px'}>✨{user.full_name}✨<i className="fa-solid fa-circle-check" color='green'></i></Text>
                <Text color={'gray'} fontSize='12px'>@{user.username}</Text>
                <Text>{user.description}</Text>
                <Box display={'flex'}>
                    <Box display={'flex'} marginRight={'20px'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}>{user.followings_count ?? 0}</Text>
                        <Text>Following</Text>
                    </Box>
                    <Box display={'flex'}>
                        <Text marginRight={'5px'} fontWeight={'bold'}>{user.followers_count ?? 0}</Text>
                        <Text>Followers</Text>
                    </Box>
                </Box>
            </CardBody>
        </Card>
    )
}
export function SuggestionBar() {

    const [randomUser, setRandomUser] = useState<IFollow[]>()
    const dispatch = useDispatch()

    useEffect(() => {
        const random = async () => {
            try {
                setAuthToken(localStorage.token)
                const response = await API.get(`/follows`)
                setRandomUser(response.data)
            } catch (error) {
                console.log("error di suggest", error);

            }
        }
        random()
    }, [])

    async function handleFollow(
        id: number,
        followedUserId: number,
        isFollowed: boolean
    ) {
        try {
            if (!isFollowed) {
                await API.post(`/follow`, {
                    followed_user_id: followedUserId,
                });
                dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
                console.log("Followed: ", id);

            } else {
                await API.delete(`/follow/${followedUserId}`);
                dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
                console.log("Unfollowed: ", id);


            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Card fontFamily={'Montserrat'} marginTop={'15px'} bg={'blackAlpha.600'} textColor={'white'}>
                <CardHeader>
                    <Text fontWeight={'bold'} fontSize={'2xl'}>Suggested For You</Text>
                </CardHeader>
                {randomUser && randomUser.map((data, i) => (
                    <Box display={"flex"} width="100%" padding={"20px 0px"} key={i}>
                        <Image
                            src={data.picture}
                            width={"50px"}
                            height={"50px"}
                            objectFit={"cover"}
                            borderRadius={"50%"}
                            ml={7}
                            alt="ini pp"
                        />
                        <Box display={"flex"} width={"100%"}>
                            <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
                                <Box display={"flex"}>
                                    {/* <Text>{props.full_name}</Text> */}
                                    <Text>{data.full_name}</Text>
                                </Box>
                                <Text color="brand.grey">@{data.username}</Text>
                            </Box>
                            <Box mr={6} flex={1} display="flex" justifyContent={"flex-end"}>
                                <Button onClick={() =>
                                    handleFollow(data.id, data.user_id, data.is_followed)
                                }>
                                    {data.is_followed ? "Unfollow" : "Follow"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Card>
        </>
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


