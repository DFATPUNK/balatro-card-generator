import { useState, useEffect } from "react"
import AssetSelector from "./AssetSelector"
import CardBuilder from "./CardBuilder"
import { JokerFaceConfig } from "../types/JokerFaceConfig"
import "../App.css"

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
  { key: "background", label: "Background", folder: "rectos", columns: 8 },
  { key: "collar", label: "Collars", folder: "collars", columns: 8 },
  { key: "eyes", label: "Eyes", folder: "eyes", columns: 8 },
  { key: "nose", label: "Noses", folder: "noses", columns: 8 },
  { key: "mouth", label: "Smiles", folder: "smiles", columns: 8 },
  { key: "hat", label: "Hats", folder: "hats", columns: 8 },
  { key: "textDecoration", label: "Text Decorations", folder: "decorations", columns: 8 },
  { key: "overlay", label: "Editions", folder: "editions", columns: 8 }
]

const handleDownload = () => {
  const canvas = document.querySelector("canvas")
  if (!canvas) return

  const link = document.createElement("a")
  link.download = "joker-card.png"
  link.href = canvas.toDataURL("image/png")
  link.click()
}

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
    <div className="face-config-layout">
      <div className="tabs-wrapper">
        <div style={{ display: "flex", gap: 12 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`balatro-tab ${tab.key === activeTab ? 'active' : ''}`}
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

      <div className="preview-container">
        <div className="card-preview">
          <CardBuilder config={config} width={69} height={95} />
        </div>
        <div
          onClick={handleDownload}
          className="custom-download-button"
        >
          <span className="download-label">Download</span>
        </div>
      </div>
    </div>
  )
}