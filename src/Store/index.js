import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

    loadedMeetups: [
      {
        imageUrl: 'https://www.maxpixel.net/static/photo/1x/New-York-Lights-Nyc-City-Manhattan-Skyscraper-Usa-3004388.jpg',
        id: 'dfgfdfgdfg',
        title: 'Meetup in NYC',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York'
      },
      {
        imageUrl: 'https://c.pxhere.com/photos/82/d6/light_traffic_shenzhen_night_cars_crossing-953525.jpg!d',
        id: 'fgdfgdfggfd',
        title: 'Meetup in Shenzen',
        date: new Date(),
        location: 'Shenzen',
        description: 'Shenzen, Shenzen '
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gozo_-_Finestra_blu.jpg/800px-Gozo_-_Finestra_blu.jpg',
        id: 'fdgdfdfgdfgdfg',
        title: 'Meetup in gozo',
        date: new Date(),
        location: 'Gozo',
        description: 'Xatt, Gozo'
      },
      {
        imageUrl: 'https://www.publicdomainpictures.net/pictures/210000/velka/malta-harbor-at-sunrise.jpg',
        id: 'dfryjjkjj',
        title: 'Meetup in Malta',
        date: new Date(),
        location: 'Malta',
        description: 'Bugibba, Malta'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').on('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', true)
          })
    },
    createMeetup ({commit}, payload) {
      const meetup = {
        ...payload,
        date: payload.date.toISOString()
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.getDownloadURL[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
