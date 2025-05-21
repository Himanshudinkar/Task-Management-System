import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "../css/Pass.css"

const ChangePassword = () => {
    const [input, setInput] = useState({});
    const [empid, setEmpid] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setEmpid(localStorage.getItem("empid"))
    }, []);

    const handelInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(values => ({ ...values, [name]: value }))
    }

    const handelSubmit = async () => {
        try {
            let api = "http://localhost:8080/employee/changepassword";
            const response = await axios.post(api, { empid: empid, ...input });
            message.success("Password successfully changed!");
            console.log(response.data);
            navigate("/empdashboard");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="passwordChange">
                <input
                    type="password"
                    placeholder="Old password"
                    name="oldpassword"
                    onChange={handelInput}
                />
                <input
                    type="password"
                    placeholder="New password"
                    name="newpassword"
                    onChange={handelInput}
                />
                <Button onClick={handelSubmit}>Submit</Button>
            </div>
        </>
    )
}

export default ChangePassword;
