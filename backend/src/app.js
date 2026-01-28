import express from "express";

const app = express();

app.use(express.json());

// routes to be imported

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// declare the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// example route: http://localhost:4000/api/v1/users/register

export default app;