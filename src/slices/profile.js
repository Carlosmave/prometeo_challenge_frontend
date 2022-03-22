import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  hasErrors: false,
  profile: {},
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: state => {
      state.loading = true
    },
    getProfileSuccess: (state, { payload }) => {
      state.profile = payload
      state.loading = false
      state.hasErrors = false
    },
    getProfileFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getProfile, getProfileSuccess, getProfileFailure } = profileSlice.actions
export const profileSelector = state => state.profile
export default profileSlice.reducer


export function fetchProfile(history) {
  return async dispatch => {
    dispatch(getProfile())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/profile/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const profileData = await response.data
      dispatch(getProfileSuccess(profileData))
    } catch (error) {
      dispatch(getProfileFailure())
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
