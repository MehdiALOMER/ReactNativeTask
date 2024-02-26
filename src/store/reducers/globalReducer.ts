import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { GlobalService } from '@/services/globalService';
import { IPromotion, IPromotionList, ITag } from '@/types/dataTypes';


const getTagsThunk = createAsyncThunk("tags/list", async (payload: void, { dispatch }) => {
    dispatch(setLoading(true));
    let response = await GlobalService.getTags();

    if (response?.status === 200) {
        dispatch(setLoading(false));
        return response?.data;
    } else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});
const getPromotionsThunk = createAsyncThunk("promotions/list", async (payload: void, { dispatch }) => {
    dispatch(setLoading(true));
    let response = await GlobalService.getPromotions();

    if (response?.status === 200) {
        dispatch(setLoading(false));
        return response?.data;
    } else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});
const getPromotionDetailThunk = createAsyncThunk("promotion/detail", async ({ id, navigation, dispatch }: { id: number, navigation: any, dispatch: any }) => {
    dispatch(setLoading(true));
    let response = await GlobalService.getPromotionDetail(id);

    if (response?.status === 200) {
        dispatch(setLoading(false));
        navigation.navigate("DetailScreen");
        return response?.data;
    }
    else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});
const globalSlice = createSlice({
    name: 'global',
    initialState: {
        tagList: [] as ITag[],
        promotionList: [] as IPromotionList[],
        promotionDetail: {} as IPromotion
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTagsThunk.fulfilled, (state, action) => {
            state.tagList = action.payload;
        });
        builder.addCase(getPromotionsThunk.fulfilled, (state, action) => {
            state.promotionList = action.payload;
        });
        builder.addCase(getPromotionDetailThunk.fulfilled, (state, action) => {
            state.promotionDetail = action.payload;
        });
    }
});

export const { } = globalSlice.actions;

export { getTagsThunk, getPromotionsThunk, getPromotionDetailThunk };

export default globalSlice.reducer;