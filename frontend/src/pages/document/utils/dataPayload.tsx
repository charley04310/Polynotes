import { IBlockState } from "../../../store/interfaces/block";

export const initialState: IBlockState = {
  title: "",
  isPublic: false,
  isEditable: false,
  content: [],
  /*  {
      id: uuidv4(),
      type: BlockType.TIPTAP,
      ref: null,
      content: "<h1></h1>",
    }  */
  /* 
    {
      id: uuidv4(),
      type: BlockType.TIPTAP,
      ref: null,
      content: "",
    }, */
  /*  {
      id: uuidv4(),
      type: BlockType.TRELLO,
      ref: null,
      content: "",
    }, */
  /*   {
      id: uuidv4(),
      type: BlockType.IMAGE,
      column: Column.ONE,
      ref: null,
      content:
        "https://www.portices.fr/wp-content/uploads/2021/05/developper-activite-internet.jpg",
    }, */
  /*  {
      id: uuidv4(),
      type: BlockType.TRELLO,
      ref: null,
      content: {
        columns: [
          {
            title: "Tâche",
            dataIndex: "tache",
            typeIndex: typeIndex.TEXT,
            editable: true,
          },
          {
            title: "Statut",
            dataIndex: "statut",
            typeIndex: typeIndex.SELECT,
            editable: true,
          },
          {
            title: "Date de creation",
            dataIndex: "dateCreation",
            typeIndex: typeIndex.DATE,
            editable: false,
          },
          {
            title: "Date de fin",
            dataIndex: "dateFin",
            typeIndex: typeIndex.SELECT,
            editable: true,
          },
        ],
        rows: [
          {
            key: "1",
            tache: "Frontend",
            statut: "started",
            dateCreation: "2023-08-09",
            dateFin: "2023-08-09",
          },
        ],
        trello: {
          columnsTrello: ["En cours", "test"],
          rowsTrello: [
            {
              id: "1",
              content: (
                <div>
                  <h1>Hello world</h1>
                </div>
              ),
              column: "En cours",
            },
            {
              id: "2",
              content: (
                <div>
                  <h1>Hello TOi</h1>
                </div>
              ),
              column: "En cours",
            },
          ],
        },
      },
    }, */
  /* {
      id: uuidv4(),
      type: BlockType.TRELLO,
      ref: null,
      content: {
        columnsTrello: ["En cours"],
        rowsTrello: [
          {
            key: "1",
            tache: "Frontend",
            statut: "started",
            dateCreation: "2023-08-09",
            dateFin: "2023-08-09",
          },
        ],
      },
    }, */
};
