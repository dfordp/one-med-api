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
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.send({message: "Hello World"});
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/issues', issueRouter);
app.use('/api/links', linkRouter);
app.use('/api/records', recordRouter);
app.use('/api/relations', relationRouter);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Server started on http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
}

startServer();