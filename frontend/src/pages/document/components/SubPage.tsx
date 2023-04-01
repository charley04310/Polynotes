import { Input, Select, Collapse, Menu } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildTreeMenuData, MenuItem } from "../../../layout/Layout";
import { RootState } from "../../../store/store";
const { Panel } = Collapse;

const { Search } = Input;

interface SubPagePropsBlock {}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const SubPageBlockComponent: React.FC<SubPagePropsBlock> = () => {
  const dispatch = useDispatch();
  const treeData = useSelector((state: RootState) => state.Tree);

  const [pageIsSelected, setpageIsSelected] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setpageIsSelected(true);
  };
  const onChange = (key: string | string[]) => {
    setpageIsSelected(true);
    console.log(key);
  };
  const handleDelete = () => {
    /*     console.log("delete");
    dispatch(
      setBlockContent({
        item: blockState,
        content: "",
      })
    ); */
  };
  const MenuAuthAccess = (): MenuItem[] => {
    return [buildTreeMenuData(treeData)];
  };

  return (
    <>
      {pageIsSelected ? (
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          style={{ width: "100%" }}
        >
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
        </Collapse>
      ) : (
        <Menu
          style={{
            border: "1px solid #8080802e",
            borderRadius: "5px",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          theme="light"
          mode="inline"
          items={MenuAuthAccess()}
        />
      )}
    </>
  );
};

export default SubPageBlockComponent;
