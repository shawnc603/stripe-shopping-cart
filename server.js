const app = require("./src");
const hostname= 'localhost';
const port = 5008;

app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});
