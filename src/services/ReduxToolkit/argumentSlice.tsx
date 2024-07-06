// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BaseType {
  id: string;
  description: string;
  importance: number;
  type: string;
  TopicName: string;
}

export interface ArgumentType extends BaseType {}

export interface DilemmaType extends BaseType {
  Date: string;
  Time: string;
}

// interface ArgumentState {
//   argumentArray: ArgumentType[];
// }

// const initialState: ArgumentState = {
//   argumentArray: [],
// };

// const argumentSlice = createSlice({
//   name: 'argument',
//   initialState,
//   reducers: {
//     Argument_Add_Array: (state, action: PayloadAction<ArgumentType>) => {
//       state.argumentArray.push(action.payload);
//     },
//     Argument_Update_Array: (state, action: PayloadAction<ArgumentType>) => {
//       const index = state.argumentArray.findIndex(
//         item => item.id === action.payload.id,
//       );
//       if (index !== -1) {
//         state.argumentArray[index] = action.payload;
//       }
//     },
//   },
// });

// export const {Argument_Add_Array, Argument_Update_Array} =
//   argumentSlice.actions;
// export default argumentSlice.reducer;
