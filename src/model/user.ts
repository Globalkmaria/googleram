export type User = {
  username: string;
  name: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;

export type DetailUser = User & {
  followers: SimpleUser[];
  followings: SimpleUser[];
  bookmarks: string[];
};
