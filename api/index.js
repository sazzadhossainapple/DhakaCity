const express = require("express")
const fs = require("fs")
const path = require("path")

// Initialize express
const app = express()

// Middleware to parse JSON
app.use(express.json())

// GET endpoint to return list from JSON
app.get("/api/dhaka-city-area", (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "dhaka.json")
    const data = fs.readFileSync(filePath, "utf8")
    const items = JSON.parse(data)
    res.json(items)
  } catch (err) {
    console.error("Error:", err)
    res.status(500).json({ error: "Error reading or parsing data file." })
  }
})

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

// Export for Vercel
module.exports = app
