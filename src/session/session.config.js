import session from "express-session";

const SECRET = process.env.SESSION_SECRET

const sessionMiddleware = session({
  name: "api-session",
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 300_000
  }
}) 

export default sessionMiddleware