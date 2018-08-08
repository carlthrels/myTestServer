import Vue from 'vue'
import Vuex from 'vuex'

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
        description: 'Bugubba, Malta'
      }
    ],
    user: {
      id: 'fgdfgdklfgjdfkgjdfk',
      registeredMeetups: ['fghjghfjlkjfglhkd']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        ...payload,
        id: 'gfpodgfbpjipji'
      }
      // Reach out to firebase and store
      commit('createMeetup', meetup)
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
    }
  }
})
