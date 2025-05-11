export const checkAdminAuth = async () => {
  // Example: check localStorage or make an API call
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};
export const setAdminAuth = (token) => {
  localStorage.setItem('adminToken', token);
};

export const clearAdminAuth = () => {
  localStorage.removeItem('adminToken');
};