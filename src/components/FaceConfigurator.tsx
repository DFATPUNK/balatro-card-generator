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
    <div>
      <h2>Construis ton Joker</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <AssetSelector label="Collet" folder="collars" selected={config.collar} onSelect={handleSelect("collar")} />
          <AssetSelector label="Yeux" folder="eyes" selected={config.eyes} onSelect={handleSelect("eyes")} />
          <AssetSelector label="Nez" folder="noses" selected={config.nose} onSelect={handleSelect("nose")} />
          <AssetSelector label="Sourire" folder="smiles" selected={config.mouth} onSelect={handleSelect("mouth")} />
          <AssetSelector label="Chapeau" folder="hats" selected={config.hat} onSelect={handleSelect("hat")} />
        </div>
        <div style={{ flex: 1 }}>
          <CardBuilder config={config} width={69} height={95} />
        </div>
      </div>
    </div>
  )
}