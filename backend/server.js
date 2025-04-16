require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// 替换为你的百度API密钥（后续步骤获取）
const BAIDU_API_KEY = process.env.BAIDU_API_KEY

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body
    
    // 调用百度AI接口（模拟响应）
    const mockResponse = {
      data: {
        image_url: `https://via.placeholder.com/800x600/FFD700/000000?text=${encodeURIComponent(prompt)}`
      }
    }
    
    // 实际使用时替换为：
    // const response = await axios.post(
    //   'https://aip.baidubce.com/rpc/2.0/ernievilg/v1/txt2img',
    //   { text: prompt, style: "中国画" },
    //   { headers: { 'Authorization': `Bearer ${BAIDU_API_KEY}` } }
    // )

    res.json(mockResponse.data)
  } catch (error) {
    console.error('API调用失败:', error)
    res.status(500).json({ error: '生成失败' })
  }
})

app.listen(3000, () => {
  console.log('后端服务运行在 http://localhost:3000')
})