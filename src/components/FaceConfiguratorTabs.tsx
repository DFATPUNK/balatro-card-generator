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
  { key: "background", label: "Recto", folder: "rectos", columns: 8 },
  { key: "collar", label: "Collet", folder: "collars", columns: 8 },
  { key: "eyes", label: "Yeux", folder: "eyes", columns: 8 },
  { key: "nose", label: "Nez", folder: "noses", columns: 8 },
  { key: "mouth", label: "Sourire", folder: "smiles", columns: 8 },
  { key: "hat", label: "Chapeau", folder: "hats", columns: 8 },
  { key: "textDecoration", label: "Décoration", folder: "decorations", columns: 8 },
  { key: "overlay", label: "Overlay", folder: "layers", columns: 8 }
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
      </div>
    </div>
  )
}