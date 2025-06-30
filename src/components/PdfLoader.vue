<template>
  <div class="upload-screen">
    <h2>PDF Yükleyin</h2>
    <input type="file" accept="application/pdf" @change="handleFileUpload" />
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['pdf-selected'])

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      emit('pdf-selected', fileReader.result)
    }
    fileReader.readAsArrayBuffer(file)
  }
}
</script>

<style scoped>
.upload-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>
