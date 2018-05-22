import { myAxios } from '@/utils/interaction'

const state = {
  currentAlbumId: undefined,
  albumList: [],
  fileList: []
}

const actions = {
  addAlbum: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'album/add',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          let data = [].concat(state.albumList, res.data.data)
          commit('setInfo', {
            albumList: data
          })
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
  getAllAlbum: ({commit, dispatch, getters, state}) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'GET',
        url: 'album/all'
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', {
            albumList: res.data.data
          })
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
  deleteAlbum: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'album/delete',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
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
  getAllFile: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'file/all',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          commit('setInfo', {
            fileList: res.data.data
          })
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
  addFiles: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'file/upload',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
          let data = res.data.data.concat(state.fileList)
          commit('setInfo', {
            fileList: data
          })
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
  deleteFile: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      myAxios({
        method: 'POST',
        url: 'file/delete',
        data: data
      }).then(function (res) {
        if (res.data.state.toString() === '1') {
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
  setState: ({commit, dispatch, getters, state}, data) => {
    return new Promise((resolve, reject) => {
      commit('setInfo', data)
      resolve()
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
