import React, { useEffect, useState } from "react";
import {
  UnorderedListOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  FieldNumberOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setNewColumn, setNewTypeBlock } from "../../store/slices/blockSlice";
import { typeIndex } from "../interfaces/database";
import { BlockType } from "../../store/interfaces/block";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { updatePageContent } from "../../store/API/Page";

const { Option } = Select;
interface AddColumnDataBaseProps {
  blockIndex: number;
}

export interface NewColumnType {
  index: number;
  title: string;
  typeIndex: typeIndex;
}

export interface INewTypeBlock {
  index: number;
  type: string;
}

const AddColumnDataBase: React.FC<AddColumnDataBaseProps> = ({
  blockIndex,
}) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state.blocks.content);
  const [updateDataBase, setUpdateData] = useState(false);
  const param = useParams();

  // MISE A JOUR DE LA BASE DE DONNE A CHAQUE MODIFICATION
  useEffect(() => {
    (async () => {
      if (updateDataBase) {
        if (!param.id) return;
        await updatePageContent(param.id, globalState);
        setUpdateData(false);
      }
    })();
  }, [updateDataBase, globalState, param.id]);
  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (element: NewColumnType) => {
    //  console.log("Received values of form: ", values);
    const values: NewColumnType = {
      index: blockIndex,
      title: element.title,
      typeIndex: element.typeIndex,
    };
    dispatch(setNewColumn(values));
    setUpdateData(true);
    form.resetFields();
  };

  const setToTrelloView = () => {
    const values: INewTypeBlock = {
      index: blockIndex,
      type: BlockType.TRELLO,
    };

    dispatch(setNewTypeBlock(values));
    setUpdateData(true);
  };

  return (
    <>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        style={{ position: "relative", top: 5 }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Nom de colonne obligatoire!" }]}
        >
          <Input placeholder="nom de la colonne" />
        </Form.Item>
        <Form.Item
          name="typeIndex"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select placeholder="Type de la colonne" style={{ width: 220 }}>
            <Option value="text" label="Text">
              <FontSizeOutlined style={{ paddingRight: 10 }} /> Text
            </Option>
            <Option value="number">
              <FieldNumberOutlined style={{ paddingRight: 10 }} /> Number
            </Option>
            <Option value="date">
              <CalendarOutlined style={{ paddingRight: 10 }} />
              Date Time
            </Option>
            <Option value="checkbox">
              <CheckSquareOutlined style={{ paddingRight: 10 }} /> Checkbox
            </Option>
            <Option value="select">
              <UnorderedListOutlined style={{ paddingRight: 10 }} /> Single
              select
            </Option>
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Ajouter une nouvelle colonne
            </Button>
          )}
        </Form.Item>
        <Button onClick={() => setToTrelloView()}> Trello view</Button>
      </Form>
    </>
  );
};

export default AddColumnDataBase;
