import { Button, Card, Row } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/PolyBunny.png";
import "./index.css";

interface WelcomePageProps {
  //   onPageStateChange: (newState: string) => void;
}

const ManifestPage: React.FC<WelcomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <Card
          style={{
            lineHeight: "2rem",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          <img src={logo} alt="PolyBunny" style={{ width: "350px" }} /> <br />
          Welcome to <br />
          <span
            style={{
              fontSize: "2rem",
            }}
          >
            <b>Polynotes App</b>
          </span>
          <br /> a versatile platform Designed to help you <br />{" "}
          <b>organize</b> your life and work efficiently.
        </Card>
        <Row justify="center">
          <Button
            className="start-button"
            onClick={() => navigate("/authentification")}
            style={{
              marginTop: 30,
              minWidth: 150,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            STARTED
          </Button>
        </Row>
      </Card>
    </>
  );
};

export default ManifestPage;
