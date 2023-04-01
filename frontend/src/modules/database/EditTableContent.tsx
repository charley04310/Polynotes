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
import { useDispatch, useSelector } from "react-redux";
import { setRowData } from "../../store/slices/blockSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { updatePageContent } from "../../store/API/Page";

dayjs.extend(customParseFormat);

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  isEditable,
  children,
  dataIndex,
  typeIndex,
  blockIndex,
  record,
  ...restProps
}) => {
  const globalState = useSelector((state: RootState) => state.blocks.content);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;
  const dispatch = useDispatch();
  const param = useParams();

  const [updateDataBase, setUpdateData] = useState(false);
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  let index = 0;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  useEffect(() => {
    (async () => {
      if (updateDataBase) {
        if (!param.id) return;
        await updatePageContent(param.id, globalState);
        //console.log("updateDataBase", updateDataBase);
        setUpdateData(false);
      }
    })();
  }, [updateDataBase, globalState, param.id]);

  const toggleEdit = () => {
    if (!isEditable) return;
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      const newValues = {
        index: blockIndex,
        key: record.key,
        [dataIndex]: values[dataIndex],
      };
      toggleEdit();
      dispatch(setRowData({ ...record, ...newValues }));
      setUpdateData(true);
    } catch (errInfo) {
      // console.log("Save failed:", errInfo);
    }
  };

  const onDateChange: DatePickerProps["onChange"] = async (
    date,
    dateString
  ) => {
    if (!dateString) return;

    const newDate = {
      index: blockIndex,
      key: record.key,
      [dataIndex]: dateString,
    };
    try {
      toggleEdit();
      dispatch(setRowData({ ...record, ...newDate }));
      setUpdateData(true);
    } catch (errInfo) {
      // console.log("Save failed:", errInfo);
    }
  };

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
    // console.log(`checked = ${e.target.checked}`);
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
