import { Avatar, Button, Card, Col, Divider, Empty, Row, Tooltip } from "antd";
import FileExplorer from "./explorer/FileExplorer";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { createNewPage, getPageByUserId } from "../../store/API/Page";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import "./index.css";
import { truncateTitle } from "./composables/Formater";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [userState, setUserState] = useState(user);
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      const pages = await getPageByUserId(userState.userId);
      setFiles(pages);
    })();
  }, [userState]);
  return (
    <>
      <Card
        style={{ width: "100%", marginTop: 16, marginBottom: 32 }}
        loading={false}
      >
        <Meta
          avatar={
            <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
              {userState.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={userState.username.toUpperCase()}
        />
      </Card>
      <Title level={3}>Documents récents</Title>
      <div
        className="file-card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 16,
          marginTop: 16,
        }}
      >
        {files.map((file: any, index: number) => (
          <Card
            key={index}
            className="file-card-icon"
            loading={false}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FileTextOutlined
              style={{
                fontSize: 40,
                color: "grey",
                display: "flex",
                justifyContent: "center",
              }}
            />
            <span style={{ fontSize: 12, color: "grey", paddingTop: 6 }}>
              {truncateTitle(file.title)}
            </span>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <span>
              Aucun document disponible <br />
            </span>
          }
        ></Empty>
      )}
      <Divider />

      <Title level={3}>Explorateur de fichiers</Title>

      <FileExplorer />
    </>
  );
};

export default HomePage;
