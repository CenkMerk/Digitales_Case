import { PostItemProps } from "./PostItemProps";

export interface PostsListProps {
  posts: PostItemProps[];
  HandleClick: (item: PostItemProps) => void;
}
