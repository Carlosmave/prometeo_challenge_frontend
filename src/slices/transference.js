import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  formData: {},
  accounts: [],
  transferDestinations: [],
  currencies: [{name: "PEN", code: "PEN"}, {name: "USD", code: "USD"}, {name: "UYU", code: "UYU"}],
  accountErrorDisplay: "none",
}

const transferenceSlice = createSlice({
  name: 'transference',
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
    getData: state => {
      state.loading = true
    },
    getTransferenceDataSuccess: (state, { payload }) => {
      state.accounts = payload.accounts
      state.transferDestinations = payload.transferDestinations
      state.loading = false
      state.hasErrors = false
      state.isEmpty = false
    },
    getDataFailure: state => {
      state.loading = false
    },
    setAccountErrorDisplay: (state, { payload }) => {
      state.accountErrorDisplay = payload
    },
  },
})

export const { setFormData, getData, getTransferenceDataSuccess, getDataFailure, setInitialData, setAccountErrorDisplay } = transferenceSlice.actions
export const transferenceSelector = state => state.transference
export default transferenceSlice.reducer


export function fetchTransfererenceData(history) {
  return async dispatch => {
    dispatch(getData())
    try {
      const accountsResponse = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/accounts/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const accountsData = await accountsResponse.data
      const transferDestinationsResponse = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/transfer-destinations/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const transferDestinationsData = await transferDestinationsResponse.data
      const transferenceData = {accounts: accountsData, transferDestinations: transferDestinationsData}
      dispatch(getTransferenceDataSuccess(transferenceData))
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


export function submitTransferenceForm(formData, history) {
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
      const transferenceResponse = await axios.post(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/transferences/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`), formData)
      const transferenceData = await transferenceResponse.data
      Swal.fire({
        title: '¿Está seguro que desea realizar la transferencia?',
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: `Transferir`,
        cancelButtonColor: 'red',
        confirmButtonColor: '#3ece2d'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "info",
            title: "Cargando",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          Swal.showLoading();
          confirmTransference(transferenceData, history)
        } else {
          Swal.close()
        }
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


const confirmTransference = async (transferenceData, history) => {
  const confirmTransferenceResponse = await axios.post(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
    (`/account/transferences/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}&confirm=true`), transferenceData)
  const confirmTransferenceData = await confirmTransferenceResponse.data
  Swal.fire({
    icon: "success",
    title: `Transferencia con número ${confirmTransferenceData.message.split(": ")[1]} realizada exitosamente`,
    showConfirmButton: false,
    timer: 3000,
  })
  .then(function (result) {
    history.go(0)
  })
}
