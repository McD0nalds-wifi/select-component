import { EnumsRedux } from 'types'

/* START - ModalApp additional imports and module code. */

export const modalAppState = {
    isModalOpen: false as boolean,
    modalContentType: null as EnumsRedux.ModalContentType | null,
}
