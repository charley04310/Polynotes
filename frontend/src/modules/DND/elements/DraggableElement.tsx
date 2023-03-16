import { styled } from "@stitches/react";
import { FC, useMemo } from "react";
import { Draggable } from "../Draggable";

interface IDraggableElement {
  identifier: string;
  content: string | JSX.Element;
}

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);

  return (
    <Draggable id={itemIdentifier}>
      <CardTrello>{content}</CardTrello>
    </Draggable>
  );
};

const CardTrello = styled("div", {
  background: "white",
  padding: "20px 15px",
  marginTop: 10,
  borderRadius: "5px",
});
