exports.displayProfile = (req, res, next) => {
  user = req.session.user;
  console.log(user);
  res.status(404).render("chat/displayProfile");
};

exports.displayChat = (req, res, next) => {
  res.render("chat/chat");
};
