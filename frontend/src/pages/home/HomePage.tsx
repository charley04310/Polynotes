import { Avatar, Card, Divider } from "antd";
import FileExplorer from "./explorer/FileExplorer";
import { Typography } from "antd";
import { getPagesByUserId } from "../../store/API/Page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import "./index.css";
import { truncateTitle } from "./composables/Formater";
import { useNavigate } from "react-router-dom";
import { navigateToDocumentPage } from "./composables/Navigation";
import { RootState } from "../../store/store";
import { IUserState } from "../../store/slices/authSlice";
import EmptyData from "../../global-components/EmptyData";

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const user: IUserState | undefined = useSelector(
    (state: RootState) => state.auth.user
  );

  const [files, setFiles] = useState<any>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const pages = await getPagesByUserId(user.userId);
      setFiles(pages);
    })();
  }, [user, dispatch]);

  return (
    <>
      {user && (
        <Card
          style={{ width: "100%", marginTop: 16, marginBottom: 32 }}
          loading={false}
        >
          <Meta
            style={{ display: "flex", alignItems: "center" }}
            avatar={
              <Avatar style={{ backgroundColor: "#001529", color: "white" }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={user.username.toUpperCase()}
          />
        </Card>
      )}

      <Title level={3}>Documents récents</Title>
      <div className="file-card">
        {files.map((file: any, index: number) => (
          <Card
            key={index}
            className="file-card-icon"
            loading={false}
            onClick={() =>
              navigateToDocumentPage(`/document/${file._id}`, navigate)
            }
          >
            <FileTextOutlined className="file-icon-page" />
            <span style={{ fontSize: 12, color: "grey", paddingTop: 6 }}>
              {truncateTitle(file.title)}
            </span>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <EmptyData message={"Aucun document disponible"} />
      )}
      <Divider />

      <Title level={3}>Explorateur de fichiers</Title>

      <FileExplorer />
    </>
  );
};

export default HomePage;
