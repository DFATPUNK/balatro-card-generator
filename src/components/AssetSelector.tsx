import { useState, useEffect } from "react"

interface AssetSelectorProps {
  label: string
  folder: string
  onSelect: (path: string) => void
  selected?: string
}

export default function AssetSelector({ label, folder, onSelect, selected }: AssetSelectorProps) {
  const [assets, setAssets] = useState<string[]>([])

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(`/assets/${folder}/index.json`)
        const files: string[] = await res.json()
        const fullPaths = files.map(file => `/assets/${folder}/${file}`)
        setAssets(fullPaths)
      } catch (err) {
        console.error("Erreur chargement assets:", err)
      }
    }
  
    fetchAssets()
  }, [folder])  

  return (
    <div>
      <h4>{label}</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {assets.map((src) => (
          <img
            key={src}
            src={src}
            alt={src}
            width={60}
            height={60}
            style={{
              border: selected === src ? "2px solid red" : "1px solid #ccc",
              cursor: "pointer",
              borderRadius: 4
            }}
            onClick={() => onSelect(src)}
          />
        ))}
      </div>
    </div>
  )
}