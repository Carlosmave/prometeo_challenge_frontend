import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  hasErrors: false,
  isEmpty: false,
  transferDestinations: [],
}

const transferDestinationSlice = createSlice({
  name: 'transferDestination',
  initialState,
  reducers: {
    getData: state => {
      state.loading = true
    },
    getTransferDestinationsSuccess: (state, { payload }) => {
      state.transferDestinations = payload
      state.loading = false
      state.hasErrors = false
      state.isEmpty = false
    },
    getDataEmpty: state => {
      state.loading = false
      state.hasErrors = false
      state.isEmpty = true
    },
    getDataFailure: state => {
      state.loading = false
      state.hasErrors = true
      state.isEmpty = false
    },
  },
})

export const { getData, getTransferDestinationsSuccess, getDataFailure, getDataEmpty } = transferDestinationSlice.actions
export const transferDestinationSelector = state => state.transferDestination
export default transferDestinationSlice.reducer


export function fetchTransferDestinations(history) {
  return async dispatch => {
    dispatch(getData())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/transfer-destinations/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const transferDestinationsData = await response.data
      if (transferDestinationsData.length) {
        dispatch(getTransferDestinationsSuccess(transferDestinationsData))
      } else {
        dispatch(getDataEmpty())
      }
    } catch (error) {
      dispatch(getDataFailure())
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
