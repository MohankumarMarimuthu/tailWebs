/* eslint-disable @typescript-eslint/no-explicit-any */
// actions.js
export const ADD_DATA = "ADD_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const EDIT_DATA = "EDIT_DATA";

export const addData = (data: any) => ({
  type: ADD_DATA,
  payload: data,
});

export const editData = (data: any) => ({
  type: EDIT_DATA,
  payload: data,
});

export const deleteData = (id: any) => ({
  type: DELETE_DATA,
  payload: id,
});
