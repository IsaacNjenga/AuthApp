import React, { useContext, useState } from "react";
import "../assets/css/auth.css";
import { Button, Card, Divider, Form, Input, Spin } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
import Swal from "sweetalert2";
import UseFetchUser from "../assets/hooks/useFetchUser";
import { UserContext } from "../App";
import axios from "axios";

const cookies = new Cookie();

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
  username: "",
  phoneNumber: "",
};

const labelStyle = {
  color: "#111827",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "Poppins",
};

function Home() {
  const { userData, userLoading } = UseFetchUser();
  const [values, setValues] = useState(initialValues);
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (userData) {
      setValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        username: userData.username,
        phoneNumber: userData.phoneNumber,
      });
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        username: userData.username,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [userData, form]);

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const allCookies = cookies.getAll();
        for (const cookieName in allCookies) {
          if (allCookies.hasOwnProperty(cookieName)) {
            cookies.remove(cookieName);
          }
        }
        window.location.reload();
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete your profile?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`delete-profile?id=${user}`);
        if (res.data.success) {
          Swal.fire({ icon: "success", text: "Profile successfully deleted" });

          setTimeout(() => {
            const allCookies = cookies.getAll();
            for (const cookieName in allCookies) {
              if (allCookies.hasOwnProperty(cookieName)) {
                cookies.remove(cookieName);
              }
            }
            window.location.reload();
          }, 3000);
        }
      }
    });
  };

  return (
    <div
      className="auth-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 5px",
      }}
    >
      <Card
        style={{
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          maxWidth: 700,
          width: "100%",
          borderRadius: 20,
          padding: 5,
        }}
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              {" "}
              <Button
                type="primary"
                style={{
                  background: "#4f46e5",
                  border: "none",
                  padding: "15px 20px",
                  marginRight: 10,
                  borderRadius: 8,
                }}
                icon={<EditOutlined />}
              >
                <Link to={`/update-profile/${userData._id}`}>Edit Details</Link>
              </Button>
            </div>
            <div>
              {" "}
              <Button
                danger
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "15px 20px",
                  borderRadius: 8,
                }}
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        }
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
            Your Profile Details
          </div>
        </Divider>
        {userLoading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Form layout="vertical" initialValues={values} form={form}>
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
                <Input value={values.firstName} style={inputStyle} readOnly />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Last Name</span>}
                name="lastName"
              >
                <Input value={values.lastName} style={inputStyle} readOnly />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Username</span>}
                name="username"
              >
                <Input value={values.username} style={inputStyle} readOnly />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Email Address</span>}
                name="email"
              >
                <Input value={values.email} style={inputStyle} readOnly />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Phone Number</span>}
                name="phoneNumber"
              >
                <Input value={values.phoneNumber} style={inputStyle} readOnly />
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
              <Button
                style={{
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  padding: "15px 20px",
                  borderRadius: 8,
                }}
                icon={<PoweroffOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}

export default Home;
