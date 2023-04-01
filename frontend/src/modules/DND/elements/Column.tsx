import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { styled } from "@stitches/react";
import { Droppable } from "../Droppable";
import { DraggableElement } from "./DraggableElement";
import { IColumn } from "../../interfaces/database";
import React from "react";
import type { FormInstance } from "antd/es/form";
import {
  Button,
  Dropdown,
  Form,
  Input,
  InputRef,
  MenuProps,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  BgColorsOutlined,
  FormatPainterFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumnNewTitle,
  deleteTrelloColumn,
  setStyleColumn,
} from "../../../store/slices/blockSlice";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { updatePageContent } from "../../../store/API/Page";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export const Column: FC<IColumn> = ({
  heading,
  isEditable,
  elements,
  blockIndex,
  columnTrelloIndex,
  styleColumnHeader,
}) => {
  const dispatch = useDispatch();
  const columnIdentifier = useMemo(() => heading, [heading]);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(heading);
  const [HeaderBackground, setHeaderBackground] = useState("yellow");
  const form = useContext(EditableContext)!;
  const inputRef = useRef<InputRef>(null);
  const globalState = useSelector((state: RootState) => state.blocks.content);
  const [updateDataBase, setUpdateData] = useState(false);
  const param = useParams();

  useEffect(() => {
    (async () => {
      if (updateDataBase) {
        if (!param.id) return;
        const page = await updatePageContent(param.id, globalState);
        setUpdateData(false);
        // console.log(`Delete Column`, page);
      }
    })();
  }, [updateDataBase, globalState, param.id]);

  const color = {
    primaire: "#001529",
    green: "green",
    orange: "orange",
    red: "red",
  };

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
    setHeaderBackground(styleColumnHeader.background);
    setInputValue(heading);
  }, [editing, styleColumnHeader, blockIndex, columnTrelloIndex, heading]);

  const handleHeaderColor = (color: string) => {
    const newHeaderColor = {
      background: color,
      indexBlock: blockIndex,
      indexColumn: columnTrelloIndex,
    };
    dispatch(setStyleColumn(newHeaderColor));
    setUpdateData(true);

    setHeaderBackground(color);
  };

  const items: MenuProps["items"] = [
    {
      label: "Primaire",
      icon: <FormatPainterFilled style={{ color: "#001529", fontSize: 20 }} />,
      key: "1",

      onClick: () => handleHeaderColor(color.primaire),
    },
    {
      label: "Vert",
      icon: <FormatPainterFilled style={{ color: "green", fontSize: 20 }} />,
      key: "2",
      onClick: () => handleHeaderColor(color.green),
    },
    {
      label: "Orange",
      icon: <FormatPainterFilled style={{ color: "orange", fontSize: 20 }} />,
      key: "3",
      onClick: () => handleHeaderColor(color.orange),
    },
    {
      label: "Rouge",
      icon: <FormatPainterFilled style={{ color: "red", fontSize: 20 }} />,
      key: "4",
      onClick: () => handleHeaderColor(color.red),
    },
  ];
  const amounts = useMemo(
    () => elements.filter((elm) => elm.column === columnIdentifier).length,
    [elements, columnIdentifier]
  );
  const saveNewTitleColumn = () => {
    if (!isEditable) return;
    const newValues = {
      index: blockIndex,
      valueToReplace: heading,
      newValue: inputValue,
    };
    dispatch(setColumnNewTitle(newValues));
    setUpdateData(true);
    toggleEdit();
  };

  const deleteColumn = () => {
    if (!isEditable) return;
    dispatch(
      deleteTrelloColumn({
        blockIndex: blockIndex,
        columnTrelloIndex: columnTrelloIndex,
        value: inputValue,
      })
    );
    setUpdateData(true);
  };

  const toggleEdit = () => {
    if (!isEditable) return;
    setEditing(!editing);
  };
  return (
    <ColumnWrapper>
      <ColumnHeaderWrapper
        className="wrapper-Column"
        css={{ background: HeaderBackground }}
      >
        {editing ? (
          <>
            <Form form={form}>
              <Form.Item name={heading} style={{ marginBottom: 0 }}>
                <Input
                  ref={inputRef}
                  defaultValue={inputValue}
                  style={{ width: 150 }}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={saveNewTitleColumn}
                />
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            {isEditable ? (
              <div onClick={toggleEdit}>
                <Tooltip title="Éditer">
                  {inputValue.toLocaleUpperCase()}
                </Tooltip>
              </div>
            ) : (
              inputValue.toLocaleUpperCase()
            )}
            {isEditable ? (
              <Dropdown
                overlayStyle={{
                  width: 150,
                  color: "white",
                }}
                menu={{ items }}
                trigger={["click", "hover"]}
              >
                <Tooltip title="Palette de couleur">
                  <Button
                    className="dropdown-color"
                    style={{
                      position: "relative",
                      right: -65,
                      background: "none",
                      color: "white",
                      border: "none",
                    }}
                    icon={<BgColorsOutlined />}
                  />
                </Tooltip>
              </Dropdown>
            ) : null}
          </>
        )}

        <ColumnTasksAmout>{amounts}</ColumnTasksAmout>
      </ColumnHeaderWrapper>
      <Droppable id={columnIdentifier}>
        {elements.map((elm, elmIndex) => (
          <DraggableElement
            key={`draggable-element-${elmIndex}-${columnIdentifier}`}
            identifier={elm.id}
            content={elm.content}
          />
        ))}
        <DropPlaceholder />
        {columnTrelloIndex > 0 && isEditable ? (
          <ContainerButtonDelete>
            <Button
              type="text"
              onClick={() => deleteColumn()}
              style={{ color: "red", marginLeft: 0 }}
              disabled={false}
              icon={<DeleteOutlined />}
            />
          </ContainerButtonDelete>
        ) : null}
      </Droppable>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled("div", {
  width: 320,
  padding: 10,
  border: "2px solid rgba(0, 21, 41, 0.07)",
  position: "relative",
  marginRight: "5px",
  borderRadius: "5px",
  background: "rgba(0, 0, 255, 0.04)",
});

const ContainerButtonDelete = styled("div", {
  position: "absolute",
  bottom: 10,
});
const DropPlaceholder = styled("div", {
  height: 50,
  backgroundColor: "transparent",
  marginTop: 15,
});

const ColumnHeaderWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  fontSize: 16,
  fontWeight: 500,
  padding: 10,
  uppercase: true,
  alignItems: "center",
  //background: "#001529",
  color: "#FFF",
  borderRadius: 5,
});

const ColumnTasksAmout = styled("span", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 33,
  height: 33,
  borderRadius: 6,
  color: "#FFF",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.18 )",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
