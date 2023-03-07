export const saveUser = (name: string, email: string) => {
  window.localStorage.setItem('Name', name);
  window.localStorage.setItem('Email', email);
};

export const getUser = () => {
  const name = window.localStorage.getItem('Name');
  const email = window.localStorage.getItem('Email');

  return { name, email };
};

export const clearUser = () => {
  window.localStorage.removeItem('Name');
  window.localStorage.removeItem('Email');
};
