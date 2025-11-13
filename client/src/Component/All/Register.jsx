
import React, { useEffect, useState,useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import Axios from "axios";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';


const Register = () => {
    const [userName, setUserName] = useState('');
    const [password, setPssword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [rol, setRol] = useState('user');
    const [active, setActive] = useState(true);
    const [checked, setChecked] = useState(false);
      const toastTopRight = useRef(null);
  
       const showMessage = (e, ref, severity) => {
         let massege = '';
        if(e===404)
            massege='שם משתמש כפול'
        if(e===401)
            massege='שם משתמש, סיסמא ושם הם שדות חובה'
        if(e===402)
            massege='המייל אינו חוקי'
        ref.current.show({ severity: severity, detail:massege, life: 3000 });
    };

    const checkMail = (mail) => {
        if ((mail.indexOf('@') === -1 || mail.indexOf('.') === -1 || mail.indexOf('.') <= mail.indexOf('@') + 1 || mail.indexOf('@') === 0) && mail!=="")
            return false;
        return true;
    }


    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()

        const correct = checkMail(email)
        if (!correct) {
            showMessage(402, toastTopRight, 'info') 
            return
        }

        try {
            const {data}=await Axios.post("http://localhost:44444/api/user/re",{username:userName,password,name,email,phone,roles:rol})
            console.log(data)
            navigate("/all/login")
        } catch (e) {
            showMessage(e.status, toastTopRight, 'info')      
        }
    }

    return (
        <>
             <Toast ref={toastTopRight} position="top-right" />
            <div className="login" style={{ Height: "90vh", display: "flex", justifyContent: "end", alignItems: "start", padding: "10%",paddingTop:"3%" }}>
                <div className="card" style={{ border: "3px solid #cdb69eff ", display: "flex", justifyContent: "center", alignItems: "start", width: "30%", backgroundColor: "#fbf4ec  " }}>
                    {/* <div className="flex flex-column md:flex-row"> */}
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label style={{ color: "#af9982ff" }} className="w-6rem">Username</label>
                            <InputText style={{ backgroundColor: "#e7cfb5ff", boxShadow: "2px 2px 10px #e7cfb5ff" }} id="username" type="text" className="w-12rem" onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label style={{ color: "#af9982ff" }} className="w-6rem">Name</label>
                            <InputText style={{ backgroundColor: "#e7cfb5ff", boxShadow: "2px 2px 10px #e7cfb5ff" }} id="name" type="text" className="w-12rem" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label style={{ color: "#af9982ff" }} className="w-6rem">Password</label>
                            <InputText style={{ backgroundColor: "#e7cfb5ff", boxShadow: "2px 2px 10px #e7cfb5ff" }} id="password" type="password" className="w-12rem" onChange={(e) => setPssword(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label style={{ color: "#af9982ff" }} className="w-6rem">Phone</label>
                            <InputText style={{ backgroundColor: "#e7cfb5ff", boxShadow: "2px 2px 10px #e7cfb5ff" }} id="phone" type="text" className="w-12rem" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label style={{ color: "#af9982ff" }} className="w-6rem">Email</label>
                            <InputText style={{ backgroundColor: "#e7cfb5ff", boxShadow: "2px 2px 10px #e7cfb5ff" }} id="email" type="text" className="w-12rem" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="card flex justify-content-center" style={{backgroundColor:"#fbf4ec",color:"#af9982ff",display:"flex",flexDirection:"row"}}>
                            <div className="flex flex-wrap gap-3"style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"2rem"}}>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="role1" name="role" value="user" onChange={(e) => setRol(e.value)} checked={rol === 'user'} />
                                    <label htmlFor="role1" style={{ marginInlineStart: "0.5rem" }}>user</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="role2" name="rol" value="admin" onChange={(e) => setRol(e.value)} checked={rol === 'admin'} />
                                    <label htmlFor="role2" style={{ marginInlineStart: "0.5rem" }} >admin</label>
                                </div>
                            </div>
                        </div>
                        <Button label="Register" className="w-10rem mx-auto" style={{ backgroundColor: "#cdb69eff", color: "#af9982ff" }} onClick={(e) => { submitForm(e) }}></Button>
                    </div>
                </div>    </div>
        </>
    )
}

export default Register

