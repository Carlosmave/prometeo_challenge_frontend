import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  hasErrors: false,
  isEmpty: false,
  clients: [],
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    getClients: state => {
      state.loading = true
    },
    getClientsSuccess: (state, { payload }) => {
      state.clients = payload
      state.loading = false
      state.hasErrors = false
      state.isEmpty = false
    },
    getClientsEmpty: state => {
      state.loading = false
      state.hasErrors = false
      state.isEmpty = true
    },
    getClientsFailure: state => {
      state.loading = false
      state.hasErrors = true
      state.isEmpty = false
    },
  },
})

export const { getClients, getClientsSuccess, getClientsFailure, getClientsEmpty } = clientSlice.actions
export const clientSelector = state => state.client
export default clientSlice.reducer


export function fetchClients(history) {
  return async dispatch => {
    dispatch(getClients())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/clients/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const clientsData = await response.data
      if (Object.keys(clientsData).length) {
        dispatch(getClientsSuccess(clientsData))
      } else {
        dispatch(getClientsEmpty())
      }
    } catch (error) {
      dispatch(getClientsFailure())
      if (error.code === "ECONNABORTED"){
        Swal.fire({
          icon: "error",
          title: "Se agotó el tiempo de espera",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d'
        })
      } else if (error.response === undefined) {
        Swal.fire({
          icon: "error",
          title: "Sucedió un error al obtener los datos",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d'
        })
      } else if (error.response.data.message === "Invalid key") {
        Swal.fire({
          icon: "error",
          title: "Su sesión ha expirado, se cerrará la sesión",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d',
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        .then(function (result) {
          localStorage.removeItem('sessionKeyAuth');
          localStorage.removeItem('userName');
          history.push("/auth");
        })
      }
    }
  }
}
