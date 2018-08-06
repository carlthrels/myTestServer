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
        date: '2018-07-23'
      },
      {
        imageUrl: 'https://c.pxhere.com/photos/82/d6/light_traffic_shenzhen_night_cars_crossing-953525.jpg!d',
        id: 'fgdfgdfggfd',
        title: 'Meetup in Shenzen',
        date: '2018-09-23'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Gozo_-_Finestra_blu.jpg/800px-Gozo_-_Finestra_blu.jpg',
        id: 'fdgdfdfgdfgdfg',
        title: 'Meetup in gozo',
        date: '2018-12-25'
      },
      {
        imageUrl: 'https://www.publicdomainpictures.net/pictures/210000/velka/malta-harbor-at-sunrise.jpg',
        id: 'dfryjjkjj',
        title: 'Meetup in Malta',
        date: '2019-01-01'
      }
    ],
    user: {
      id: 'fgdfgdklfgjdfkgjdfk',
      registeredMeetups: ['fghjghfjlkjfglhkd']
    }
  },
  mutations: {},
  actions: {},
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