<template>
  <router-link :to="props.link">
    <a-card hoverable style="width: 100%; min-width: 240px">
      <template #cover>
        <img alt="example" :src="props.image" />
      </template>
      <a-card-meta :title="props.title"></a-card-meta>
    </a-card>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
</script>
