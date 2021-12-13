exports.displayProfile = (req, res, next) => {
  const user = req.session.user;
  console.log(user);
  res.status(404).render("chat/displayProfile");
};

exports.displayChat = (req, res, next) => {
  res.render("chat/chat");
};
