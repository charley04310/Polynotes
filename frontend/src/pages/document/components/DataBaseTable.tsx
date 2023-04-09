import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  EditableCell,
  EditableRow,
} from "../../../modules/database/EditTableContent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRows,
  setNewRow,
  setNewTypeBlock,
} from "../../../store/slices/blockSlice";

import AddColumnDataBase, {
  INewTypeBlock,
} from "../../../modules/database/AddColumnTable";
import { BlockType, IContentBlock } from "../../../store/interfaces/block";
import { IColumnTableDataBase } from "../../../modules/interfaces/database";
import { RootState } from "../../../store/store";
import { useLocation, useParams } from "react-router-dom";
import { updatePageContent } from "../../../store/API/Page";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface EditableTableState {
  dataSource: IContentBlock;
  isEditable: boolean;
  isSubPage: boolean;
  index: number;
}
const TableDataBase: React.FC<EditableTableState> = ({
  dataSource,
  isEditable,
  isSubPage,
  index,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const globalState = useSelector((state: RootState) => state.blocks.content);
  const [updateDataBase, setUpdateData] = useState(false);
  const param = useParams();

  const dispatch = useDispatch();
  const setToTrelloView = (index: number) => {
    const values: INewTypeBlock = {
      index: index,
      type: BlockType.TRELLO,
    };

    dispatch(setNewTypeBlock(values));
    setUpdateData(true);
  };
  useEffect(() => {
    (async () => {
      if (updateDataBase) {
        // console.log(`Database is Updating TRELLO`, globalState);
        if (!param.id) return;
        await updatePageContent(param.id, globalState);
        setUpdateData(false);
      }
    })();
  }, [updateDataBase, globalState, param.id]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  if (typeof dataSource.content === "string") return null;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = dataSource.content.columns.map((col) => {
    if (typeof col === "string" || !("title" in col)) {
      return col;
    }

    return {
      ...col,
      onCell: (record: IColumnTableDataBase) => ({
        title: col.title,
        record,
        blockIndex: index,
        editable: col.editable,
        isEditable: isEditable,
        typeIndex: col.typeIndex,
        dataIndex: col.dataIndex,
      }),
    };
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const rowToDelete = {
    index: index,
    keys: selectedRowKeys,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const isColumn = dataSource.content.columns.length > 0;

  const deleteAllSelectedRowKeys = () => {
    dispatch(deleteRows(rowToDelete));
    setUpdateData(true);
    setSelectedRowKeys([]);
  };

  return (
    <div
      style={{
        marginTop: 5,
        marginBottom: 16,
        width: "90%",
        position: "relative",
      }}
    >
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        rowSelection={rowSelection}
        bordered
        dataSource={dataSource.content.rows}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      <div>
        {isColumn && isEditable ? (
          <Button
            onClick={() => dispatch(setNewRow({ index: index }))}
            style={{
              marginBottom: 10,
              marginTop: 10,
              color: "black",
            }}
            type="text"
            icon={<PlusOutlined />}
          >
            Add new raw
          </Button>
        ) : null}
        {hasSelected && isEditable ? (
          <Button
            type="text"
            onClick={() => deleteAllSelectedRowKeys()}
            style={{ color: "red", marginLeft: 10 }}
            disabled={!hasSelected}
            icon={<DeleteOutlined />}
          />
        ) : null}

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {!isSubPage ? (
            <>
              {isEditable ? (
                <>
                  <AddColumnDataBase blockIndex={index} />{" "}
                </>
              ) : null}
              <Button
                style={{ marginTop: 12 }}
                onClick={() => setToTrelloView(index)}
              >
                Trello view
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TableDataBase;
