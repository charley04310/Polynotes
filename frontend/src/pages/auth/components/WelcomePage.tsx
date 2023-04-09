import { Button, Card } from "antd";

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
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          height: "85vh",
        }}
      >
        <Card>
          <Button
            className="start-button"
            onClick={() => handleStateClick("register")}
            style={{
              width: 150,
            }}
          >
            CREATE ACCOUNT
          </Button>

          <Button
            className="start-button"
            onClick={() => handleStateClick("login")}
            style={{
              width: 150,
              marginTop: 15,
            }}
          >
            SIGN IN
          </Button>
        </Card>
      </div>
    </>
  );
};

export default WelcomePage;
