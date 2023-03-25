import { Avatar, Button, Card, Divider, Empty } from "antd";
import FileExplorer from "./explorer/FileExplorer";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { createNewPage, getPageByUserId } from "../../store/API/Page";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import "./index.css";
import { truncateTitle } from "./composables/Formater";
import { treeData } from "./utils/DataPayload";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [userState, setUserState] = useState(user);
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  useEffect(() => {
    (async () => {
      const pages = await getPageByUserId(userState.userId);
      console.log(pages);
      setFiles(pages);
    })();
  }, [userState]);

  const setNewDocumentPage = async () => {
    const page = await createNewPage(userState.userId);
    if (page.pageId === undefined) return;
    console.log(page.pageId);
    navigate(`/document/${page.pageId}`);
  };
  return (
    <>
      <Card
        style={{ width: "100%", marginTop: 16, marginBottom: 32 }}
        loading={false}
      >
        <Meta
          avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
          title={userState.username}
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
      <Button
        type="primary"
        onClick={setNewDocumentPage}
        style={{ marginRight: 8 }}
      >
        Créer une noveau Document
      </Button>
      {files.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <span>
              Aucun document disponible <br />
            </span>
          }
        >
          <Button type="primary" onClick={setNewDocumentPage}>
            Créer une noveau Document
          </Button>
        </Empty>
      )}
      <Divider />

      <Title level={3}>Explorateur de fichiers</Title>

      <FileExplorer treeData={treeData} />
    </>
  );
};

export default HomePage;
