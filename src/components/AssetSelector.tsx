import { useEffect, useState } from "react"
import index from "../assets/index.json"

interface AssetSelectorProps {
  label: string
  folder: string
  selected: string
  onSelect: (path: string) => void
  columns?: number
  rows?: number
}

export default function AssetSelector({ label, folder, selected, onSelect, columns, rows }: AssetSelectorProps) {
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    const folderIndex = index[folder as keyof typeof index] || []
    setPaths(folderIndex.map((filename: string) => `/assets/${folder}/${filename}`))
  }, [folder])

  return (
    <div>
      <h3 style={{ marginBottom: 12 }}>{label}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns ?? 4}, 1fr)`,
          gap: 12,
          maxHeight: "calc(100vh - 240px)",
          overflowY: "auto"
        }}
      >
        {paths.map((path) => (
            <div
                key={path}
                onClick={() => onSelect(path)}
                style={{
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                border: path === selected ? "2px solid #007bff" : "2px solid transparent",
                borderRadius: 4
                }}
            >
                <img
                    src={path}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        imageRendering: "pixelated"
                    }}
                />
            </div>       
        ))}
      </div>
    </div>
  )
}