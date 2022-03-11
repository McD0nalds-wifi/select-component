import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EnumsRedux } from 'types'

import { modalAppState } from './../states/modalApp-state'

import { InferActionsTypes, BaseThunkType } from '../redux-store'

/* START - ModalApp additional imports and module code. */

const modalAppReducer = createSlice({
    name: 'modalApp',
    initialState: modalAppState,
    reducers: {
        performComponentInit(state) {},
        performSetModalOpen(state, data: PayloadAction<EnumsRedux.ModalContentType>) {
            state.modalContentType = data.payload
            state.isModalOpen = true
        },
        performSetModalClose(state) {
            state.isModalOpen = false
        },
    },
})

export default modalAppReducer

export type ModalAppStateType = typeof modalAppState
type ActionsTypes = InferActionsTypes<typeof modalAppReducer.actions>
export type ModalAppThunkType = BaseThunkType<ActionsTypes>
