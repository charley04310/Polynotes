import { useEffect, useState, useRef } from "react";
import { Button, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./index.css";

const EditDocumentPage = () => {
  const style = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "30px",
    color: "grey",
  };

  const [contents, setContents] = useState([
    {
      content: "Sans titre",
      id: Date.now().toString(),
      style: style,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const newDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newDivRef.current) {
      newDivRef.current.scrollIntoView({ behavior: "smooth" });
      newDivRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(newDivRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [contents]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: String
  ) => {
    const targetTextContent = event.currentTarget.textContent;

    switch (event.key) {
      case "Enter": {
        if (isModalVisible) break;
        event.preventDefault();
        const newContents = [
          ...contents,
          {
            content: "New Content",
            id: Date.now().toString(),
            style: style,
          },
        ];
        setContents(newContents);
        break;
      }
      case "Backspace": {
        if (isModalVisible) break;
        if (targetTextContent?.length === 0) {
          event.preventDefault();
          const newContents = [...contents];
          if (contents.length > 1) {
            newContents.pop();
            setContents(newContents);
          }
        }
        if (
          targetTextContent === "New Content" ||
          targetTextContent === "Sans titre"
        ) {
          event.preventDefault();
          const newContents = [...contents];
          const lastContent = newContents[newContents.length - 1];
          lastContent.content = "";
          lastContent.style.color = "black";
          setContents(newContents);
        }
        break;
      }
      case "/": {
        if (isModalVisible) break;

        if (
          targetTextContent?.length === 0 ||
          targetTextContent === "Sans titre" ||
          targetTextContent === "New Content"
        ) {
          event.preventDefault();
          const newContents = [...contents];
          const lastContent = newContents[newContents.length - 1];
          lastContent.content = "";
          lastContent.style.color = "black";
          setContents(newContents);
          setIsModalVisible(true);
        }

        break;
      }

      default: {
        if (
          targetTextContent === "New Content" ||
          targetTextContent === "Sans titre"
        ) {
          if (/^[a-zA-Z]$/.test(event.key)) {
            event.preventDefault();
            const newContents = [...contents];
            const lastContent = newContents[newContents.length - 1];
            lastContent.content = event.key;
            lastContent.style.color = "black";
            setContents(newContents);
          }
        }
        break;
      }
    }
  };
  return (
    <>
      {contents.map((item, index) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="link"
              shape="default"
              className="moreOptions"
              icon={<MoreOutlined />}
              size={"large"}
              onClick={() => setIsModalVisible(true)}
            />
            <div
              ref={index === contents.length - 1 ? newDivRef : null}
              className="editable"
              placeholder="New Paragraph"
              key={item.id}
              style={{ ...item.style, caretColor: "black", width: "90%" }}
              contentEditable={true}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
            >
              {item.content}
              <Modal
                title="Customize your document"
                open={isModalVisible}
                //onOk={this.hideModal}
                onCancel={() => setIsModalVisible(false)}
                okText="Valider"
                cancelText="Annuler"
              ></Modal>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default EditDocumentPage;
