import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  EditableCell,
  EditableRow,
} from "../../../modules/database/EditTableContent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteRows, setNewRow } from "../../../store/slices/blockSlice";

import AddColumnDataBase from "../../../modules/database/AddColumnTable";
import { BlockState } from "../../../store/interfaces/block";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface EditableTableState {
  dataSource: BlockState;
  index: number;
}
const TableDataBase: React.FC<EditableTableState> = ({ dataSource, index }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const dispatch = useDispatch();

  if (typeof dataSource.content === "string") return null;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = dataSource.content.columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        title: col.title,
        record,
        blockIndex: index,
        editable: col.editable,
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
        {isColumn && (
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
            Ajouter une ligne
          </Button>
        )}
        {hasSelected && (
          <Button
            type="text"
            onClick={() => deleteAllSelectedRowKeys()}
            style={{ color: "red", marginLeft: 10 }}
            disabled={!hasSelected}
            icon={<DeleteOutlined />}
          />
        )}
        <AddColumnDataBase blockIndex={index} />
      </div>
    </div>
  );
};

export default TableDataBase;
