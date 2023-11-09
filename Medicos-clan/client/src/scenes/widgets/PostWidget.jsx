import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
 InputBase,
  TextField,
  Button,
  // useMediaQuery,
} from "@mui/material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'; // Import React Hook Form

// ...



// ...
import { setPosts,setPost } from "state";
// const [isEditingFirstName, setIsEditingFirstName] = useState(false);

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const { handleBlur, handleChange } = useForm(); // Initialize React Hook Form
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
const [comment,setComment]=useState({comment:''});
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const { _id } = useSelector((state) => state.user);
  const handleComment = async () => {
    const commentData = new FormData();
    commentData.append("userId", _id); // Assuming you need to send the user ID with the comment
    commentData.append("comment", comment); // Assuming 'comment' contains the actual comment text
    
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: commentData,
      });
    
      if (response.ok) {
        const updatedPost = await response.json();
        // Assuming you have a function dispatchPosts to update the post with new comments
        dispatch(setPosts({ posts: updatedPost }));
        setComment(""); // Clear the comment input field after posting
      } else {
        // Handle errors if the request fails
        console.error("Error posting comment");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
          <IconButton onClick={() => {
  // Define a function to return the JSX element
  
    <TextField
      label="First Name"
      onBlur={handleBlur}
      onChange={handleChange}
      name="comment"
      sx={{ gridColumn: "span 2" }}
    />
  

  // Call the function and set isComments
  
  setIsComments(!isComments);
}}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* <Box
            display="grid"
            gap="10px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          > */}
          <FlexBetween gap="1.5rem">

       <InputBase
          placeholder="comment"
          onChange={(e) => setComment({comment:e.target.value})}
          value={comment.comment}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
    <Button
          // disabled={!post}
          onClick={handleComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
