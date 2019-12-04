const sessionKey = 'session';
const postIdKey = 'postId';

export const getSession = () => {
  const session = window.localStorage.getItem(sessionKey);
  return session ? JSON.parse(session) : null;
};

export const setSession = session => {
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
};

export const removeSession = () => {
  window.localStorage.removeItem(sessionKey);
};

export const getPostId = () => {
  const postId = window.localStorage.getItem(postIdKey);
  return postId ? JSON.parse(postId) : null;
};

export const setPostId = id => {
  window.localStorage.setItem(postIdKey, JSON.stringify(id));
};

export const removePostId = () => {
  window.localStorage.removeItem(postIdKey);
};
