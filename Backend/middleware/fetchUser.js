const jwt = require("jsonwebtoken");
const JWT_S = "hehjbfjbsjbk@djfn";

fetchUser = async (req, res, next) => {
  const token = await req.header("auth-token");
  //   console.log(token);
  if (!token) {
    return res.status(600).send({ error: "not valid token" });
  }
  try {
    const data = await jwt.verify(token, JWT_S);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = fetchUser;
