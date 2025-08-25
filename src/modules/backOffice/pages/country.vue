<script setup>
import { Country, State, City } from 'country-state-city'
import { ref, watch } from 'vue'

const countries = Country.getAllCountries()
const selectedCountry = ref('')
const selectedState = ref('')
const states = ref([])
const cities = ref([])

watch(selectedCountry, (newCountry) => {
  states.value = State.getStatesOfCountry(newCountry)
  selectedState.value = ''
  cities.value = []
})

watch(selectedState, (newState) => {
  cities.value = City.getCitiesOfState(selectedCountry.value, newState)
})
</script>

<template>
  <div>
    <label>Country</label>
    <select v-model="selectedCountry">
      <option v-for="c in countries" :key="c.isoCode" :value="c.isoCode">
        {{ c.name }}
      </option>
    </select>

    <label>State</label>
    <select v-model="selectedState" :disabled="!states.length">
      <option v-for="s in states" :key="s.isoCode" :value="s.isoCode">
        {{ s.name }}
      </option>
    </select>

    <label>City</label>
    <select :disabled="!cities.length">
      <option v-for="city in cities" :key="city.name">{{ city.name }}</option>
    </select>
  </div>
</template>
