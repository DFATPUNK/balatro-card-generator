const fs = require("fs")
const path = require("path")

const baseDir = path.join(__dirname, "../public/assets")

function generateIndexes() {
  const categories = fs.readdirSync(baseDir).filter((name) => {
    const fullPath = path.join(baseDir, name)
    return fs.statSync(fullPath).isDirectory()
  })

  categories.forEach((category) => {
    const folderPath = path.join(baseDir, category)
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".png"))

    const indexPath = path.join(folderPath, "index.json")
    fs.writeFileSync(indexPath, JSON.stringify(files, null, 2))
    console.log(`✔️  index.json généré pour ${category}`)
  })
}

generateIndexes()