import React, { useState } from "react";
import { Button, Table } from "antd";
import {
  EditableCell,
  EditableRow,
} from "../../../modules/database/EditTableContent";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setNewRow, deleteRows } from "../../../store/slices/dataBaseSlice";
import { TableState } from "../../../modules/database/interfaces/interfaces";

import AddColumnDataBase from "../../../modules/database/AddColumnTable";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const TableDataBase: React.FC = () => {
  const dataSource: TableState = useSelector(
    (state: RootState) => state.dataBase
  );
  const dispatch = useDispatch();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = dataSource.columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        title: col.title,
        record,
        editable: col.editable,
        typeIndex: col.typeIndex,
        dataIndex: col.dataIndex,
      }),
    };
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const isColumn = dataSource.columns.length > 0;
  return (
    <div
      style={{ marginTop: 16, marginBottom: 16, paddingLeft: 12, width: "90%" }}
    >
      <div style={{ marginBottom: 16 }}>
        {isColumn && (
          <Button
            onClick={() => dispatch(setNewRow())}
            type="primary"
            icon={<PlusOutlined />}
          />
        )}

        {hasSelected && (
          <Button
            type="primary"
            onClick={() => dispatch(deleteRows(selectedRowKeys))}
            style={{ color: "white", backgroundColor: "red", marginLeft: 10 }}
            disabled={!hasSelected}
            icon={<DeleteOutlined />}
          />
        )}
      </div>

      <Table
        components={components}
        rowClassName={() => "editable-row"}
        rowSelection={rowSelection}
        bordered
        dataSource={dataSource.rows}
        columns={columns as ColumnTypes}
      />
      <AddColumnDataBase />
    </div>
  );
};

export default TableDataBase;
