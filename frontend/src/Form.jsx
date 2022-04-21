import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import React from "react";
import zxcvbn from "zxcvbn";

export default function Form() {
  const initialValues = {
    username: "",
    phoneno: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [valuesInput, setValuesInput] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [color, setColor] = useState("");

  const changeFunc = (e) => {
    const { name, value } = e.target;
    setValuesInput({ ...valuesInput, [name]: value });
  };

  useEffect(() => {
    switch (zxcvbn(valuesInput.password).score) {
      case 1:
        setColor("red");
        break;
      case 2:
        setColor("yellow");
        break;
      case 3:
        setColor("#019267");
        break;
      default:
        setColor("#019267");
        break;
    }
  }, [valuesInput.password]);

  async function saveName() {
    if (
      valuesInput.password === valuesInput.confirmpassword &&
      valuesInput.phoneno.length === 10 &&
      valuesInput.username.length <= 15 &&
      valuesInput.password.length >= 4
    ) {
      try {
        await axios.post("http://localhost:8000/test", {
          valuesInput,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Error Detected");
    }
  }

  return (
    <div className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveName();
        }}
      >
        <h1>Input Form</h1>
        <div className=" divider"></div>
        <div className=" form">
          <div className="field">
            <label>Username:</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              placeholder="Username"
              value={valuesInput.username}
              onChange={changeFunc}
              required
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Phone No:</label>
            <input
              type="text"
              name="phoneno"
              placeholder="Phone Number"
              value={valuesInput.phoneno}
              autoComplete="off"
              onChange={changeFunc}
              required
            />
          </div>
          <p>{formErrors.phoneno}</p>
          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={valuesInput.email}
              autoComplete="off"
              onChange={changeFunc}
              required
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={valuesInput.password}
              autoComplete="off"
              onChange={changeFunc}
              required
            />
            <div
              className=""
              style={{
                width: "200px",
                height: "6px",
                backgroundColor: "#000",
                borderRadius: "12px",
                position: "relative",
                marginTop: "12px",
                marginLeft: "90px",
              }}
            >
              <div
                className=""
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",

                  width: `${25 * zxcvbn(valuesInput.password).score}%`,
                  backgroundColor: color,
                  height: "6px",
                  borderRadius: "12px",
                  transition: "all .3s ease-out",
                }}
              ></div>
            </div>
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              autoComplete="off"
              value={valuesInput.confirmpassword}
              onChange={changeFunc}
              required
            />
          </div>
          <p>{formErrors.confirmpassword}</p>
          <button className="btn-submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
