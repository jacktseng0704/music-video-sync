export const getUserId = () => {
  try {
    let user = window.localStorage.getItem('partyroom');
    if (user) {
      user = JSON.parse(user);
    }
    return user.userId;
  } catch (err) {
    console.log(err);
  }
};
