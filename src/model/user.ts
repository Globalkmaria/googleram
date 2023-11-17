export type AuthUser = {
  username: string;
  name: string;
  email: string;
  image?: string;
  id: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image" | "id">;

export type DetailUser = AuthUser & {
  followers: SimpleUser[];
  followings: SimpleUser[];
  posts: number;
};

export type SearchUser = AuthUser & {
  followers: number;
  followings: number;
};
