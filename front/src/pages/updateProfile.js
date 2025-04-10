import React, { useState } from "react";
import "../assets/css/auth.css";
import { Button, Card, Divider, Form, Input, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseFetchUser from "../assets/hooks/useFetchUser";
import Swal from "sweetalert2";
import axios from "axios";

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

function UpdateProfile() {
  const { userData, userLoading } = UseFetchUser();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axios.put(`update-profile/${id}`, values);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

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

        {userLoading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Form
            layout="vertical"
            initialValues={values}
            form={form}
            onFinish={handleSubmit}
          >
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
                <Input
                  value={values.firstName}
                  style={inputStyle}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Last Name</span>}
                name="lastName"
              >
                <Input
                  value={values.lastName}
                  style={inputStyle}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Username</span>}
                name="username"
              >
                <Input
                  value={values.username}
                  style={inputStyle}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Email Address</span>}
                name="email"
              >
                <Input
                  value={values.email}
                  style={inputStyle}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={<span style={labelStyle}>Phone Number</span>}
                name="phoneNumber"
              >
                <Input
                  value={values.phoneNumber}
                  style={inputStyle}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
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
                  htmlType="submit"
                  loading={loading}
                  style={{
                    background: "green",
                    color: "#fff",
                    border: "none",
                    padding: "15px 20px",
                    borderRadius: 8,
                  }}
                >
                  {loading ? "Updating" : "Update"}
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
        )}
      </Card>
    </div>
  );
}

export default UpdateProfile;
