import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";
import React from "react";
import { IUser, registerUser } from "../../store/API/Authentification";

interface RegisterPageProps {
  onPageStateChange: (newState: string) => void;
  setNotification: (userSaved: any) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onPageStateChange,
  setNotification,
}) => {
  const [form] = Form.useForm();

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
        <Col span={12}>
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/*               <img src={dologo} alt="OKOk" width={500} />
               */}
            </div>
          </>
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
                label="Nom d'utilisateur"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
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
                <Input />
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
                <Input.Password />
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
                <Input.Password />
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
                <Checkbox>J'ai lu et accept les</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Créer un compte
                </Button>
              </Form.Item>
            </div>
          </Form>
          <Row justify="center">
            <Button
              onClick={() => handleStateClick("welcome")}
              style={{
                minWidth: 150,
              }}
            >
              Accueil
            </Button>

            <Button
              onClick={() => handleStateClick("login")}
              style={{
                minWidth: 150,
              }}
            >
              S'identifier
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default RegisterPage;
