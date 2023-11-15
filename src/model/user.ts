export type AuthUser = {
  username: string;
  name: string;
  email: string;
  image?: string;
  id: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type DetailUser = AuthUser & {
  followers: SimpleUser[];
  followings: SimpleUser[];
  bookmarks: string[];
  posts: number;
};

export type SearchUser = AuthUser & {
  followers: number;
  followings: number;
};
