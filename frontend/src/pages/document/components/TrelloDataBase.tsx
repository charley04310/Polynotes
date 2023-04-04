import "@fontsource/anek-telugu";
import { useCallback, useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import { RightCircleOutlined } from "@ant-design/icons";

import { Column } from "../../../modules/DND/elements/Column";
import { BlockType, IContentBlock } from "../../../store/interfaces/block";
import {
  IRowTrello,
  IStyleHeaderTrello,
} from "../../../modules/interfaces/database";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewTypeBlock,
  setNewTrelloColumn,
  setRowTrelloToColumn,
} from "../../../store/slices/blockSlice";
import { INewTypeBlock } from "../../../modules/database/AddColumnTable";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { updatePageContent } from "../../../store/API/Page";

const { Search } = Input;

interface EditableTrelloStateProps {
  dataSource: IContentBlock;
  isEditable: boolean;
  isSubPage: boolean;
  index: number;
}

export const TrelloDataBase: React.FC<EditableTrelloStateProps> = ({
  dataSource,
  isEditable,
  isSubPage,
  index,
}) => {
  const [rowsTrello, setrowsTrello] = useState<IRowTrello[]>();
  const [Columns, setColumns] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const globalState = useSelector((state: RootState) => state.blocks.content);
  const [updateDataBase, setUpdateData] = useState(false);
  const param = useParams();

  const [styleHeadersColumns, setStyleHeadersColumns] = useState<
    IStyleHeaderTrello[]
  >([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof dataSource.content === "string") return;
    const initRowsValue = dataSource.content.trello.rowsTrello;
    const initColValue = dataSource.content.trello.columnsTrello;
    const initStyleColumnsHeader = dataSource.content.trello.columnsTrelloStyle;

    setStyleHeadersColumns(initStyleColumnsHeader);
    setColumns(initColValue);
    setrowsTrello(initRowsValue);
  }, [dataSource.content, index]);

  useEffect(() => {
    (async () => {
      if (updateDataBase) {
        if (!param.id) return;
        await updatePageContent(param.id, globalState);
        setUpdateData(false);
      }
    })();
  }, [updateDataBase, globalState, param.id]);

  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!isEditable) return;
      if (!rowsTrello) return;
      const elementId = active.id;
      const deepCopy = [...rowsTrello];

      const setRowToColumn = () => {
        const newStoreValues = {
          index: index,
          value: updatedState,
        };
        dispatch(setRowTrelloToColumn(newStoreValues));
        setUpdateData(true);
      };

      const updatedState = deepCopy.map((elm): IRowTrello => {
        if (elm.id === elementId) {
          const column = over?.id ? String(over.id) : elm.column;
          return { ...elm, column };
        }
        return elm;
      });

      setrowsTrello(updatedState);
      setRowToColumn();
    },
    [rowsTrello, setrowsTrello, index, dispatch, isEditable]
  );

  const setToTableView = () => {
    const values: INewTypeBlock = {
      index: index,
      type: BlockType.DATABASE,
    };
    dispatch(setNewTypeBlock(values));
    setUpdateData(true);
  };

  const setTrelloColumn = (title: string) => {
    const value = {
      index: index,
      title: title,
    };

    dispatch(setNewTrelloColumn(value));
    setUpdateData(true);
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
                  isEditable={isEditable}
                  key={`column-${columnIndex}`}
                  heading={column}
                  styleColumnHeader={styleHeadersColumns[columnIndex]}
                  elements={filteredElements}
                  blockIndex={index}
                  columnTrelloIndex={columnIndex}
                />
              );
            })}
          </MainWrapper>
        </DndContext>
        <div style={{ marginTop: 0 }}>
          {!isSubPage ? (
            <>
              {isEditable ? (
                <>
                  <Search
                    placeholder="Ajouter une colonne"
                    value={searchValue}
                    style={{ width: 215, marginLeft: 10 }}
                    enterButton={<RightCircleOutlined />}
                    onSearch={(value) => setTrelloColumn(value)}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </>
              ) : null}
              <Button onClick={() => setToTableView()}> Table view</Button>
            </>
          ) : null}
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
