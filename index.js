const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const { doubleCsrf } = require("csrf-csrf");
const globalErrorHandlerMiddleware = require("./middlewares/globalErrorHandler.middleware");

const { doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieOptions: {
    sameSite: "Lax",
    path: "/",
    secure: true,
  },
});

// app.use(doubleCsrfProtection);

app.get("/csrf-token", (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});

app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

app.use("/", require("./routes/auth.routes"));
app.use("/product", require("./routes/notifier.routes"));
app.use("/", require("./routes/history.routes"));

app.use(globalErrorHandlerMiddleware);

app.listen(port, async () => {
  require("./database/db-setup");
  console.log(`Listening on port ${port}`);
});
