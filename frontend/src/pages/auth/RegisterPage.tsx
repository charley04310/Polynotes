import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row } from "antd";
import dologo from "./dologo.svg";
interface RegisterPageProps {
  onPageStateChange: (newState: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onPageStateChange }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const onFinishFailed = (values: any) => {
    console.log("Received values of form: ", values);
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Form.Item
              name="nickname"
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
              <Checkbox>
                J'ai lu et accept les
                <a href="">conditions g??n??rales d'utilisation</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cr??er un compte
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
            Acceuil
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
  );
};

export default RegisterPage;
