import express from "express";
import axios from "axios";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    res.render("index.ejs", {setup: "Make a Choice"});
});

app.post("/joke", async (req,res) => {
    try {
        let web = "https://v2.jokeapi.dev/joke/";
        let isFirst = true;

        if (req.body.Programming) {
            if (isFirst) {
                web += "Programming";
                isFirst = false;
            } else {
                web += ",Programming";
            }
        }
        if (req.body.Misc) {
            if (isFirst) {
                web += "Misc";
                isFirst = false;
            } else {
                web += ",Misc";
            }
        }
        if (req.body.Dark) {
            if (isFirst) {
                web += "Dark";
                isFirst = false;
            } else {
                web += ",Dark";
            }
        }
        if (req.body.Pun) {
            if (isFirst) {
                web += "Pun";
                isFirst = false;
            } else {
                web += ",Pun";
            }
        }
        if (isFirst) {
            web += "Any";
        }
        isFirst = true;
        if (req.body.Nsfw) {
            if (isFirst) {
                web += "?blacklistFlags=nsfw";
                isFirst = false;
            } else {
                web += ",nsfw";
            }
        }
        if (req.body.Religious) {
            if (isFirst) {
                web += "?blacklistFlags=religious";
                isFirst = false;
            } else {
                web += ",religious";
            }
        }
        if (req.body.Political) {
            if (isFirst) {
                web += "?blacklistFlags=political";
                isFirst = false;
            } else {
                web += ",political";
            }
        }
        if (req.body.Racist) {
            if (isFirst) {
                web += "?blacklistFlags=racist";
                isFirst = false;
            } else {
                web += ",racist";
            }
        }
        if (req.body.Sexist) {
            if (isFirst) {
                web += "?blacklistFlags=sexist";
                isFirst = false;
            } else {
                web += ",sexist";
            }
        }
        if (req.body.Explicit) {
            if (isFirst) {
                web += "?blacklistFlags=explicit";
                isFirst = false;
            } else {
                web += ",explicit";
            }
        }
        if (!(req.body.Single && req.body.Twopart)) {
            if (req.body.Single) {
                web += "?type=single";
            }
            if (req.body.Twopart) {
                web += "?type=twopart";
            }
        }
        const result = await axios.get(`${web}`);
        res.render("index.ejs", {setup: result.data.setup, delivery: result.data.delivery, joke: result.data.joke, message: result.data.message});
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});