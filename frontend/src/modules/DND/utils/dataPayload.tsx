import { FormatPainterFilled } from "@ant-design/icons";
import { MenuProps } from "antd";
export enum Color {
  primaire = "#001529",
  green = "green",
  orange = "orange",
  red = "red",
}

export const items = (
  handleHeaderColor: (color: Color) => void
): MenuProps["items"] => {
  return [
    {
      label: "Primaire",
      icon: (
        <FormatPainterFilled style={{ color: Color.primaire, fontSize: 20 }} />
      ),
      key: "1",

      onClick: () => handleHeaderColor(Color.primaire),
    },
    {
      label: "Vert",
      icon: (
        <FormatPainterFilled style={{ color: Color.green, fontSize: 20 }} />
      ),
      key: "2",
      onClick: () => handleHeaderColor(Color.green),
    },
    {
      label: "Orange",
      icon: (
        <FormatPainterFilled style={{ color: Color.orange, fontSize: 20 }} />
      ),
      key: "3",
      onClick: () => handleHeaderColor(Color.orange),
    },
    {
      label: "Rouge",
      icon: <FormatPainterFilled style={{ color: Color.red, fontSize: 20 }} />,
      key: "4",
      onClick: () => handleHeaderColor(Color.red),
    },
  ];
};
