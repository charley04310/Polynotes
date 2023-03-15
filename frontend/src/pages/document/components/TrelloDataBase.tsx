import "@fontsource/anek-telugu";
import { useCallback, useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import { RightCircleOutlined } from "@ant-design/icons";

import { Column } from "../../../modules/DND/elements/Column";
import { BlockType, IBlockState } from "../../../store/interfaces/block";
import { IRowTrello } from "../../../modules/interfaces/database";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  setNewTypeBlock,
  setNewTrelloColumn,
} from "../../../store/slices/blockSlice";
import { INewTypeBlock } from "../../../modules/database/AddColumnTable";

const { Search } = Input;

interface EditableTrelloStateProps {
  dataSource: IBlockState;
  index: number;
}

export const TrelloDataBase: React.FC<EditableTrelloStateProps> = ({
  dataSource,
  index,
}) => {
  const [rowsTrello, setrowsTrello] = useState<IRowTrello[]>();
  const [Columns, setColumns] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof dataSource.content === "string") return;
    const initRowsValue = dataSource.content.trello.rowsTrello;
    const initColValue = dataSource.content.trello.columnsTrello;

    setColumns(initColValue);
    setrowsTrello(initRowsValue);
  }, [dataSource.content]);

  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!rowsTrello) return;
      const elementId = active.id;
      const deepCopy = [...rowsTrello];

      const updatedState = deepCopy.map((elm): IRowTrello => {
        if (elm.id === elementId) {
          const column = over?.id ? String(over.id) : elm.column;
          return { ...elm, column };
        }
        return elm;
      });

      setrowsTrello(updatedState);
    },
    [rowsTrello, setrowsTrello]
  );
  const handleSearch = (value: string) => {
    /*     dispatch(
      setBlockContent({
        item: blockState,
        content: value,
      })
    ); */
  };
  const setToTableView = () => {
    const values: INewTypeBlock = {
      index: index,
      type: BlockType.DATABASE,
    };

    dispatch(setNewTypeBlock(values));
  };

  const setTrelloColumn = (title: string) => {
    const value = {
      index: index,
      title: title,
    };
    dispatch(setNewTrelloColumn(value));
    setSearchValue("");
  };

  return (
    <>
      <div>
        <DndContext onDragEnd={handleOnDragEnd}>
          <MainWrapper>
            {Columns.map((column, columnIndex) => {
              if (!rowsTrello) return null;

              const filteredElements = rowsTrello.filter(
                (elm) => elm.column === column
              );
              return (
                <Column
                  key={`column-${columnIndex}`}
                  heading={column}
                  elements={filteredElements}
                />
              );
            })}
          </MainWrapper>
        </DndContext>
        <div style={{ marginTop: 0 }}>
          <Button onClick={() => setToTableView()}> Table view</Button>
          <Search
            placeholder="Ajouter une colonne"
            value={searchValue}
            style={{ width: 215, marginLeft: 10 }}
            enterButton={<RightCircleOutlined />}
            onSearch={(value) => setTrelloColumn(value)}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 10,
  paddingBottom: 20,
  height: "auto",
});
