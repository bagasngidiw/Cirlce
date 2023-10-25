import { IThreadCard } from "../../interface/interface"
import { createSlice } from "@reduxjs/toolkit"

const initialThreadState:  { threads: IThreadCard[] } = { threads: [] };

export const threadSlice = createSlice({
    name: 'thread',
    initialState: initialThreadState,
    reducers: {
        GET_THREAD: (state, action) =>{
            state.threads = action.payload;
        },

        SET_THREAD_LIKE: (
            state,
            action: { payload: { id: number; isLiked: boolean } }
            ) => {
            const { id, isLiked } = action.payload;
      
            state.threads = state.threads.map((thread) => {
              if (thread.id === id) {
                return {
                  ...thread,
                  likes_count: isLiked
                    ? thread.likes_count - 1
                    : thread.likes_count + 1,
                  is_liked: !isLiked,
                };
              }
              console.log("ini jumlah like", thread.likes_count);
              
              return thread;
            });
        },
    }
})