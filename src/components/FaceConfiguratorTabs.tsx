import { useState, useEffect } from "react"
import AssetSelector from "./AssetSelector"
import CardBuilder from "./CardBuilder"
import { JokerFaceConfig } from "../types/JokerFaceConfig"

interface FaceConfiguratorTabsProps {
  config: JokerFaceConfig
  onChange: (newConfig: JokerFaceConfig) => void
}

const tabs: {
  key: keyof JokerFaceConfig
  label: string
  folder: string
  columns?: number
  rows?: number
}[] = [
  { key: "background", label: "Recto", folder: "rectos" },
  { key: "collar", label: "Collet", folder: "collars", columns: 2, rows: 6 },
  { key: "eyes", label: "Yeux", folder: "eyes", columns: 3, rows: 7 },
  { key: "nose", label: "Nez", folder: "noses", columns: 3, rows: 4 },
  { key: "mouth", label: "Sourire", folder: "smiles", columns: 2, rows: 7 },
  { key: "hat", label: "Chapeau", folder: "hats", columns: 2, rows: 6 },
  { key: "overlay", label: "Overlay", folder: "layers" }
]

export default function FaceConfiguratorTabs({ config, onChange }: FaceConfiguratorTabsProps) {
  const [activeTab, setActiveTab] = useState<keyof JokerFaceConfig>("collar")

  const handleSelect = (key: keyof JokerFaceConfig) => (value: string) => {
    onChange({ ...config, [key]: value })
  }

  const active = tabs.find((tab) => tab.key === activeTab)

  useEffect(() => {
    onChange(config)
  }, [])  

  return (
    <div
      style={{
        display: "flex",
        padding: 24,
        gap: 32,
        minHeight: "100vh",
        backgroundImage: "url('/balatro_theme.crt.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "8px 12px",
                border: "1px solid lightgray",
                background: tab.key === activeTab ? "transparent" : "transparent",
                cursor: "pointer",
                borderRadius: 6,
                fontWeight: tab.key === activeTab ? "bold" : "normal",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active && (
          <AssetSelector
          label={active.label}
          folder={active.folder}
          selected={config[active.key] || ""}
          onSelect={handleSelect(active.key)}
          columns={active.columns}
          rows={active.rows}
        />        
        )}
      </div>
      <div
        style={{
          width: 207,
          height: 285,
          border: "2px solid #ccc",
          borderRadius: 8,
          backgroundColor: "white",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "scale(3)",
            transformOrigin: "top left"
          }}
        >
          <CardBuilder config={config} width={69} height={95} />
        </div>
      </div>
    </div>
  )
}