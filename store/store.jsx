// store.js
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedHotelId:'',
    allHotels:[],
    savedHotels:[],
    selectedHotel:[],
    allCars:[],
};

const counterSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setSelectedHotelId: (state, action) => {
            state.selectedHotelId = action.payload;
        },
        setAllHotels: (state, action) => {
            state.allHotels = action.payload;
        },
        setSelectedHotel(state, action) {
            state.selectedHotel = action.payload;
        },
        setAllCars(state, action) {
            state.allCars = action.payload;
        }
    },
});

export const { setSelectedHotelId, setAllHotels ,setSelectedHotel,setAllCars} = counterSlice.actions;

export const store = configureStore({
    reducer: {
        user: counterSlice.reducer,
    },
});
