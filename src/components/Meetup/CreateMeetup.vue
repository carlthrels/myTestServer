<template>
  <v-contauner>
    <v-layout row>
      <v-flex xs12>
        <h4 class="primary--text">Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              requied>
              </v-text-field>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-contauner>
</template>
