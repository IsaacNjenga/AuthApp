import axios from "axios";
import React, { useContext, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Drawer,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import "../assets/css/auth.css";
import { UserContext } from "../App";
import ChangePassword from "../components/changePassword";

const cookies = new Cookies();
const { Title, Text } = Typography;
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  username: "",
  phoneNumber: "",
};

const inputStyle = {
  background: 0,
  border: "1px solid white",
  height: 40,
  fontSize: 14,
  color: "white",
  fontFamily: "Roboto",
};
function Auth() {
  const [form] = Form.useForm();
  const { isMobile } = useContext(UserContext);
  const [values, setValues] = useState(initialValues);
  const [isSignUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(null);
  };

  const switchMode = () => {
    setSignUp((prev) => !prev);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(values);
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
      form.resetFields();
      setValues(initialValues);
    }
  };

  return (
    <>
      <div className="auth-bg">
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "60%",
              padding: "0px 10px",
              margin: "0px 10px",
              background: "rgba(255, 255, 255, 0.38)",
              borderRadius: "25px",
              maxWidth: isMobile ? "400px" : "650px",
              textAlign: "left",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Title
              level={1}
              style={{
                fontFamily: "Raleway",
                color: "#333",
                fontSize: isMobile ? "1.8rem" : "3.5rem",
                fontWeight: "600",
                letterSpacing: isMobile ? "0px" : "2px",
              }}
            >
              {isSignUp ? "Create Your Free Account" : "Welcome Back"}
            </Title>
            <Title
              level={2}
              style={{
                fontFamily: "Roboto",
                color: "#333",
                fontSize: isMobile ? "1.4rem" : "2rem",
                marginBottom: 0,
              }}
            >
              {isSignUp
                ? "Become a part of our community today! "
                : "We're thrilled to have you back!"}
            </Title>
            <Text
              style={{
                fontFamily: "Roboto",
                color: "#333",
                fontSize: isMobile ? "1rem" : "1.5rem",
                marginTop: 0,
              }}
            >
              {isSignUp
                ? "Create your account in just a few simple steps"
                : "Access your account to continue."}
            </Text>
          </div>
          <div
            style={{
              flex: isMobile ? "none" : 1,
              width: isMobile ? "100%" : "40%",
              margin: 0,
            }}
          >
            <Card
              style={{
                background:
                  "linear-gradient(to bottom, #e5c499 5%, #e2c9ab 90%)",
                maxWidth: 650,
                margin: isSignUp ? "15px auto" : "125px auto",
                height: "auto",
                width: "100%",
              }}
              className="card"
            >
              <Divider variant="solid" style={{ borderColor: "#fff" }}>
                <div
                  style={{
                    margin: "1px auto",
                    padding: "1px 5px",
                    borderRadius: "15px",
                    fontFamily: "Raleway",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 20 }}>
                    {isSignUp
                      ? "Create your account"
                      : "Log in to your account"}
                  </span>
                </div>
              </Divider>
              <Form onFinish={handleSubmit} layout="vertical" form={form}>
                {isSignUp && (
                  <div>
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* First Name */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            First Name
                          </span>
                        }
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.firstName}
                          onChange={(e) =>
                            handleChange("firstName", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Last Name */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Last Name
                          </span>
                        }
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.firstName}
                          onChange={(e) =>
                            handleChange("lastName", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>{" "}
                    </div>{" "}
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* Username */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Username
                          </span>
                        }
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Email Address */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Email Address
                          </span>
                        }
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Phone Number */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Phone Number
                          </span>
                        }
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          value={values.phoneNumber}
                          onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gap: "10px",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px,1fr))",
                      }}
                    >
                      {/* Password */}
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Password
                          </span>
                        }
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input.Password
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone style={{ color: "white" }} />
                            ) : (
                              <EyeInvisibleOutlined
                                style={{ color: "white" }}
                              />
                            )
                          }
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          value={values.password}
                          style={inputStyle}
                        />
                      </Form.Item>
                      {/* Confirm Password */}

                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            Re-enter password
                          </span>
                        }
                        name="confirmPassword"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          iconRender={(visible) =>
                            visible ? (
                              <EyeTwoTone style={{ color: "white" }} />
                            ) : (
                              <EyeInvisibleOutlined
                                style={{ color: "white" }}
                              />
                            )
                          }
                          style={inputStyle}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}

                {!isSignUp && (
                  <>
                    {/* Username */}
                    <Form.Item
                      label={
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Roboto",
                          }}
                        >
                          Username
                        </span>
                      }
                      name="username"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <Input
                        value={values.username}
                        onChange={(e) =>
                          handleChange("username", e.target.value)
                        }
                        style={inputStyle}
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Roboto",
                          }}
                        >
                          Password
                        </span>
                      }
                      name="password"
                      rules={[
                        { required: true, message: "This field is required" },
                      ]}
                    >
                      <Input.Password
                        iconRender={(visible) =>
                          visible ? (
                            <EyeTwoTone style={{ color: "white" }} />
                          ) : (
                            <EyeInvisibleOutlined style={{ color: "white" }} />
                          )
                        }
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        value={values.password}
                        style={inputStyle}
                      />
                    </Form.Item>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ color: "white", fontFamily: "Roboto" }}>
                      {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                      <span
                        onClick={switchMode}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {isSignUp ? "Sign in" : "Sign up"}
                      </span>
                    </p>
                  </div>
                  <div style={{ display: isSignUp ? "none" : "block" }}>
                    <p
                      style={{
                        color: "white",
                        fontFamily: "Roboto",
                        cursor: "pointer",
                      }}
                      onClick={showDrawer}
                    >
                      Forgot password?
                    </p>{" "}
                    <Drawer
                      title="Change your password"
                      width={600}
                      onClose={closeDrawer}
                      open={open}
                      styles={{ body: { paddingBottom: 60 } }}
                      extra={
                        <Space>
                          <Button onClick={closeDrawer}>Cancel</Button>
                        </Space>
                      }
                    >
                      <ChangePassword setOpen={setOpen} />
                    </Drawer>
                  </div>
                </div>
                {/* Submission button */}
                <Form.Item
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    style={{
                      background: "rgb(0,0,0,0)",
                      border: "2px solid white",
                      height: 40,
                      fontSize: 14,
                      fontWeight: "bold",
                      width: "50%",
                      fontFamily: "Raleway",
                    }}
                  >
                    {loading
                      ? isSignUp
                        ? "Signing Up"
                        : "Signing In"
                      : isSignUp
                      ? "Sign Up"
                      : "Sign In"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
