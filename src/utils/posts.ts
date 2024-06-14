import { Reactions } from "../store/slices/postsSlice"

export type postType =  {
  id: string,
  title: string,
  content: string,
  user: string,
  date: string
  reactions: Reactions
}