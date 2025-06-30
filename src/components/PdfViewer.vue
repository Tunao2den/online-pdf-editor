<template>
  <div class="pdf-container">
    <input type="file" accept="application/pdf" @change="onFileChange" />
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Worker yolu ayarlanmalı (önemli!)
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

const canvasRef = ref(null)

const onFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const fileReader = new FileReader()

  fileReader.onload = async function () {
    const typedarray = new Uint8Array(this.result)

    const loadingTask = pdfjsLib.getDocument(typedarray)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)

    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = canvasRef.value
    const context = canvas.getContext('2d')

    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }
    await page.render(renderContext).promise
  }

  fileReader.readAsArrayBuffer(file)
}
</script>

<style scoped>
.pdf-container {
  padding: 20px;
  text-align: center;
}
canvas {
  margin-top: 20px;
  border: 1px solid #ccc;
}
</style>
