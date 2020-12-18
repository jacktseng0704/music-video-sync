export const getUserData = () => {
  try {
    let user = window.localStorage.getItem('partyroom');
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
