import express from "express";
import * as path from "path";

const app = express();
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
    if(req.method == "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"))
    }else{
        next();
    }
})

app.listen(process.env.PORT || 3000);

/*let tasks = [
    {id: 0, title: "wake up", status: "done"},
    {id: 1, title: "do homework", status: "doing"}
];

app.get("/api/todos", (req, res) => {
    res.json(tasks)
});

app.post("/api/todos", (req, res) => {
    const {title} = req.body;
    tasks.push({id: tasks.length, title, status: "todo"})
    res.send();
})

app.put("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {status} = req.body;
    tasks = tasks.map(t => {
        return t.id === id ? {...t, status: status} : t
    });
    res.send();
});


app.use(express.static(path.join("..", "client", "dist")));


*/