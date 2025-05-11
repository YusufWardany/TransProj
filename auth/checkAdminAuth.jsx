export const checkAdminAuth = async () => {
  // Example: check localStorage or make an API call
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};