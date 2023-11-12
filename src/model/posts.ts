import { SimpleUser } from "./user";

export type Post = {
  user: SimpleUser;
  photo: string;
  likes: string[];
  bookmarked: boolean;
  updatedAt: number;
  createdAt: number;
  comments: number;
  id: string;
  text: string;
};

export type Comment = {
  username: string;
  comment: string;
  id: string;
};
