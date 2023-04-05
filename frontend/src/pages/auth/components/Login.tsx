import React from "react";
import { Button, Form, Input } from "antd";
import { Col, Row } from "antd";
import dologo from "./dologo.svg";
import { ILoginUser, loginUser } from "../../../store/API/Authentification";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onPageStateChange: (newState: string) => void;
  setNotification: (userSaved: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onPageStateChange,
  setNotification,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

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
    if(userLoginResponse !== undefined){
      navigate('/accueil')
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={12}>
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <img src={dologo} alt="OKOk" width={500} /> */}
          </div>
        </>
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
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ color: "#1e1e1e" }}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ color: "#1e1e1e" }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" style={{ background: "#49aa19" }}>
              SE CONNECTER
            </Button>
          </Form.Item>
        </Form>
        <Row justify="center">
          <Button
            onClick={() => handleStateClick("register")}
            style={{
              minWidth: 150,
            }}
          >
            Créer un compte
          </Button>

          <Button
            onClick={() => handleStateClick("welcome")}
            style={{
              minWidth: 150,
            }}
          >
            Acceuill
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;
