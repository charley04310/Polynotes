import {
  IRowTableDataBase,
  IRowTrello,
} from "../../modules/interfaces/database";

export const formatRow = (
  row: IRowTableDataBase,
  defaultColumn: string
): IRowTrello => {
  const content: any = {};

  Object.entries(row).forEach(([propName, propValue], index) => {
    if (
      propName !== "key" &&
      propName !== "index" &&
      typeof propValue === "string"
    ) {
      content[`title_${index}`] = propName.toLocaleUpperCase();
      content[`content_${index}`] = propValue;
    }
  });

  return {
    id: row.key,
    content: content,
    column: defaultColumn,
  };
};
