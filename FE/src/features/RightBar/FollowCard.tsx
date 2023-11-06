import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IFollow } from "../../interface/interface";
import { API } from "../../lib/api";
import { SET_FOLLOW } from "../../stores/rootReducer";

export function FollowCard(props: IFollow) {
  const dispatch = useDispatch();
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
      <Box display={"flex"} width="100%" padding={"20px 0px"}>
        <Link to={"/user/" + props.user?.id}>
          <Image
            src={props.picture ?? "/user-placeholder.png"}
            width={"50px"}
            height={"50px"}
            objectFit={"cover"}
            borderRadius={"50%"}
            marginRight={"20px"}
            alt="ini pp"
          />
        </Link>
        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
            <Box display={"flex"}>
              {/* <Text>{props.full_name}</Text> */}
              <Text>{props.full_name}</Text>
            </Box>
            <Text color="brand.grey">@{props.username}</Text>
          </Box>
          <Box flex={1} display="flex" justifyContent={"flex-end"}>
            <Button
              onClick={() =>
                handleFollow(props.id, props.user_id, props.is_followed)
              }
            >
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}