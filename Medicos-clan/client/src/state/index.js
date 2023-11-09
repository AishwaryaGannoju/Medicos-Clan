import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  comments:[],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setComments: (state, action) => {
      // Assuming the action.payload contains the post ID and the updated comments
      const { postId, updatedComments } = action.payload;
    
      // Find the post by ID
      const postToUpdate = state.posts.find((post) => post._id === postId);
    
      // If the post is found, update its comments
      if (postToUpdate) {
        postToUpdate.comments = updatedComments;
      }
    
      // Return the updated state
      return state;
    },
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost,setComments} =
  authSlice.actions;
export default authSlice.reducer;
