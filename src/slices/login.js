import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  providers: [],
  formData: {},
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      if (payload.value !== null) {
        state.formData[payload.key] = payload.value
      } else {
        state.formData[payload.key] = ""
      }
    },
    setInitialData: state => {
      state.formData = {}
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

export const { setFormData, getProviders, getProvidersSuccess, getProvidersFailure, setInitialData } = loginSlice.actions
export const loginSelector = state => state.login
export default loginSlice.reducer


export function fetchProviders() {
  return async dispatch => {
    dispatch(getProviders())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat("/account/providers/"))
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
      localStorage.setItem('userName', JSON.stringify(formData.username));
      localStorage.setItem('provider', JSON.stringify(formData.provider.code));
      Swal.fire({
        icon: "success",
        title: "Logueado exitosamente",
        showConfirmButton: false,
        timer: 3000,
      })
      .then(function (result) {
        history.push("/main/home");
      })
    } catch (error) {
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
          title: "Sucedió un error al conectar con el API",
          showConfirmButton: false,
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
          if (error.response.data.status === "wrong_credentials") {
            Swal.fire({
              icon: "error",
              title: "Credenciales incorrectas",
              showConfirmButton: true,
              confirmButtonColor: '#3ece2d'
            })
          } else if (error.response.data.status === "user_blocked") {
            Swal.fire({
              icon: "error",
              title: "Usuario bloqueado",
              showConfirmButton: true,
              confirmButtonColor: '#3ece2d'
            })
          } else if (error.response.data.status === "max_sessions_reached") {
            Swal.fire({
              icon: "error",
              title: "Usuario ya tiene una sesión iniciada",
              showConfirmButton: true,
              confirmButtonColor: '#3ece2d'
            })
          }
      }
    }
  }
}


export function logOut(history) {
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
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat(`/authentication/logout/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const data = await response.data
      if (data.status === "logged_out") {
        dispatch(setInitialData())
        localStorage.removeItem('sessionKeyAuth');
        localStorage.removeItem('userName');
        Swal.fire({
          icon: "success",
          title: "Sesión cerrada exitosamente",
          showConfirmButton: false,
          timer: 3000,
        })
        .then(function (result) {
          history.push("/auth");
        })
      } else {
        throw new Error('Sucedió un error durante el logout');
      }
    } catch (error) {
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
