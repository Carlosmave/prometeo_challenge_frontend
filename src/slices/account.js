import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2'

export const initialState = {
  loading: false,
  hasErrors: false,
  isEmpty: false,
  accounts: [],
  selectedAccount: {},
  formData: {},
  dateErrorDisplay: "none",
  movements: [],
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getData: state => {
      state.loading = true
    },
    getAccountsSuccess: (state, { payload }) => {
      state.accounts = payload
      state.loading = false
      state.hasErrors = false
      state.isEmpty = false
    },
    getMovementsSuccess: (state, { payload }) => {
      state.movements = payload
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
    setSelectedAccount: (state, { payload }) => {
      state.selectedAccount = payload
    },
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
    setDateErrorDisplay: (state, { payload }) => {
      state.dateErrorDisplay = payload
    },
  },
})

export const { getData, getAccountsSuccess, getMovementsSuccess, getDataFailure, getDataEmpty, setSelectedAccount,
setFormData, setDateErrorDisplay, setInitialData } = accountSlice.actions
export const accountSelector = state => state.account
export default accountSlice.reducer


export function fetchAccounts(history) {
  return async dispatch => {
    dispatch(getData())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/accounts/?key=${JSON.parse(localStorage.getItem('sessionKeyAuth'))}`))
      const accountsData = await response.data
      if (accountsData.length) {
        dispatch(getAccountsSuccess(accountsData))
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


export function fetchMovements(selectedAccount, data, history) {
  return async dispatch => {
    dispatch(getData())
    try {
      const response = await axios.get(process.env.REACT_APP_PROMETEO_CHALLENGE_BACKEND_API_URI.concat
        (`/account/movements/?key=${JSON.parse(localStorage.getItem
          ('sessionKeyAuth'))}&account=${selectedAccount.number}&currency=${selectedAccount.currency}&date_start=${data.startDate}&date_end=${data.endDate}`))
      const movementsData = await response.data
      if (movementsData.length) {
        dispatch(getMovementsSuccess(movementsData))
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
