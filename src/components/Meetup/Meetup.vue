<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xx12>
        <v-card>
          <v-card-title>
            <h6 class="title">{{ meetup.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date }} - Where is takes place
            </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac justo vel erat rutrum egestas. Ut turpis libero, sagittis eu sem at, volutpat facilisis diam. Phasellus auctor ex non massa tincidunt viverra. Vivamus rutrum nisl et varius sagittis. Cras placerat tellus eget mauris aliquam, sed congue lorem elementum. Phasellus eu dui vel erat viverra tincidunt. Pellentesque vitae diam lobortis magna luctus tempus. Maecenas mi mauris, feugiat eget lacinia non, aliquam at mauris. Nunc dapibus velit eu mauris porta, interdum tristique purus ultrices. Integer posuere, leo eget accumsan egestas, nulla risus tristique lorem, quis faucibus neque orci eget lectus. Donec id semper ante, quis sodales nulla. Etiam dignissim leo tristique molestie facilisis. Nulla lorem velit, dictum ac augue sit amet, pulvinar vestibulum arcu.</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      }
    }
  }
</script>

<style scoped>
</style>
