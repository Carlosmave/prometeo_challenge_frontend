import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  providers:[],
  formData: {},
}


const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      if (payload.value !== null) {
        state.formData[payload.key] = payload.value
      } else {
        state.formData[payload.key] = ""
      }
    },
    getProviders: state => {
      state.loading = true
    },
    getProvidersSuccess: (state, { payload }) => {
      state.providers = payload
      state.loading = false
    },
    getProvidersFailure: state => {
      state.loading = false
    },
  },
})

export const { setFormData, getProviders, getProvidersSuccess, getProvidersFailure } = loginFormSlice.actions
export const loginFormSelector = state => state.loginForm
export default loginFormSlice.reducer


export function fetchProviders() {
  return async dispatch => {
    dispatch(getProviders())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat("/authentication/providers/"))
      const providersData = await response.data
      dispatch(getProvidersSuccess(providersData))
    } catch (error) {
      dispatch(getProvidersFailure())
      if (error.code === "ECONNABORTED"){
        Swal.fire({
          icon: "error",
          title: "Se agotó el tiempo de espera",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d'
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Sucedió un error al obtener los datos",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d'
        })
      }
    }
  }
}


export function submitLoginForm(formData, history) {
  return async dispatch => {
    Swal.fire({
      icon: "info",
      title: "Cargando",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
    Swal.showLoading();
    try {
      const response = await axios.post(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat("/authentication/login/"), formData)
      const data = await response.data
      localStorage.setItem('sessionKeyAuth', JSON.stringify(data.key));
      Swal.fire({
        icon: "success",
        title: "Logueado exitosamente",
        showConfirmButton: false,
        timer: 3000,
      })
      .then(function (result) {
        console.log("LOGUEADO EXITOSAMENTE")
        // history.push("/main/index");
      })
    } catch (error) {
      if (error.code === "ECONNABORTED"){
        Swal.fire({
          icon: "error",
          title: "Se agotó el tiempo de espera",
          showConfirmButton: true,
          confirmButtonColor: '#3ece2d'
        })
      } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Proveedor no autorizado",
            showConfirmButton: true,
            confirmButtonColor: '#3ece2d'
          })
      } else if (error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            showConfirmButton: true,
            confirmButtonColor: '#3ece2d'
          })
      } else {
        Swal.fire({
          icon: "error",
          title: "Sucedió un error al conectar con el API",
          showConfirmButton: false,
          confirmButtonColor: '#3ece2d'
        })
      }
    }
  }
}
