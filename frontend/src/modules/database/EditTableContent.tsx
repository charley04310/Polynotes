import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  DatePickerProps,
  Divider,
  Input,
  InputRef,
  Space,
} from "antd";
import { Form, Select, DatePicker, InputNumber } from "antd";
import type { FormInstance } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { EditableCellProps, EditableRowProps } from "../interfaces/database";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch } from "react-redux";
import { setdataContent } from "../../store/slices/dataBaseSlice";
import { PlusOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat);

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  typeIndex,
  record,
  //setdataContent,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const dispatch = useDispatch();

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      dispatch(setdataContent({ ...record, ...values }));
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const onDateChange: DatePickerProps["onChange"] = async (
    date,
    dateString
  ) => {
    if (!dateString) return;

    const newDate = {
      [dataIndex]: dateString,
    };
    try {
      toggleEdit();
      dispatch(setdataContent({ ...record, ...newDate }));
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  let index = 0;

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const checkBoxChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const getInputElement = (): JSX.Element => {
    switch (typeIndex) {
      case "text":
        return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
      case "number":
        return (
          <InputNumber
            ref={inputRef as any}
            min={1}
            max={10000}
            defaultValue={record[dataIndex]}
            onBlur={save}
            onChange={() => console.log("changed")}
          />
        );
      case "select":
        return (
          <Select
            ref={inputRef as any}
            style={{ width: 300 }}
            placeholder="custom dropdown render"
            onChange={save}
            onClear={save}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Entrer une selection"
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Ajouter
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
          />
        );
      case "date":
        return (
          <Space direction="vertical" size={12}>
            <DatePicker
              ref={inputRef as any}
              format={"YYYY-MM-DD"}
              defaultValue={dayjs(record[dataIndex], "YYYY-MM-DD")}
              onChange={onDateChange}
            />
          </Space>
        );

      default:
        return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} est nécéssaire.`,
          },
        ]}
      >
        {getInputElement()}
      </Form.Item>
    ) : (
      <>
        {typeIndex === "checkbox" ? (
          <Checkbox defaultChecked={true} onChange={checkBoxChange}>
            <div
              className="editable-cell-value-wrap"
              style={{ paddingRight: 24 }}
              onClick={toggleEdit}
            >
              {children}
            </div>
          </Checkbox>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        )}
      </>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
