// scripts/generateAssetIndexes.js
const fs = require("fs")
const path = require("path")

const basePath = path.join(__dirname, "../public/assets")
const output = {}

fs.readdirSync(basePath).forEach((folder) => {
  const fullPath = path.join(basePath, folder)
  if (fs.lstatSync(fullPath).isDirectory()) {
    output[folder] = fs.readdirSync(fullPath).filter((f) => f.endsWith(".png"))
  }
})

fs.writeFileSync(path.join(basePath, "index.json"), JSON.stringify(output, null, 2))