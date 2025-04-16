<template>
  <div class="container">
    <h1>文化创意AI生成器</h1>
    <div class="input-group">
      <input 
        v-model="prompt" 
        placeholder="尝试输入：敦煌飞天、青花瓷..."
        @keyup.enter="generateArt"
      />
      <button @click="generateArt">生成作品</button>
    </div>
    <div v-if="loading" class="loading">AI正在创作中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <img v-if="imageUrl" :src="imageUrl" class="art-image"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const prompt = ref('')
const imageUrl = ref('')
const loading = ref(false)
const error = ref('')

const generateArt = async () => {
  if (!prompt.value.trim()) {
    error.value = '请输入描述文字'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.post('http://localhost:3000/api/generate', {
      prompt: `${prompt.value}，中国风，高清，文化创意`
    })
    imageUrl.value = response.data.image_url
  } catch (err) {
    error.value = '生成失败，请重试'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style>
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
.input-group { display: flex; gap: 10px; margin: 20px 0; }
input { flex: 1; padding: 10px; border: 1px solid #ccc; }
button { padding: 10px 20px; background: #4CAF50; color: white; border: none; }
.art-image { max-width: 100%; margin-top: 20px; border: 1px solid #eee; }
.loading { color: #666; margin: 10px 0; }
.error { color: red; margin: 10px 0; }
</style>