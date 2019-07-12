"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var app = __importStar(require("express"));
// const express = require("express");
app
    .default()
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(app.static(path.join(__dirname, "public")))
    .get("/", function (req, resp) {
    resp.render("index", { title: "INDEX" });
}).listen(3000, function () { });
//# sourceMappingURL=app.js.map