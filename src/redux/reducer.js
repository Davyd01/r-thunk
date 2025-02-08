import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchData", async (url, { rejectWithValue }) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
        }
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const dataSlice = createSlice({
    name: "data",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {
        clearData(state) {
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Запрос данных начат...");
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log("Полученные данные:", action.payload); 
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error("Ошибка при загрузке данных:", action.payload); 
            });
    },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
