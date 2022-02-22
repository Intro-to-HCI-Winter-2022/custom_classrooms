import {createSlice} from '@reduxjs/toolkit';

const characterSlice = createSlice({
    name: 'character',
    initialState: {
        x: 3,
        y: 11,        
        heroClass: 'FLAME_SWORDSMAN',
        heroImg: null,
    },
    reducers: {
        move(state, action) {
            const [x, y] = action.payload;       
            state.x+=x;
            state.y+=y;
        },
        bufferImage(state, action) {
            state.heroImg = action.payload;
        }
    }
});

export const { move, bufferImage } = characterSlice.actions;

export default characterSlice.reducer;