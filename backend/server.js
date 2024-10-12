import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"nbsERP_Test"
    }
);


// signup

app.post("/signup",(req,res)=> {
    const q = "insert into signup_table(`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("succesfully");
    });


})


// login

app.post("/login",(req,res)=> {
    const q = "SELECT * FROM signup_table WHERE `email` = ? AND `password` = ? ";
   
    db.query(q, [req.body.email, req.body.password], (err,data) => {
        if(err){ 
            return res.json(err);
        }
        if(data.length > 0){
            return res.json("success");
        }
        else{
            return res.json("faile");
        }
        
    })
})


//get details from table

app.get("/emp_details",(req,res)=>{
    const q = "SELECT * FROM pay_genemployees2"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



//add emp details

app.post("/add_emp_details", (req, res) => {
    const q = `
        INSERT INTO pay_genemployees2(
            nCompanyID,
            cLastName,
            cOtherNames,
            cUseName,
            bSex,
            nPMonthSalary,
            dDateOfBirth,
            dDateJoined,
            cBirthPlace,
            cBirthCountry,
            cPAddress1,
            cPAddress2,
            cPAddress3,
            cPAddress4
        ) 
        VALUES (?)
    `;
    
    const values = [
        req.body.nCompanyID, 
        req.body.cLastName, 
        req.body.cOtherNames,
        req.body.cUseName,       
        req.body.bSex,         
        req.body.nPMonthSalary,
        req.body.dDateOfBirth,
        req.body.dDateJoined,
        req.body.cBirthPlace, 
        req.body.cBirthCountry, 
        req.body.cPAddress1, 
        req.body.cPAddress2, 
        req.body.cPAddress3,
        req.body.cPAddress4,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Successfully added employee details");
    });
});



//delete emp details
app.delete("/delete_details/:id", (req, res) => {
    const detailId = req.params.id;
    const q = "DELETE FROM pay_genemployees2 WHERE id = ?";

    db.query(q, [detailId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Employee deleted successfully");
    });
});



// Get employee details by ID
app.get("/emp_details/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM pay_genemployees2 WHERE id = ?";
    
    db.query(q, [id], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json("Employee not found");
      return res.json(data[0]);
    });
  });
  
  // Update employee details
  app.put("/update_emp_details/:id", (req, res) => {
    const id = req.params.id;
    const q = `
      UPDATE pay_genemployees2 SET
        nCompanyID = ?, cLastName = ?, cOtherNames = ?, cUseName = ?, bSex = ?,
        nPMonthSalary = ?, dDateOfBirth = ?, dDateJoined = ?,
        cBirthPlace = ?, cBirthCountry = ?, cPAddress1 = ?,
        cPAddress2 = ?, cPAddress3 = ?, cPAddress4 = ?
      WHERE id = ?
    `;
  
    const values = [
      req.body.nCompanyID,
      req.body.cLastName,
      req.body.cOtherNames,
      req.body.cUseName,
      req.body.bSex,
      req.body.nPMonthSalary,
      req.body.dDateOfBirth,
      req.body.dDateJoined,
      req.body.cBirthPlace,
      req.body.cBirthCountry,
      req.body.cPAddress1,
      req.body.cPAddress2,
      req.body.cPAddress3,
      req.body.cPAddress4,
      id
    ];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(404).json("Employee not found");
      return res.json("Employee updated successfully");
    });
  });



app.listen(8800, ()=>{
    console.log("Backend server is running!")
})