import { Card, CardHeader, CardBody, CardFooter, Button, Flex, Avatar, Box, Heading, Text, Image, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, ModalCloseButton, ModalHeader } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { IThreadCard } from '../../interface/interface'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLike } from '../../hooks/likeHooks'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,

} from '@chakra-ui/react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useThreadDeletion } from '../../hooks/useDelete'




//open image when clicked
function ExpandableImage(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Image
        objectFit={'contain'}
        marginLeft={'15px'}
        marginRight={'15px'}
        borderRadius={'25px'}
        src={props.image}
        cursor="pointer"
        onClick={openModal}
      />

      <Modal size={'4xl'} isOpen={isOpen} onClose={closeModal} isCentered={true} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image
              objectFit="contain"
              src={props.image}
              width="100%"
              borderRadius={'25px'}
              mt={6}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export function ThreadCard(props: IThreadCard) {

  const { handleLike } = useLike()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteThread } = useThreadDeletion()


  const handleDeleteThread = () => {
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    deleteThread(props.id)
      .then((response) => {
        console.log('Thread deleted:', response);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error('Error deleting thread:', err);
      });
  };

  return (
    <>
      <Card fontFamily={'Montserrat'} p={4} mb={'3'} borderRadius={"none"} boxShadow={'2xl'}>
        <Box position="absolute" top="1rem" right="1rem">
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<FontAwesomeIcon icon={faEllipsisH} />} variant="ghost" />
            <MenuList>
              <MenuItem onClick={handleDeleteThread}>Delete Thread</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* MODAL TO CONFIRM DELETE THREAD  */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this thread?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={confirmDelete}>
                Yes, Delete
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* -------------------  */}
        
        <CardHeader p={1} >
          <Flex>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src={props.user?.picture} />
              <Box paddingBottom={'20px'}>
                <HStack>
                  <Link to={"/user/" + props.user?.id}>
                    <Heading fontFamily={'Montserrat'} size='sm'>{props.user?.full_name}</Heading>
                  </Link>
                  <Text fontSize={'sm'} color={'gray'}>@{props.user?.username}</Text>
                  <Text fontSize={'25px'} color={'gray'} fontWeight={'bold'}>•</Text>
                  <Text fontSize={'xs'} color={'gray'}>{moment(props.posted_at).startOf('hour').fromNow()}</Text>
                </HStack>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>

        <Link to={"/threadcarddetail/" + props.id}>
          <CardBody pl={5} mb={4}>
            <Text>
              {props.content}
            </Text>
          </CardBody>
        </Link>
        {/* <Image
        objectFit={'contain'}
        
        
        marginLeft={'15px'}
        marginRight={'15px'}
        borderRadius={'25px'}
        src={props.image}
    /> */}
        <ExpandableImage
          image={props.image}
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

            <Button flex='1' variant='ghost' leftIcon={<i className="fa-regular fa-heart"></i>} backgroundColor={props.is_liked ? "red" : "brand.grey"}
              onClick={() => handleLike(props.id, props.is_liked)} >
              {props.likes_count} Like
            </Button>
            <Link to={"/threadcarddetail/" + props.id}>
              <Button flex='1' variant='ghost' leftIcon={<ChatIcon />}>
                {props.replies_count} Replies
              </Button>
            </Link>

          </Box>
        </CardFooter>
      </Card>



      {/* 
<ThreadCardDetail/>
<ReplyBar/>
<ThreadReply/> */}

      {/* leftIcon={<BiShare />} */}
      {/* leftIcon={<BiLike />} */}
      {/* <img src={props.author_picture}/> */}
      {/* <p>{props.author_fullname}</p>
          <p>@{props.author_username}</p>
          <p>{props.posted_at}</p>
          <p></p>
          <button>{props.likes_count}</button>
          <button>{props.replies_count} Replies</button> */}
    </>
  )
}


