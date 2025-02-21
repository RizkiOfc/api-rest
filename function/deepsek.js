const axios = require("axios")

async function deepseek(query) {
        let { data } = await axios.post("https://api.blackbox.ai/api/chat", {
            messages: [{ id: null, role: "user", content: query }],
            userSelectedModel: "deepseek-v3"
        })
        return data
    }
