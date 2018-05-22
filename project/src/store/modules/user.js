import { myAxios } from '@/utils/interaction'

const state = {
  userName: '',
  email: '',
  userId: undefined
}

const actions = {
  login: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'user/login',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', res.data.data)
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  register: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'user/register',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', res.data.data)
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  getInfo: ({commit, dispatch, getters, state}) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'GET',
        url: 'user/info'
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', res.data.data)
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  exit: ({commit, dispatch, getters, state}) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'GET',
        url: 'user/exit'
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', res.data.data)
          resolve({
            state: true,
            info: res.data.stateInfo
          })
        } else {
          resolve({
            state: false,
            info: res.data.stateInfo
          })
        }
      }).catch(function (err) {
        reject(err)
      })
    })
  }
}

const mutations = {
  setInfo: (state, datas) => {
    Object.assign(state, datas)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
