// ! import space
import express from "express";
import cors from "cors";
import fs from 'fs'
import { format } from 'date-fns';
import path from 'path';
import { fileURLToPath } from 'url';


// ! declaration/initailation
const app = express();
const PORT = 4000;
app.use(cors());


// ! middelware defult
app.use(express.json());

// ! Utility dirname
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// ! write 
app.get('/create',(req,res)=>{
    let today = format(new Date(),'dd-mm-yyyy-HH-mm-ss')
    const filepath = `Timestamp/${today}.txt`
    fs.writeFileSync(filepath,`${today}`,'utf8')
    res.status(200).send(filepath)
   

})


// ! read 
app.get('/read', (req, res) => {
    const directoryPath = path.join(dirname, './Timestamp');
    let fileData = [];
  
     fs.readdirSync(directoryPath).forEach(file => {
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, 'utf8');
      fileData.push( {file, data} );
    });
  res.status(200).send(fileData);
  });


// ! Home
app.get('/',(req,res)=>{
   res.status(200).send("File_System");
})

// ! running port
app.listen(PORT,(req,res)=>{
    console.log("App is Running on Port :",PORT);
})