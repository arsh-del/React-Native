const express=require('express')
const bodyparser=require('body-parser')
const fs=require('fs')
const app=express()
app.use(bodyparser.urlencoded({extended:true}))


app.get('',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get('/user',(req,res)=>{
    res.sendFile(__dirname + "/user.json")
    
})

app.post('/',(req, res) => {

    
    const nm = (req.body.name)
    const heigh = parseFloat(req.body.num1)
    const weigh = parseFloat(req.body.num2)
    //const add = n1+n2;
     bmi = weigh / (heigh * heigh);
//res.send('Your BMI is '+bmi)

    //const animals = [];

    //animals.push(nm,heigh,weigh,bmi);
    //console.log(animals);

    
let student = { 
    id:Date.now(),
    name: nm,
    Height: heigh, 
    weight: weigh,
    BMI: bmi,
    
};
 
let data = JSON.stringify(student);
fs.appendFileSync('user.json', data);

   
    //fs.writeFileSync("user.json",data);
     //fs.appendFileSync("user.json","name="+nm);

     //localStorage.setItem("user.json",animals);

if (bmi < 19) {
    res.send(
        "Your BMI is:  "+ bmi +
        "  <h2> Name: </h2>  "+ nm + 
        "</h3>Status:UnderWeight </h3> "+ 
        " you Should eat a litte bit " 
             );
} else if (19 <= bmi && bmi < 25) {
    res.send(
        "Your BMI is:  "+ bmi +
        " <h2> Name: </h2>  "+ nm + 
        "<h2> Status:Normal </h2>  "+ 
        "<h3> Keep doing what you are doing </h3>" 
             );
} else if (25 <= bmi && bmi < 30) {
    res.send(
             "Your BMI is: "+ bmi +
             "<h2> Name: </h2>  "+ nm + 
             "  <h3>Status:Obese</h3>  "+ 
             "  you Should really do something regarding your Appetite " 
             );
} else {
    res.send(
        "Your BMI is:  "+ bmi +
        "<h2> Name: </h2>  "+ nm + 
        "<h3> Status:Obese </h3>  "+ 
        "      your Should really do something regarding your Appetite " 
             );
}
});


app.listen(2000,(res)=>{
    console.log("server started at port 2000")
})