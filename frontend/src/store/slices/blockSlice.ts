import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BlockType } from "../../pages/document/interfaces/documents";
import { initialState } from "../../pages/document/utils/dataPayload";

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    setBlockContent: (state, action) => {
      const { item, content } = action.payload;
      const blockIndex = state.findIndex((block) => block.id === item.id);
      state[blockIndex].content = content;
      console.log(content);
    },

    setNewBlock: (state, action) => {
      const newBlock = {
        id: uuidv4(),
        type: BlockType.TIPTAP,
        ref: null,
        content: "",
      };
      const blockIndex = state.findIndex(
        (block) => block.id === action.payload.id
      );
      state.splice(blockIndex + 1, 0, newBlock);
    },

    deleteBlock: (state, action) => {
      if (state.length > 1) {
        const { id } = action.payload;
        const blockIndex = state.findIndex((block) => block.id === id);
        state.splice(blockIndex, 1);
      }
    },
  },
});

export const { setNewBlock, deleteBlock, setBlockContent } = blockSlice.actions;

export default blockSlice.reducer;
