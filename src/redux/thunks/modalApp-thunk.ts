import { EnumsRedux } from 'types'

import modalAppReducer, { ModalAppThunkType } from '../reducers/modalApp-reducer'

// import * as util from '../../common/util'

/* START - ModalApp additional imports and module code. */

// /**
//  * Thunk opens modal window
//  * @param {EnumsRedux.ModalContentType} modalType modal window type
//  */
// export const performSetModalOpen =
//     (modalType: EnumsRedux.ModalContentType): ModalAppThunkType =>
//     (dispatch, getState) => {
//         /* START - thunk performSetModalOpen before execute code. */
//         /* END - thunk performSetModalOpen before execute code. */
//         dispatch(modalAppReducer.actions.performSetModalOpen(modalType))
//         /* START - thunk performSetModalOpen after execute code. */
//         /* END - thunk performSetModalOpen after execute code. */
//     }

// /**
//  * Thunk closes modal window
//  */
// export const performSetModalClose = (): ModalAppThunkType => (dispatch, getState) => {
//     /* START - thunk performSetModalClose before execute code. */
//     /* END - thunk performSetModalClose before execute code. */
//     dispatch(modalAppReducer.actions.performSetModalClose())
//     /* START - thunk performSetModalClose after execute code. */
//     /* END - thunk performSetModalClose after execute code. */
// }
