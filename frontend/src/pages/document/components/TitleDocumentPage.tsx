import {
  Input,
  Form,
  InputRef,
  FormInstance,
  Switch,
  Card,
  Avatar,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";

import { useContext, useRef, useState } from "react";
import React from "react";
import Meta from "antd/es/card/Meta";

interface TitleDocumentProps {}
const EditableContext = React.createContext<FormInstance<any> | null>(null);

const TitleDocumentPage: React.FC<TitleDocumentProps> = () => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [titleDocument, setTitleDocument] = useState("Nom de votre document");
  //const form = useContext(EditableContext)!;

  // const dispatch = useDispatch();

  const save = async () => {
    setEditing(!editing);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  return (
    <>
      <div
        className="editable-cell-value-wrap"
        style={{
          position: "absolute",
          right: 50,
          zIndex: 1,
        }}
        onClick={toggleEdit}
      >
        <Card
          onClick={toggleEdit}
          style={{ width: 240, marginTop: 0, padding: 0 }}
          loading={false}
        >
          {editing ? (
            <Form.Item
              style={{ margin: 0, padding: 0 }}
              name="page_title"
              rules={[
                {
                  required: true,
                  message: `titre est nécéssaire.`,
                },
              ]}
            >
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
          ) : (
            <Meta avatar={<FileTextOutlined />} description={titleDocument} />
          )}
        </Card>
      </div>
    </>
  );
};

export default TitleDocumentPage;
