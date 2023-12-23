const ex = require('express');
const app = ex();

app.set('view engine','ejs');


app.use(ex.static('public'))



app.listen(3000)




app.get('/home',(req,res)=>{
    res.render('homepage')
}
)
app.get('/content',(req,res)=>{
    res.render('content')
}
)
app.use((req,res)=>{
    res.render('err')
}
)

