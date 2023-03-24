import { FormatPainterFilled } from "@ant-design/icons";
import { MenuProps } from "antd";

const color = {
  primaire: "#001529",
  green: "green",
  orange: "orange",
  red: "red",
};

export const items = (
  handleHeaderColor: (arg0: any) => void
): MenuProps["items"] => {
  return [
    {
      label: "Primaire",
      icon: <FormatPainterFilled style={{ color: "#001529", fontSize: 20 }} />,
      key: "1",

      onClick: () => handleHeaderColor(color.primaire),
    },
    {
      label: "Vert",
      icon: <FormatPainterFilled style={{ color: "green", fontSize: 20 }} />,
      key: "2",
      onClick: () => handleHeaderColor(color.green),
    },
    {
      label: "Orange",
      icon: <FormatPainterFilled style={{ color: "orange", fontSize: 20 }} />,
      key: "3",
      onClick: () => handleHeaderColor(color.orange),
    },
    {
      label: "Rouge",
      icon: <FormatPainterFilled style={{ color: "red", fontSize: 20 }} />,
      key: "4",
      onClick: () => handleHeaderColor(color.red),
    },
  ];
};
