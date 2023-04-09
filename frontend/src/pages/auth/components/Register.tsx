import { Button, Card, Checkbox, Divider, Form, Input } from "antd";
import { Row } from "antd";
import React from "react";
import { IUser, registerUser } from "../../../store/API/Authentification";
import logo from "../../../assets/img/PolyBunny.png";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  onPageStateChange: (newState: string) => void;
  setNotification: (userSaved: any) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onPageStateChange,
  setNotification,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: IUser) => {
    const { username, email, password } = values;
    const user: IUser = {
      username: username,
      email: email,
      password: password,
    };
    const userSaved = await registerUser(user);
    setNotification(userSaved);
  };

  const onFinishFailed = (values: any) => {
    // console.log("Received values of form: ", values);
  };

  const handleStateClick = (value: string) => {
    onPageStateChange(value);
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Card style={{ width: 600, margin: "auto" }}>
          <Row justify="center">
            <img src={logo} alt="PolyBunny" style={{ width: "200px" }} />
          </Row>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Form.Item
                name="username"
                label="Username"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="input-form" />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input className="input-form" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password className="input-form" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="input-form" />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I have read and I accept {""}
                  <Button
                    type="link"
                    onClick={() => {
                      navigate("/terms");
                      <Button
                        type="link"
                        onClick={() => {
                          navigate("/terms");
                        }}
                        style={{ padding: 0, height: 0 }}
                      >
                        all conditions
                      </Button>;
                    }}
                    style={{ padding: 0 }}
                  >
                    all conditions
                  </Button>
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="older"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>I'm older than 13 years old</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  className="start-button"
                  style={{ backgroundColor: "#57cd7c", color: "white" }}
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </div>
          </Form>
          <Divider style={{ backgroundColor: "#516d91" }} />
          <Row justify="center">
            <Button
              className="start-button"
              onClick={() => handleStateClick("welcome")}
              style={{
                minWidth: 150,
                marginRight: 5,
              }}
            >
              HOME
            </Button>

            <Button
              className="start-button"
              onClick={() => handleStateClick("login")}
              style={{
                minWidth: 150,
                marginLeft: 5,
              }}
            >
              SIGN IN
            </Button>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default RegisterPage;
