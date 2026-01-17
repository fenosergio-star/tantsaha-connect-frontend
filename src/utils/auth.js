// utils/auth.js
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user?.role === 'admin';
};

export const isMember = () => {
  const user = getUserFromToken();
  return user?.role === 'member';
};