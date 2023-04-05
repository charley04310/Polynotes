import { Card } from "antd";
import { Typography } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { navigateToDocumentPage } from "../composables/Navigation";
import { truncateTitle } from "../composables/Formater";

const { Title } = Typography;

interface IRecentsFilesProps {
  files: {
    _id: string;
    title: string;
  }[];
}
const RecentsFiles: React.FC<IRecentsFilesProps> = ({ files }) => {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
};

export default RecentsFiles;
