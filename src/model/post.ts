import { SimpleUser } from "./user";

export type Post = {
  user: SimpleUser;
  photo: string;
  likes: number;
  bookmarked: boolean;
  updatedAt: number;
  comments: Comment[];
  id: string;
};

export type Comment = {
  user: {
    username: string;
  };
  comment: string;
  id: string;
};
