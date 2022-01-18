require('dotenv').config()
const express = require("express");

dotenv.config({ path: './config.env' });
const connectDatabase = require('./db');
//----------------------------------------------------------------------------- connect with database
connectDatabase();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/notes"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


//----------------------------------------------------------------------------- Listen
app.listen(port, () => {
    console.log(`Web application listening at http://localhost:${port}`);
});
