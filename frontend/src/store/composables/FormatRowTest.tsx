import { Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { IRowTrello } from "../../modules/interfaces/database";

export const formatRow = (
  row: any,
  defaultColumn: string,
): IRowTrello => {
  const content = (
    <>
      {Object.entries(row).map(([propName, propValue], index) => {
        if (
          propName !== "key" &&
          propName !== "index" &&
          typeof propValue === "string"
        ) {
          return (
            <>
              <Divider
                orientation="left"
                orientationMargin="0"
                style={{ margin: 0, fontWeight: "bold" }}
              >
                {propName.toLocaleUpperCase()} : {index}
              </Divider>

              <Meta
                key={index++}
                description={`${propValue} : ${index}`}
                style={{ marginBottom: 5 }}
              />
            </>
          );
        }
        return null;
      })}
    </>
  );

  return {
    id: row.key,
    content: content,
    column: defaultColumn,
  };
};
