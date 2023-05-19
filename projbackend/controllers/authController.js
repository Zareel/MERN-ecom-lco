export const signup = (req, res) => {
  res.json({
    message: "you are successfully signed up",
  });
};

export const signout = (req, res) => {
  res.json({
    message: "user has signed out",
  });
};
