import React from "react";
import { Button, Card, Divider, Form, Input, Row } from "antd";
import { ILoginUser, loginUser } from "../../../store/API/Authentification";
import { useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../../../assets/img/PolyBunny.png";
interface LoginPageProps {
  onPageStateChange: (newState: string) => void;
  setNotification: (userSaved: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onPageStateChange,
  setNotification,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };
  const handleStateClick = (value: string) => {
    onPageStateChange(value);
  };

  const onFinish = async (values: ILoginUser) => {
    const { email, password } = values;

    const user = {
      email: email,
      password: password,
    };

    const userLoginResponse = await loginUser(user);
    setNotification(userLoginResponse);
    if (userLoginResponse !== undefined) {
      navigate("/home");
    }
  };

  return (
    <>
      <Card>
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
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: false }]}
              style={{ color: "#1e1e1e" }}
            >
              <Input className="input-form" placeholder="Your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: false }]}
              style={{ color: "#1e1e1e" }}
            >
              <Input.Password
                className="input-form"
                placeholder="Your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="start-button"
                style={{ backgroundColor: "#57cd7c", color: "white" }}
                htmlType="submit"
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <Divider style={{ backgroundColor: "#516d91" }} />
          <Row justify="center">
            <Button
              className="start-button"
              onClick={() => handleStateClick("register")}
              style={{
                minWidth: 150,
                marginRight: 5,
              }}
            >
              REGISTER
            </Button>

            <Button
              className="start-button"
              onClick={() => handleStateClick("welcome")}
              style={{
                minWidth: 150,
                marginLeft: 5,
              }}
            >
              HOME
            </Button>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default LoginPage;
