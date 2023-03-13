import React, { useEffect, useState } from "react";
import {
  UnorderedListOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  FieldNumberOutlined,
  FontSizeOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { setNewColumn } from "../../store/slices/dataBaseSlice";

const { Option } = Select;
const AddColumnDataBase: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const dispatch = useDispatch();
  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(setNewColumn(values));
    form.resetFields();
  };

  return (
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
            <UnorderedListOutlined style={{ paddingRight: 10 }} /> Single select
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
    </Form>
  );
};

export default AddColumnDataBase;
