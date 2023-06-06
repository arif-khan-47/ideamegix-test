// src/services/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

let nextId = 1; // Initialize nextId outside of the slice

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const user = { ...action.payload, id: nextId++ }; // Increment nextId and assign it to the user
      state.users.push(user as any);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { id, firstName, lastName, status } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.status = status;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload as never);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
