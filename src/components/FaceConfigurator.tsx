import { useState } from "react"
import CardBuilder from "./CardBuilder"
import AssetSelector from "./AssetSelector"
import { JokerFaceConfig } from "../types/JokerFaceConfig"

const initialConfig: JokerFaceConfig = {
  background: "/assets/rectos/Vector 6.png",
  face: "/assets/faces/Jester Face from Balatro.png",
  collar: "/assets/collars/Style=Default, Color=Default.png",
  eyes: "/assets/eyes/Color=Blue, Style=Closed.png",
  nose: "/assets/noses/Style=Clown, Color=Blue.png",
  mouth: "/assets/smiles/Style=Big smile, Color=Blue.png",
  hat: "/assets/hats/Color=Brown, Backpiece=False, Type=1 tip.png"
}

export default function FaceConfigurator() {
  const [config, setConfig] = useState<JokerFaceConfig>(initialConfig)

  const handleSelect = (key: keyof JokerFaceConfig) => (value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div
    style={{
        padding: "2rem",
        minHeight: "1440px",
        backgroundImage: "url('/balatro_theme.crt.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "auto",
        overflow: "auto"
    }}
    >
      <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "2rem" }}>🎨 Construis ton Joker</h2>
      <div style={{ display: "flex", gap: "40px", paddingRight: "80px" }}>
        <div style={{ flex: 1 }}>
          <AssetSelector label="Collet" folder="collars" selected={config.collar} onSelect={handleSelect("collar")} />
          <AssetSelector label="Yeux" folder="eyes" selected={config.eyes} onSelect={handleSelect("eyes")} />
          <AssetSelector label="Nez" folder="noses" selected={config.nose} onSelect={handleSelect("nose")} />
          <AssetSelector label="Sourire" folder="smiles" selected={config.mouth} onSelect={handleSelect("mouth")} />
          <AssetSelector label="Chapeau" folder="hats" selected={config.hat} onSelect={handleSelect("hat")} />
          <AssetSelector label="Effet spécial" folder="layers" selected={config.overlay ?? ""} onSelect={handleSelect("overlay")} />
          <AssetSelector label="Background" folder="rectos" selected={config.background} onSelect={handleSelect("background")} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ transform: "scale(4)", transformOrigin: "top left" }}>
            <CardBuilder config={config} width={69} height={95} />
          </div>
        </div>
      </div>
    </div>
  )
}