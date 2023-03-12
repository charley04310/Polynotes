import { RightCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Space, Image, Button } from "antd";
import { useDispatch } from "react-redux";
import { setBlockContent } from "../../../store/slices/blockSlice";
import { BlockState } from "../interfaces/documents";

const { Search } = Input;

interface ImagePropsBlock {
  blockState: BlockState;
  imageUrl: string;
}

const ImageBlockComponent: React.FC<ImagePropsBlock> = ({
  imageUrl,
  blockState,
}) => {
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    dispatch(
      setBlockContent({
        item: blockState,
        content: value,
      })
    );
  };

  const handleDelete = () => {
    console.log("delete");
    dispatch(
      setBlockContent({
        item: blockState,
        content: "",
      })
    );
  };

  return (
    <Space direction="vertical">
      {imageUrl === "" ? (
        <Search
          placeholder="Votre URL"
          enterButton={<RightCircleOutlined />}
          onSearch={(value) => handleSearch(value)}
        />
      ) : (
        <>
          <Image width={500} src={imageUrl} />
          <Button
            type="link"
            shape="default"
            className="deleteImageButton"
            icon={<DeleteOutlined style={{ fontSize: "20px" }} />}
            size={"large"}
            onClick={() => handleDelete()}
          />
        </>
      )}
    </Space>
  );
};

export default ImageBlockComponent;
