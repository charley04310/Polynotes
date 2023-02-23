import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";
import dologo from "./dologo.svg";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
interface LoginPageProps {
  onPageStateChange: (newState: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onPageStateChange }) => {
  const [form] = Form.useForm();

  const handleStateClick = (value: string) => {
    onPageStateChange(value);
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
            <img src={dologo} alt="OKOk" width={500} />
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
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
