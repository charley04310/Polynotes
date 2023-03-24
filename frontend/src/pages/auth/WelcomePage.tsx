import { Button, Row } from "antd";

interface WelcomePageProps {
  onPageStateChange: (newState: string) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onPageStateChange }) => {
  const handleStateClick = (value: string) => {
    onPageStateChange(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/*   <img src={dologo} alt="OKOk" width={"50%"} /> */}
      </div>
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
          onClick={() => handleStateClick("login")}
          style={{
            minWidth: 150,
          }}
        >
          S'identifier
        </Button>
      </Row>
    </>
  );
};

export default WelcomePage;
