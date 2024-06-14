import { createSlice, nanoid,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// import { sub } from "date-fns"

import { client } from "../../api/client";
import { postType } from  '../../utils/posts'
import { rootState } from "..";

export interface Reactions {
  thumbsUp?: number,
  hooray?: number,
  heart?: number,
  rocket?: number,
  eyes?: number,
}

interface PostState {
  posts: postType[]
  status: string,
  error: string | undefined
}

const initialState: PostState = {
// { id: "1", title: "First Post!", content: "Hello!", user: "0", date: sub(new Date(), { minutes: 10 }).toISOString(), reactions:{}},
// { id: "2", title: "Second Post", content: "More text", user: "1", date: sub(new Date(), { minutes: 5 }).toISOString(), reactions:{}},
  posts: [],
  status: "idle",
  error: ""
};

  export const fetchPosts = createAsyncThunk("post/fetchPosts", async() => {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', //json格式
      },
    })
    return response.json()
  })

  export const addNewPost = createAsyncThunk("post/addNewPost", async (initialPost)=>{
    const response = await client.post("/fakeApi/posts", initialPost)
    return response.data
  }) 

  const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      // postAdded(state, action) {
      //   state.push(action.payload)
      // },
      postAdded: {
        reducer(state,action: PayloadAction<postType>){
          state.posts.push(action.payload)
        },
        prepare(title:string, content:string, userId:string){
          return {
            payload: {
              id: nanoid(),
              title,
              content,
              user: userId,
              reactions:{},
              date: new Date().toISOString()
            },
          }
        }
      },
      postUpdated(state,action) {
        const {id,title,content} = action.payload
        const existingPost: postType | undefined = state.posts.find((post:postType) => post.id === id)
        if(existingPost !== undefined) {
          existingPost.title = title
          existingPost.content = content
        }
      },
      reactionAdded(state,action:{payload:{reaction: keyof Reactions, postId: string}}){
        const {postId, reaction} = action.payload
        const existingPost = state.posts.find((post:postType) => post.id === postId)
        if (existingPost) {  
          // 确保existingPost.reactions是一个对象  
          if (!existingPost.reactions) {  
            existingPost.reactions = {}; // 初始化为一个空对象  
          }  
            
          // 现在，我们可以安全地检查reaction并增加或设置它的计数  
          if (reaction in existingPost.reactions) {  
            existingPost.reactions[reaction]++;  
          } else {  
            existingPost.reactions[reaction] = 1;  
          }  
        }
        // if(existingPost) {
        //   if(existingPost.reactions && reaction in existingPost.reactions)
        //     existingPost.reactions[reaction]++
        //   else 
        //     existingPost.reactions[reaction] = 1
        // }
      }
    },
    extraReducers(builder) {
      builder.addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      }).addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.posts = state.posts.concat(action.payload)
      }).addCase(fetchPosts.rejected, (state, action)=>{
        state.status = "failed"
        state.error = action.error.message
      }).addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
    }
  });
  
  export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

  export const selectAllPosts = (state: rootState) => state.posts.posts

  export const selectPostById = (state: rootState, postId?:string) => state.posts.posts.find((post: postType) => post.id === postId) 

  export default postsSlice.reducer;