import { Avatar, Button, Card, Empty } from "antd";
import FileExplorer from "../../modules/explorer/FileExplorer";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { createNewPage } from "../../store/API/Page";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    setUserState(user);
  }, [user]);

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
          title="Charley"
          description="This is the description"
        />
      </Card>
      <Title level={3}>Documents récents</Title>
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

      <FileExplorer />
    </>
  );
};

export default HomePage;
