import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";

const initialState = null as React.ReactNode;

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        closePopup() {
            return null;
        },

        openPopup(state: ReactNode, view: PayloadAction<ReactNode>) {
            return view.payload;
        },
    }
});

export const { closePopup, openPopup } = popupSlice.actions;
export default popupSlice.reducer;