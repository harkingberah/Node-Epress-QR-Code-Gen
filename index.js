import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path"; 
import { fileURLToPath } from "url";
import qr from "qr-image";


const app = express();
const port = 3000; 
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => { 
    var userUrl = req.body["url"];
    console.log(userUrl)
    var qr_png = qr.imageSync(userUrl, { type: 'png' });
    var dataUri = "data:image/png;base64," + qr_png.toString("base64");
    console.log(dataUri)
    res.send(`
        <html>
        <head>
            <title>QR Code Generator</title>
        </head>
        <body>
            <h1>Generated QR Code:</h1>
            <img src="${dataUri}" alt="QR Code" />
        </body>
        </html>
    `);
   
});


 



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(port,( )=> {
    console.log(`currently listening from port ${port}`);
});