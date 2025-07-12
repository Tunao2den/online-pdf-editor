<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'


const router = useRouter()
const selectedFileName = ref('')


function handleFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    selectedFileName.value = file.name
    router.push('/editor')
  } else {
    alert('PDF invalid')
  }
}

</script>

<template>
  <div class="welcome-container">
    <h1>Welcome to Online PDF Editor</h1>
    <p>Edit your PDF's easily and securely without registering</p>
    <div class="upload-wrapper">
      <input type="file" id="pdfInput" accept="application/pdf" @change="handleFileChange" hidden/>
      <label for="pdfInput" class="upload-button">
        Select a PDF
      </label>
      <p class="file-info">
        {{ selectedFileName || 'No file selected' }}
      </p>
    </div>

  </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
}
.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.upload-button {
  background-color: #4f46e5;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #3730a3;
}

.file-info {
  font-size: 0.9rem;
  color: #aaa;
}
</style>