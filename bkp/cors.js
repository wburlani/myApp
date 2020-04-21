app.use((req, res, next)=>{
//console.log("acessou o middleware!");
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
app.use(cors());
next();
});

