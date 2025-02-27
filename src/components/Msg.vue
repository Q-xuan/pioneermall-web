<script setup lang="ts">
import { useMsgStore } from '../stores/common/msg';


const message = useMsgStore()
</script>

<template>
  <v-snackbar
    v-model="message.visible"
    :color="message.color"
    timeout="-1"
    rounded="pill"
    min-width="300"
  >
    {{ message.msg }}
    <template #actions>
      <v-btn
        color="white"
        icon="mdi-close"
        @click="message.visible = false"
      />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>