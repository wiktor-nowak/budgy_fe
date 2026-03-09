type TokenType = string | null;

let accessToken: TokenType = null;

export const tokenStore = {
  get: () => accessToken,
  set: (token: TokenType) => {
    accessToken = token;
  },
  clear: () => {
    accessToken = null;
  },
};

export type TokenStoreType = typeof tokenStore;
