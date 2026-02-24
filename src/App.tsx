import { useState } from "react"
import FaceConfiguratorTabs from "./components/FaceConfiguratorTabs"
import { JokerFaceConfig } from "./types/JokerFaceConfig"

const initialConfig: JokerFaceConfig = {
  background: `${import.meta.env.BASE_URL}assets/rectos/Vector 6.png`,
  face: `${import.meta.env.BASE_URL}assets/faces/Jester Face from Balatro.png`,
  collar: `${import.meta.env.BASE_URL}assets/collars/Style=Default, Color=Default.png`,
  eyes: `${import.meta.env.BASE_URL}assets/eyes/Color=Blue, Style=Closed.png`,
  nose: `${import.meta.env.BASE_URL}assets/noses/Style=Clown, Color=Blue.png`,
  mouth: `${import.meta.env.BASE_URL}assets/smiles/Style=Big smile, Color=Blue.png`,
  hat: `${import.meta.env.BASE_URL}assets/hats/Color=Brown, Backpiece=False, Type=1 tip.png`,
}

export default function App() {
  const [config, setConfig] = useState<JokerFaceConfig>(initialConfig)

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${import.meta.env.BASE_URL}balatro_theme.crt.png)`,
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