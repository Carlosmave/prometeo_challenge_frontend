import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  hasErrors: false,
  provider: {},
}

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    getProvider: state => {
      state.loading = true
    },
    getProviderSuccess: (state, { payload }) => {
      state.provider = payload
      state.loading = false
      state.hasErrors = false
    },
    getProviderFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getProvider, getProviderSuccess, getProviderFailure } = providerSlice.actions
export const providerSelector = state => state.provider
export default providerSlice.reducer


export function fetchProvider(history) {
  return async dispatch => {
    dispatch(getProvider())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/providers/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}&provider=${JSON.parse(localStorage.getItem('provider'))}`))
      const providerData = await response.data
      dispatch(getProviderSuccess(providerData))
    } catch (error) {
      dispatch(getProviderFailure())
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
