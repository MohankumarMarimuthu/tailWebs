// reducer.js
import { ADD_DATA, DELETE_DATA, EDIT_DATA } from "./actions";

const initialState = {
  data: [
    {
      id: "12",
      name: "Sean Abot",
      subject: "Maths",
      date: "2024-05-21",
      marks: 77,
    },
    {
      id: "32",
      name: "Shown Tate",
      subject: "English",
      date: "2024-05-11",
      marks: 72,
    },
    {
      id: "42",
      name: "Shivam",
      subject: "Physics",
      date: "2024-05-04",
      marks: 78,
    },
  ],
};

const studentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_DATA:
      return {
        ...state,
        data: state.data.filter((item: any) => item.id !== action.payload),
      };
    case EDIT_DATA:
      return {
        ...state,
        data: state.data
          .filter((item: any) => item !== null)
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
      };
    default:
      return state;
  }
};

export default studentReducer;
