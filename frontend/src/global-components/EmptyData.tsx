import { Empty } from "antd";
interface IPropsEmptyData {
  message: string;
}

const EmptyData: React.FC<IPropsEmptyData> = ({ message }) => {
  return (
    <Empty
      style={{ marginTop: 32 }}
      imageStyle={{ height: 60 }}
      description={<span>{message}</span>}
    ></Empty>
  );
};

export default EmptyData;
