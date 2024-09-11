import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/static',express.static(path.join(__dirname,'../dist/public')))

app.use('/',router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});



