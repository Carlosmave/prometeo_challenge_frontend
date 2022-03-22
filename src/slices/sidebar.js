import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  collapseOpen: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    sidebarToggle: state => {
      state.collapseOpen = !state.collapseOpen
    },
    sidebarClose: state => {
      state.collapseOpen = false
    },
  },
})

export const { sidebarToggle, sidebarClose } = sidebarSlice.actions
export const sidebarSelector = state => state.sidebar
export default sidebarSlice.reducer
