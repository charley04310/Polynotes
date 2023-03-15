import { Card, Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { IRowTrello } from "../../modules/interfaces/database";
let count = 0;
export function formatRow(row: any): IRowTrello {
  const content = (
    <>
      <Card
        style={{
          backgroundColor: "rgb(225 225 225 / 32%)",
          padding: 0,
          paddingLeft: 5,
        }}
      >
        {Object.entries(row).map(([propName, propValue]) => {
          if (
            propName !== "key" &&
            propName !== "index" &&
            typeof propValue === "string"
          ) {
            return (
              <>
                <Divider orientation="left" orientationMargin="0">
                  {propName}
                </Divider>

                <Meta key={count++} description={propValue} />
              </>
            );
          }
          return null;
        })}
      </Card>
    </>
  );

  return {
    id: row.key,
    content: content,
    column: "En cours",
  };
}
