<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <img :src="imageUrl" height="150px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose Date and time</h4>
            </v-flex>
          </v-layout>
          <div>
            <v-layout row mb-2>
              <v-flex xs12 sm offset-sm3>
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm offset-sm3>
                <v-time-picker
                  format="24hr"
                  v-model="time">
                </v-time-picker>
              </v-flex>
            </v-layout>
          </div>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary"
                     :disabled="!formIsValid"
                     type="submit">Create Meetup
                {{ timeSubmit }}
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'
  let now = moment().format('YYYY-MM-DD')

  export default {
    data () {
      return {
        title: '',
        location: '',
        description: '',
        imageUrl: '',
        date: now,
        time: new Date(),
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.description !== '' &&
          this.imageUrl !== '' &&
          this.date !== '' &&
          this.time !== ''
      },
      timeSubmit () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.timeSubmit
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }
    }
  }
</script>
