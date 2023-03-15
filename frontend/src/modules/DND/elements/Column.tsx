import { FC, useMemo } from "react";
import { styled } from "@stitches/react";
import { Droppable } from "../Droppable";
import { DraggableElement } from "./DraggableElement";
import { IColumn } from "../../interfaces/database";
import { Card } from "antd";

export const Column: FC<IColumn> = ({ heading, elements }) => {
  const columnIdentifier = useMemo(() => heading, [heading]);

  const amounts = useMemo(
    () => elements.filter((elm) => elm.column === columnIdentifier).length,
    [elements, columnIdentifier]
  );

  return (
    <Card
      style={{
        width: 320,
        padding: 0,
        paddingTop: 10,
      }}
    >
      <ColumnHeaderWrapper>
        <Heading>{heading}</Heading>
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
      </Droppable>
    </Card>
  );
};

const Heading = styled("h3", {
  color: "white",
});

const DropPlaceholder = styled("div", {
  height: 20,
  backgroundColor: "transparent",
  marginTop: 5,
});

const ColumnHeaderWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#001529",
  color: "white",
  padding: "0px 10px ",
  borderRadius: 5,
});

const ColumnTasksAmout = styled("span", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 30,
  height: 30,
  borderRadius: 6,
  color: "#FFF",
  background: "rgba( 255, 255, 255, 0.25 )",
  boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.18 )",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
