import { FC, useMemo } from "react";
import { styled } from "@stitches/react";
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
      <ElementText>{content}</ElementText>
    </Draggable>
  );
};

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});
