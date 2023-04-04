import { useEffect, useRef, useState } from "react";
import "./index.css";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Tiptap from "./components/EditorContent";
import { Editor } from "@tiptap/react";
import { BlockType, IContentBlock } from "../../store/interfaces/block";
import ImageBlockComponent from "./components/ImageBlock";
import DropDownMenu from "./components/DropDownMenu";
import TableDataBase from "./components/DataBaseTable";
import { TrelloDataBase } from "./components/TrelloDataBase";
import TitleDocumentPage from "./components/TitleDocumentPage";
import { useNavigate, useParams } from "react-router-dom";
import { getPageByid, updatePageContent } from "../../store/API/Page";
import { setStoreState } from "../../store/slices/blockSlice";
import { handleKeyEventRefs } from "./composables/handleEventKeyDown";
import SubPageBlockComponent from "./components/SubPage";

const SharedDocumentPage = () => {
  const refs = useRef<(Editor | null)[]>([]);
  const params = useParams();

  const [updateDataBaseBlock, setUpdateDataBaseBlock] = useState(false);

  const blocksPage: IContentBlock[] = useSelector(
    (state: RootState) => state.blocks.content
  );

  const pageState = useSelector((state: RootState) => state.blocks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Avant de rendre la page on vérifie que l'id est bien présent dans l'url
  useEffect(() => {
    (async () => {
      console.log("params.id", params.id);
      if (!params.id) return;
      const pageContent = await getPageByid(params.id);

      console.log("pageContent", pageContent);
      if (pageContent.error || !pageContent.isPublic) {
        return navigate("/authentification");
      }

      const store = {
        isPublic: pageContent.isPublic,
        isEditable: pageContent.isEditable,
        content: pageContent.content,
        title: pageContent.title,
      };
      dispatch(setStoreState(store));
    })();
  }, [params.id, navigate, dispatch, refs, pageState.isPublic]);

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
      {blocksPage.map((item, index) => (
        <div
          key={item.id}
          className="block"
          style={{ display: "flex", alignItems: "center" }}
        >
          {pageState.isEditable ? (
            <DropDownMenu
              setUpdateData={setUpdateDataBaseBlock}
              editor={refs.current[index]}
              item={item}
            />
          ) : null}

          {item.type === BlockType.TIPTAP ? (
            <Tiptap
              isEditable={pageState.isEditable}
              blockState={item}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              handleKeyEventRefs={(event) => {
                handleKeyEventRefs(
                  event,
                  index,
                  item,
                  refs,
                  dispatch,
                  getNewFocus
                );
              }}
            />
          ) : null}

          {item.type === BlockType.IMAGE && typeof item.content === "string" ? (
            <ImageBlockComponent
              isEditable={pageState.isEditable}
              blockState={item}
              imageUrl={item.content}
            />
          ) : null}
          {item.type === BlockType.DATABASE ? (
            <TableDataBase
              isSubPage={false}
              isEditable={pageState.isEditable}
              dataSource={item}
              index={index}
            />
          ) : null}

          {item.type === BlockType.TRELLO && typeof item.content != "string" ? (
            <TrelloDataBase
              isSubPage={false}
              isEditable={pageState.isEditable}
              dataSource={item}
              index={index}
            />
          ) : null}
          {item.type === BlockType.SUBPAGE ? (
            <SubPageBlockComponent dataSource={item} index={index} />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default SharedDocumentPage;
