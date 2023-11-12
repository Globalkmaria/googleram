import { SimpleUser } from "./user";

export type Comment = {
  username: string;
  comment: string;
  id: string;
  image: string;
};

export type FullPost = {
  user: SimpleUser;
  photo: string;
  likes: string[];
  bookmarked: boolean;
  updatedAt: number;
  createdAt: number;
  comments: Comment[];
  id: string;
  text: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};
