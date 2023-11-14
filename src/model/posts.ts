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
  updatedAt: string;
  createdAt: string;
  comments: Comment[];
  id: string;
  text: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};

export const CATEGORIES = ["posts", "saved", "liked"] as const;
export type Categories = (typeof CATEGORIES)[number];
