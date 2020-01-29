const Server = express();

server.use(express.json());

const users = ['Marcelo', 'João', 'Gabriel'];

// Listar 1 usuário 
server.get('/users/:index', (req, res)=>{
   const { index } = req.params; 
   return res.json(users[index]); 
  });

// Listar todos os usuarios 
server.get('/users',(req,res) =>{ 
  return res.json(users); 
}); 
// Criar um novo usuario 
server.post('/users',(req, res)=>{
   const {name} = req.body ; 
   users.push(name); 
   return res.json(users); 
  }); 
  // Alterar usuario 
  server.put('/users/:index',(req, res) =>{
     const { index } = req.params; 
     const { name } = req.body ; 
     users[index] = name; 
    }); 

  server.delete('/users/:index',(req, res)=>{ 
    const { index } = req.params; 
    users.splice(index , 1); 
    return res.json(users); 
  });

server.listen(3333);