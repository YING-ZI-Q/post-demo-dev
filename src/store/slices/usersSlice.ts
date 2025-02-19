import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

interface User {
  id: string,
  name: string
}
// const initialState = [
//   { id: "0", name: "Tianna Jenkins" },
//   { id: "1", name: "Kevin Grant" },
//   { id: "2", name: "Madison Price" },
// ]

const initialState: User[] = []

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/api/users");
  return response.json();
});


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload, 'pay');
      return action.payload;
    });
  },
})
export default usersSlice.reducer;