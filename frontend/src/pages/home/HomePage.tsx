import { Avatar, Button, Card, Empty } from "antd";
import FileExplorer from "../../components/explorer/FileExplorer";
import { Typography } from "antd";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
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
        <Button type="primary">Créér un nouveau document</Button>
      </Empty>

      <FileExplorer />
    </>
  );
};

export default HomePage;
