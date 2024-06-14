import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'

// import { PostAuthor } from "./PostAuthor";
// import { TimeAgo } from "./TimeAgo";
// import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "../../store/slices/postsSlice";
import { rootState } from "@/store";

interface Params {  
  postId: string; // 定义你需要的参数及其类型  
} 

export const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useSelector((state:rootState) => selectPostById(state, postId))
    if (!post) {
        return (
          <section>
            <h2>页面未找到！</h2>
          </section>
        );
    }

    const user = useSelector((state:rootState) => state.users.find((user) => user.id === post.user))
    
    return (
        <section>
          <article className="post">
            <h2>{post.title}</h2>
            {/* <PostAuthor userId={post.user}/> */}
            {/* <TimeAgo timestamp={post.date}/> */}
            <p className="post-content">{post.content}</p>
            {/* <ReactionButtons post={post} /> */}
            <Link to={`/editPost/${post.id}`} className="button">
                Edit Post
            </Link>
          </article>
        </section>
      );
}

export default SinglePostPage