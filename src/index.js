import express from "express";
import cors from "cors";

import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import issueRouter from "./routers/issue.router.js";
import linkRouter from "./routers/link.router.js";
import recordRouter from "./routers/record.router.js";
import relationRouter from "./routers/relation.router.js";

import connectDB from "./mongodb/index.js";

const app = express();
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173' , 'https://one-med-client.vercel.app' ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }));
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.send({message: "Hello World"});
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/issue', issueRouter);
app.use('/api/link', linkRouter);
app.use('/api/record', recordRouter);
app.use('/api/relation', relationRouter);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server started on http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
}

startServer();