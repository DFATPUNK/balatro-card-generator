import { useState } from "react"
import FaceConfiguratorTabs from "./components/FaceConfiguratorTabs"
import { JokerFaceConfig } from "./types/JokerFaceConfig"

const initialConfig: JokerFaceConfig = {
  background: "/assets/rectos/Vector 6.png",
  face: "/assets/faces/Jester Face from Balatro.png",
  collar: "/assets/collars/Style=Default, Color=Default.png",
  eyes: "/assets/eyes/Color=Blue, Style=Closed.png",
  nose: "/assets/noses/Style=Clown, Color=Blue.png",
  mouth: "/assets/smiles/Style=Big smile, Color=Blue.png",
  hat: "/assets/hats/Color=Brown, Backpiece=False, Type=1 tip.png",
}

export default function App() {
  const [config, setConfig] = useState<JokerFaceConfig>(initialConfig)

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/balatro_theme.crt.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
      }}
    >
      <FaceConfiguratorTabs config={config} onChange={setConfig} />
    </div>
  )
}