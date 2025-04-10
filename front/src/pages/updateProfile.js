import React, {  useState } from "react";
import "../assets/css/auth.css";
import { Button, Card, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";

const inputStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  height: 40,
  fontSize: 14,
  color: "#333",
  fontFamily: "Poppins",
  borderRadius: 8,
  paddingLeft: 10,
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  username: "",
  phoneNumber: "",
};

const labelStyle = {
  color: "#111827",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Poppins",
};

function UpdateProfile() {
  const [values, setValues] = useState(initialValues);

  return (
    <div
      className="auth-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        style={{
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: 700,
          width: "100%",
          borderRadius: 20,
          padding: 22,
        }}
      >
        <Divider style={{ borderColor: "#4f46e5" }}>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: "30px",
              background: "#eef2ff",
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: 22,
              color: "#4f46e5",
            }}
          >
            Edit Your Profile 
          </div>
        </Divider>

        <Form layout="vertical" initialValues={initialValues}>
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            <Form.Item
              label={<span style={labelStyle}>First Name</span>}
              name="firstName"
            >
              <Input value={values.firstName} style={inputStyle} />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Last Name</span>}
              name="lastName"
            >
              <Input value={values.lastName} style={inputStyle} />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Username</span>}
              name="username"
            >
              <Input value={values.username} style={inputStyle} />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Email Address</span>}
              name="email"
            >
              <Input value={values.email} style={inputStyle} />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Phone Number</span>}
              name="phoneNumber"
            >
              <Input value={values.phoneNumber} style={inputStyle} />
            </Form.Item>
          </div>

          <Divider style={{ borderColor: "#4f46e5" }}>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 22,
                color: "#4f46e5",
              }}
            />
          </Divider>
          <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <Button
                style={{
                  background: "green",
                  color: "#fff",
                  border: "none",
                  padding: "15px 20px",
                  borderRadius: 8,
                }}
              >
                Update
              </Button>
              <Button
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "15px 20px",
                  borderRadius: 8,
                }}
              >
                <Link to="/">Cancel</Link>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateProfile;
