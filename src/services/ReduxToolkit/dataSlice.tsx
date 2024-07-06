// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// // Define the structure of a dilemma item
// export interface DilemmaType {
//   id: string;
//   description: string;
//   importance: number;
//   type: string;
//   TopicName: string;
//   ItemDate: string;
//   ItemTime: string;
// }

// // Define the structure of the Redux state
// export type ReduxStateType = {
//   array1: DilemmaType[];
//   removedItems: DilemmaType[];
//   updated: DilemmaType[];
//   selectedItems: DilemmaType[];
// };

// // Initial state
// const initialState: ReduxStateType = {
//   array1: [],
//   removedItems: [],
//   updated: [],
//   selectedItems: [],
// };

// // Create the data slice
// const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   reducers: {
//     PushToArray: (state, action: PayloadAction<DilemmaType>) => {
//       state.array1.push(action.payload);
//     },
//     UpdateArrayItem: (
//       state,
//       action: PayloadAction<{id: string; TopicName: string}>,
//     ) => {
//       const {id, TopicName} = action.payload;
//       const index = state.array1.findIndex(item => item.id === id);
//       if (index !== -1) {
//         state.array1[index].TopicName = TopicName;
//       }
//     },
//     DeleteFromArray: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       const item = state.array1.find(i => i.id === id);
//       if (item) {
//         state.array1 = state.array1.filter(i => i.id !== id);
//         state.removedItems.push(item);
//       }
//     },
//     PermanentlyDeleteFromRemovedItems: (
//       state,
//       action: PayloadAction<string>,
//     ) => {
//       state.removedItems = state.removedItems.filter(
//         i => i.id !== action.payload,
//       );
//     },
//     RestoreToArray: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       const item = state.removedItems.find(i => i.id === id);
//       if (item) {
//         state.removedItems = state.removedItems.filter(i => i.id !== id);
//         state.array1.push(item);
//       }
//     },
//     ClearSelection: (state, action: PayloadAction<string>) => {
//       const payloadId = action.payload;
//       state.selectedItems = state.selectedItems.filter(
//         item => item.id !== payloadId,
//       );
//     },
//   },
// });

// // Export the actions and reducer
// export const {
//   PushToArray,
//   UpdateArrayItem,
//   DeleteFromArray,
//   PermanentlyDeleteFromRemovedItems,
//   RestoreToArray,
//   ClearSelection,
// } = dataSlice.actions;

// export default dataSlice.reducer;
