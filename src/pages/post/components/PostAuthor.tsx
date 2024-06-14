import react from "react";

import { useSelector } from "react-redux";
import { rootState } from "@/store";

interface PostAuthorProps {
  userId: string
}

export const PostAuthor: React.FC<PostAuthorProps> = ({userId}) => {
  console.log(userId);

  const users = useSelector((state:rootState) => state.users)
  console.log(users);
  
  
  const author = useSelector((state: rootState) => state.users.find((user) => user.id === userId))

  return <span>by {author ? author.name : "Unknown author"}</span>;
}