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

import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import Meta from "antd/es/card/Meta";
import { updDateTitlePage } from "../../../store/API/Page";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface TitleDocumentProps {}
const EditableContext = React.createContext<FormInstance<any> | null>(null);
//const [form] = Form.useForm();

const TitleDocumentPage: React.FC<TitleDocumentProps> = () => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const param = useParams();
  const titleStoreDocument: string = useSelector(
    (state: RootState) => state.blocks.title
  );
  const [titleStateDocument, setTitleDocument] = useState(titleStoreDocument);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  useEffect(() => {
    setTitleDocument(titleStoreDocument);
  }, [titleStoreDocument]);

  const save = async () => {
    const values = await form.validateFields();
    if (!values.page_title) return;
    // console.log("values :", values);
    if (!param.id) return;
    await updDateTitlePage(param.id, values.page_title);
    setTitleDocument(values.page_title);
    setEditing(!editing);
  };

  const toggleEdit = () => {
    form.setFieldValue("page_title", titleStateDocument);
    setEditing(!editing);
  };
  const [form] = Form.useForm();

  return (
    <>
      <div
        className="editable-cell-value-wrap"
        style={{
          position: "absolute",
          right: 50,
          zIndex: 1,
        }}
      >
        {editing ? (
          <Card
            style={{ width: 240, marginTop: 0, padding: 0 }}
            loading={false}
          >
            <Form
              form={form}
              name="horizontal_login"
              component={false}
              layout="inline"
              style={{ position: "relative", top: 5 }}
            >
              <EditableContext.Provider value={form}>
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
              </EditableContext.Provider>
            </Form>
          </Card>
        ) : (
          <Card
            onClick={toggleEdit}
            style={{ width: 240, marginTop: 0, padding: 0 }}
            loading={false}
          >
            <Meta
              avatar={<FileTextOutlined />}
              description={titleStateDocument}
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default TitleDocumentPage;
