import { useEffect, useState } from "react"
import index from "../assets/index.json"
import "../App.css"

interface AssetSelectorProps {
  label: string
  folder: string
  selected: string
  onSelect: (path: string) => void
  columns?: number
  rows?: number
}

export default function AssetSelector({ label, folder, selected, onSelect, columns }: AssetSelectorProps) {
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    const folderIndex = index[folder as keyof typeof index] || []
    setPaths(folderIndex.map((filename: string) => `/assets/${folder}/${filename}`))
  }, [folder])

  return (
    <div className="asset-selector">
      <h3 className="balatro-section-title">{label}</h3>
      <div className="scroll-zone">
        <div
          className="balatro-asset-grid"
          style={{
            gridTemplateColumns: `repeat(${columns ?? 4}, 1fr)`
          }}
        >
          {paths.map((path) => (
            <div
              key={path}
              onClick={() => onSelect(path)}
              style={{
                border: path === selected ? "2px solid #007bff" : "2px solid transparent",
                borderRadius: 4,
                width: 72,
                height: 72,
                boxSizing: "border-box"
              }}
            >
              <div className="balatro-asset-wrapper">
                <div className="balatro-asset-inner">
                  <img
                    src={path}
                    alt="asset"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}