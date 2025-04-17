import React,{useState, useRef, useEffect, useContext} from "react";
import CustomSelect from "../../../components/input/Select"
import projectContext from "../../../context/project/projectContext";
import EmployeeCard from "../../../features/component/employee-card/EmployeeCard";
import options from "../../data"
import Input from "../../../components/input/Input";
import "./_employee.scss";
import Navigator from "../../../features/component/navigator/Navigator";

const Employee = () => {
  const refClose = useRef();
  const context = useContext(projectContext);
  const { employees, getAllEmployeeDetails } = context;


  function calculateAge(dobString) {

    const dob = new Date(dobString);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    }
  
    return age;
  }
  

  


  useEffect(() => {
    getAllEmployeeDetails();
  }, []);


  
    const [employee, setemployee] = useState({
        name:"",
        mobile:"",
        email:"",
        password:"",
        passwordConfirmation:"",
        dob:"",
        doj:"",
        ad:"",
        role:"",
        address:"",
        pincode:"",
        city:"",
        code:"",
        gender:"Male",
        emp_type:"",
        salary:""

    })

  const { password,
    passwordConfirmation,
    name,
    mobile,
    email,
    dob,
    doj,
    ad,
    role,
    address,
    pincode,
    city,
    skillset,
    code,
    gender,
    salary,
    dept
   } = employee;


  const onChange = (e)=>{
    setemployee({...employee, [e.target.name]: e.target.value})
  }

  const addEmployeeFields = {
    name:{
      id: "name",
      label: "Name",   
      required: true,
      type: "text",
      
    },
    mobile:{
      id: "mobile",
      label: "Phone Number",
      required: true,
      type: "tel",
      
    },
    email: {
      id: "email",
      label: "Email Id",
      required: true,
      type: "email",
      
    },
    password: {
      id: "password",
      label: "Password",
      required: true,
      type: "password",
      
    },
    passwordConfirmation: {
      id: "passwordConfirmation",
      label: "Confirm your Password",
      required: true,
      type: "password",
      
    },
    dob:{
      id: "dob",
      label: "Date Of Birth",
      required: true,
      type: "date",
      
    },
   doj: {
      id: "doj",
      label: "Joining Date",
      required: true,
      type: "date",
      
    },
    ad:{
      id: "ad",
      label: "Aniversary Date",
      required: false,
      type: "date",
      
    },
    address:{
      id: "address",
      label: "Street",
      required: true,
      type: "text",
      
    },
    pincode:{
      id: "pincode",
      label: "Pincode",
      required: true,
      type: "number",
      
    },
    city:{
      id: "city",
      label: "City",
      required: true,
      type: "text",
      
    },
    // skillset: [
    //   {
    //     type: Array,
    //     default: [],
    //   },
    // ],
    code:{
      id: "code",
      label: "Code",
      required: true,
      type: "text",
      
    },
    employee_type:{
      id: "employee_type",
      label: "Employee Type",
      required: true,
      type: "text",
      
    },
    role:{
      id: "role",
      label: "Role",
      required: true,
      type: "text",
    },
    salary:{
      id: "salary",
      label: "Salary",
      required: true,
      type: "number",
      
    },
    // dept:{
    //   id: "salary",
    //   label: "Salary",
    //   type: "number"
    // },
  };

  const onClickSignUp = async (e) => {
    e.preventDefault();
    console.log(            password,
      passwordConfirmation,
      name,
      mobile,
      email,
      dob,
      doj,
      ad,
      role,
      address,
      pincode,
      city,
      code,
      gender,
      salary
      )
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json",       
       'Access-Control-Allow-Origin':'*',
      "auth-token": localStorage.getItem("token"), },
      body: JSON.stringify({ 
            password,
            passwordConfirmation,
            name,
            mobile,
            email,
            dob,
            doj,
            ad,
            role,
            address,
            pincode,
            city,
            code,
            gender,
            salary
         }),
    });
    const data = await res.json();
    
  };

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const dashboardWidth = viewportWidth < 1000 ? '100%' : '80%';
  const dashboardMargin = viewportWidth < 1000 ? '0%' : '10%';
  
  let dashboardStyle ={
   width: dashboardWidth,
   marginLeft: dashboardMargin
  }


  return (
    <div className="employee-section" style={dashboardStyle}>
      <h1>Employees</h1><hr/><br/>
      <button type="button" class="btn btn-primary add-employee" data-bs-toggle="modal" data-bs-target="#addEmployee">Add New Employee</button>
      <div class="employee-modal modal fade" id="addEmployee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content employee-dialog">
      <div class="modal-header border-0">
        <h5 class="modal-title">Add Employee</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form className="addEmployee">
        <div className="row">
        {Object.keys(addEmployeeFields).map((key) => (
            <Input
              wd="col-md-6"
              label={addEmployeeFields[key].label}
              type={addEmployeeFields[key].type}
              id={addEmployeeFields[key].id}
              value={employee[key]}
              onChange={onChange}
              require={addEmployeeFields[key].required}
            />
        ))}
        </div>
      </form>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={onClickSignUp}>Save changes</button>
      </div>
    </div>
  </div>
  </div>
      <br/><br/><div className="total-employee">Total Employee: 150</div>
      <hr/>
      <div className="employee-lists d-flex flex-column">
        {employees && employees.map((employee)=>{
          return(
          <EmployeeCard
          _id={employee._id}
          dob={employee.dob}
          doj={employee.doj}
          ad={employee.ad}
          role={employee.role}
          address={employee.address}
          pincode={employee.pincode}
          city={employee.city}
          gender={employee.gender}
          img={require("../../../res/image/img1.jpg")}
          name={employee.name}
          age={calculateAge(employee.dob)}
          email={employee.email}
          mobile={employee.mobile}
          salary={employee.salary}
          />)
        })}       
      </div>
      <Navigator/>
    </div>
  );
};

export default Employee;
