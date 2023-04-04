import {
  Input,
  Form,
  InputRef,
  FormInstance,
  Card,
  Spin,
  Popover,
  Tooltip,
  Button,
  Divider,
  Checkbox,
  Badge,
} from "antd";
import {
  FileTextOutlined,
  LoadingOutlined,
  ShareAltOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Meta from "antd/es/card/Meta";
import { updatePrivacyPage, updDateTitlePage } from "../../../store/API/Page";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IContentBlock } from "../../../store/interfaces/block";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface TitleDocumentProps {}
const EditableContext = React.createContext<FormInstance<any> | null>(null);
//const [form] = Form.useForm();
const antIcon = (
  <LoadingOutlined style={{ fontSize: 15, color: "#131629" }} spin />
);

const TitleDocumentPage: React.FC<TitleDocumentProps> = () => {
  const inputRef = useRef<InputRef>(null);
  const param = useParams();
  const titleStoreDocument: string = useSelector(
    (state: RootState) => state.blocks.title
  );
  let timerCountAnimation = 0;

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openShare, setopenShare] = useState(false);

  const [urlToShare, setUrlToShare] = useState({
    value: `/document/${param.id}`,
    copied: false,
  });
  const blocksPage: IContentBlock[] = useSelector(
    (state: RootState) => state.blocks.content
  );
  const privacyPage = useSelector((state: RootState) => state.blocks);

  const [titleStateDocument, setTitleDocument] = useState(titleStoreDocument);
  const [isPublic, setIsPublic] = useState(privacyPage.isPublic);
  const [isEditablePage, setIsEditablePage] = useState(privacyPage.isEditable);

  // Animation de chargement pour indiquer que la base de donnée est en train de se mettre à jour
  useEffect(() => {
    timerCountAnimation++;
    if (timerCountAnimation > 1) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [blocksPage, timerCountAnimation]);

  useEffect(() => {
    console.log("editing :", editing);
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  useEffect(() => {
    console.log("titleStoreDocument :", titleStoreDocument);
    setTitleDocument(titleStoreDocument);
    setIsEditablePage(privacyPage.isEditable);
    setIsPublic(privacyPage.isPublic);
  }, [titleStoreDocument, privacyPage]);

  const save = async () => {
    const values = await form.validateFields();
    if (!values.page_title) return;
    // console.log("values :", values);
    if (!param.id) return;
    await updDateTitlePage(param.id, values.page_title);
    setTitleDocument(values.page_title);
    setEditing(!editing);
  };

  const toggleEdit = () => {
    form.setFieldValue("page_title", titleStateDocument);
    setEditing(!editing);
  };

  const handleCopyToClipboard = () => {
    setUrlToShare({
      value: `${process.env.REACT_APP_BASE_URL}/collaborative/document/${param.id}`,
      copied: true,
    });

    setTimeout(() => {
      setUrlToShare({
        value: `${process.env.REACT_APP_BASE_URL}/collaborative/document/${param.id}`,
        copied: false,
      });
    }, 2000);
  };

  const onPrivacyIsPublicChange = async (e: any) => {
    if (!param.id) return;
    setIsPublic(e.target.checked);
    await updatePrivacyPage(param.id, e.target.checked, isEditablePage);
  };

  const onPrivacyIsEditableChange = async (e: any) => {
    if (!param.id) return;
    setIsEditablePage(!isPublic);
    await updatePrivacyPage(param.id, isPublic, e.target.checked);
  };

  const [form] = Form.useForm();

  return (
    <>
      <div
        className="editable-cell-value-wrap"
        style={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          right: 25,
          zIndex: 1,
        }}
      >
        <Popover
          className="popover-share"
          style={{
            padding: 0,
          }}
          content={
            <>
              <Badge.Ribbon
                text="Copié !"
                color={urlToShare.copied ? "green" : "transparent"}
              >
                <Card size="small" bordered={false}>
                  <Meta
                    avatar={<SecurityScanOutlined />}
                    title="Confidentialité"
                  />
                  <Divider style={{ padding: 0, margin: 12 }} />
                  <Checkbox
                    defaultChecked={isPublic}
                    onChange={onPrivacyIsPublicChange}
                  >
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={toggleEdit}
                    >
                      Autoriser le partage du document
                    </div>
                  </Checkbox>
                </Card>

                {isPublic && (
                  <Card
                    title="Partager le document"
                    size="small"
                    bordered={false}
                    style={{ marginTop: 0, paddingTop: 0 }}
                  >
                    <Input
                      disabled={true}
                      placeholder="nom de votre dossier"
                      value={urlToShare.value}
                      ref={inputRef}
                    />
                    <Divider style={{ padding: 0, margin: 12 }} />
                    <Checkbox
                      defaultChecked={isEditablePage}
                      onChange={onPrivacyIsEditableChange}
                    >
                      <div
                        className="editable-cell-value-wrap"
                        style={{ paddingRight: 24 }}
                        onClick={toggleEdit}
                      >
                        Autoriser la modification
                      </div>
                    </Checkbox>
                    <CopyToClipboard
                      text={urlToShare.value}
                      onCopy={() => handleCopyToClipboard()}
                    >
                      <Button icon={<ShareAltOutlined />}>
                        Copier le lien
                      </Button>
                    </CopyToClipboard>
                  </Card>
                )}
              </Badge.Ribbon>
            </>
          }
          trigger="click"
          open={openShare}
          onOpenChange={() => {
            setopenShare(!openShare);
          }}
        >
          <Tooltip placement="top" title={"Partager le document"}>
            <Button
              type="text"
              size="large"
              style={{ marginRight: 8 }}
              icon={<ShareAltOutlined style={{ fontSize: 25 }} />}
            />
          </Tooltip>
        </Popover>
        {editing ? (
          <Card
            style={{ width: 240, marginTop: 0, padding: 0 }}
            loading={false}
          >
            <Form
              form={form}
              name="horizontal_login"
              component={false}
              layout="inline"
              style={{ position: "relative", top: 5 }}
            >
              <EditableContext.Provider value={form}>
                <Form.Item
                  style={{ margin: 0, padding: 0 }}
                  name="page_title"
                  rules={[
                    {
                      required: true,
                      message: `titre est nécéssaire.`,
                    },
                  ]}
                >
                  <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
              </EditableContext.Provider>
            </Form>
          </Card>
        ) : (
          <Spin indicator={antIcon} spinning={loading}>
            <Card
              onClick={toggleEdit}
              style={{ width: 240, marginTop: 0, padding: 0 }}
              loading={false}
            >
              <Meta
                avatar={<FileTextOutlined />}
                description={titleStateDocument}
              />
            </Card>
          </Spin>
        )}
      </div>
    </>
  );
};

export default TitleDocumentPage;
