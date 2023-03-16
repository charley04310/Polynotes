import { styled } from "@stitches/react";
import { Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { FC, useMemo } from "react";
import { Draggable } from "../Draggable";

interface IDraggableElement {
  identifier: string;
  content:
    | string
    | {
        [key: string]: string;
      };
}

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
  content,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);

  if (typeof content === "string") return null;
  return (
    <Draggable id={itemIdentifier}>
      <CardTrello>
        {Object.keys(content).map((key, index) => {
          if (key.includes("title_")) {
            return (
              <Divider
                key={index++}
                orientation="left"
                orientationMargin="0"
                style={{ margin: 0, fontWeight: "bold" }}
              >
                {content[key]}
              </Divider>
            );
          }
          if (key.includes("content_")) {
            return (
              <Meta
                key={index++}
                description={content[key]}
                style={{ marginBottom: 5 }}
              />
            );
          }
          return null;
        })}
      </CardTrello>
    </Draggable>
  );
};

const CardTrello = styled("div", {
  background: "white",
  padding: "20px 15px",
  marginTop: 10,
  borderRadius: "5px",
});
