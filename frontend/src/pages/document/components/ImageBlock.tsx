import { RightCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Space, Image, Button } from "antd";
import { useDispatch } from "react-redux";
import { setBlockContent } from "../../../store/slices/blockSlice";
import { IContentBlock } from "../../../store/interfaces/block";

const { Search } = Input;

interface ImagePropsBlock {
  blockState: IContentBlock;
  isEditable: boolean;
  imageUrl: string;
}

const ImageBlockComponent: React.FC<ImagePropsBlock> = ({
  imageUrl,
  isEditable,
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
          <div className="imageBlock">
            <Image width={"100%"} src={imageUrl} />
            <div className="deleteImageButton">
              {isEditable && (
                <Button
                  type="link"
                  shape="default"
                  icon={
                    <DeleteOutlined
                      style={{ fontSize: "15px", color: "white" }}
                    />
                  }
                  size={"large"}
                  onClick={() => handleDelete()}
                />
              )}
            </div>
          </div>
        </>
      )}
    </Space>
  );
};

export default ImageBlockComponent;
