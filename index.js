const express = require('express');
const server = express();
server.use(express.json());

//Array de projects
const projects = [
  {
    id:"0",
    title:"BootCamp2020",
    tasks: []
  },
  {
    id:"1",
    title:"BootCamp2019",
    tasks: []
  },
  {
    id:"2",
    title:"BootCamp2018",
    tasks: []
  },
]
//Middlewares
let counter = 0;
server.use((req, res, next)=>{
  if(req.method){
      counter = counter + 1; 
  }
  console.log(`Foram feitas: ${counter} requisições!`);
  next();
});

function checkProjectExist(req, res, next){
  const id = req.params;
  const title = req.body.title;
  const project = projects.find(p => p.id == id && p.title == title);
  if(!!project){
    return res.status(400).json({ error : 'Este projeto não existe!'});
  }else{
    req.project = project;  
  }
  return next(); 
}

//=>Lista todos os projetos
server.get('/projects',(req, res)=>{
  return res.json(projects);  
});
//Lista um project
server.get('/projects/:id',checkProjectExist, (req, res)=>{  
  return res.json(req.project);
});
//=>Cadastrar novo project sem task
server.post('/projects/:id', checkProjectExist, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  const project = {id: id, title: title, tasks:[]};  
  projects.push(project);
  return res.json(project);
});
//Cadastrar novo project com o nome da task
server.post('/projects/:id', checkProjectExist, (req, res)=>{
  const { id } = req.params;
  const { titleTask } = req.body;
  const project = {id:id, title:title, tasks:[titleTask]};
  projects.push(project);
  return res.json(projects);
});
//Alterar o nome do project
server.put('/projects/:id', checkProjectExist, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;
  return res.json(projects);
});
//Apaga um project
server.delete('/projects/:id', checkProjectExist,(req, res)=>{
  const { id } = req.params;
  projects.splice(id, 1);
  return res.send();
});

//Porta onde o servidor é executado
server.listen(3000);