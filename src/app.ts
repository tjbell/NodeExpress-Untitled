import * as fs from "fs";
import * as path from "path";
import * as app from "express";

app
    .default()
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(app.static(path.join(__dirname, "public")))
    .get("/", (req, resp) => {
        resp.render("index", {title:"Index"});
    }).listen(3000, () => {});