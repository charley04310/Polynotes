import { useEffect, useRef, useState } from "react";
import "./index.css";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Tiptap from "./components/EditorContent";
import { Editor } from "@tiptap/react";
import {
  IBlockState,
  BlockType,
  IContentBlock,
} from "../../store/interfaces/block";
import ImageBlockComponent from "./components/ImageBlock";
import DropDownMenu from "./components/DropDownMenu";
import TableDataBase from "./components/DataBaseTable";
import { TrelloDataBase } from "./components/TrelloDataBase";
import TitleDocumentPage from "./components/TitleDocumentPage";
import { useNavigate, useParams } from "react-router-dom";
import { getPageByid, updatePageContent } from "../../store/API/Page";
import { deleteBlock, setStoreState } from "../../store/slices/blockSlice";
import { handleKeyEventRefs } from "./composables/handleEventKeyDown";

const EditDocumentPage = () => {
  const refs = useRef<(Editor | null)[]>([]);
  const params = useParams();
  const [updateDataBaseBlock, setUpdateDataBaseBlock] = useState(false);
  const blocksPage: IContentBlock[] = useSelector(
    (state: RootState) => state.blocks.content
  );
  const [html, setHtml] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!params.id) {
        return navigate("/acceuil");
      }
      const pageContent = await getPageByid(params.id);
      if (pageContent.error) {
        return navigate("/acceuil");
      }
      const store = {
        content: pageContent.content,
        title: pageContent.title,
      };
      dispatch(setStoreState(store));
      //if (pageContent.title) setTitleDocument(pageContent.title);
      // on verifie si l'utilisateur ajouter un nouveau block
    })();
  }, [params.id, navigate, dispatch, refs]);

  useEffect(() => {
    (async () => {
      if (updateDataBaseBlock) {
        if (!params.id) return;
        await updatePageContent(params.id, blocksPage);
        setUpdateDataBaseBlock(false);
      }
    })();
  }, [updateDataBaseBlock, blocksPage, params.id]);

  const getNewFocus = (newIndex: number) => {
    refs.current[newIndex]?.chain().focus().run();
  };

  return (
    <>
      <TitleDocumentPage />
      {blocksPage.map((item, index) => (
        <div
          key={item.id}
          className="block"
          style={{ display: "flex", alignItems: "center" }}
        >
          <DropDownMenu
            setUpdateData={setUpdateDataBaseBlock}
            editor={refs.current[index]}
            item={item}
          />
          {item.type === BlockType.TIPTAP ? (
            <Tiptap
              blockState={item}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              handleKeyEventRefs={(event) => {
                handleKeyEventRefs(event, index, refs, dispatch, getNewFocus);
              }}
            />
          ) : null}

          {item.type === BlockType.IMAGE && typeof item.content === "string" ? (
            <ImageBlockComponent blockState={item} imageUrl={item.content} />
          ) : null}
          {item.type === BlockType.DATABASE ? (
            <TableDataBase dataSource={item} index={index} />
          ) : null}

          {item.type === BlockType.TRELLO && typeof item.content != "string" ? (
            <TrelloDataBase dataSource={item} index={index} />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default EditDocumentPage;
