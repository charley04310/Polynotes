import { Divider } from "antd";
import FileExplorer from "./components/FileExplorer";
import { Typography } from "antd";
import { getPagesByUserId } from "../../store/API/Page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./index.css";
import { RootState } from "../../store/store";
import { IUserState } from "../../store/slices/authSlice";
import EmptyData from "../../global-components/EmptyData";
import RecentsFiles from "./components/RecentsFiles";
import UserCard from "./components/UserCard";

const { Title } = Typography;

const HomePage = () => {
  const user: IUserState | undefined = useSelector(
    (state: RootState) => state.auth.user
  );

  const treeData = useSelector((state: RootState) => state.Tree);
  const [files, setFiles] = useState<any>([]);

  //const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const pages = await getPagesByUserId(user.userId);
      setFiles(pages);
    })();
  }, [user, treeData, dispatch]);

  return (
    <>
      {user && <UserCard user={user} />}

      <RecentsFiles files={files} />

      {files.length === 0 && <EmptyData message={"No data available"} />}
      <Divider />

      <Title level={3}>Files Explorer</Title>

      <FileExplorer treeData={treeData} userId={user?.userId} />
    </>
  );
};

export default HomePage;
