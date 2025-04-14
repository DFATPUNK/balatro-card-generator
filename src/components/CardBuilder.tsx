import { useEffect, useRef } from "react"
import { JokerFaceConfig } from "../types/JokerFaceConfig"
import layerPositions from "../../public/config/layerPositions.json"

interface CardBuilderProps {
  config: JokerFaceConfig
  width?: number
  height?: number
}

export default function CardBuilder({ config, width = 69, height = 95 }: CardBuilderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
        img.onerror = reject
      })
    }

    const drawCard = async () => {
      if (!canvasRef.current) return
      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      const orderedLayers: (keyof JokerFaceConfig | "textDecoration" | "overlay")[] = [
        "background",
        "collar",
        "face",
        "eyes",
        "nose",
        "mouth",
        "hat",
        "textDecoration",
        "overlay"
      ]

      for (const key of orderedLayers) {
        const path = config[key as keyof JokerFaceConfig]
        if (!path) continue
        const img = await loadImage(path)

        const position = layerPositions[key as keyof typeof layerPositions]
        if (!position) continue

        // 🎯 Correction spécifique pour le nez : ancrage par le bas
        if (key === "nose") {
          ctx.drawImage(img, position.x, position.y - img.height)
        } else {
          ctx.drawImage(img, position.x, position.y)
        }
      }
    }

    drawCard()
  }, [config, width, height])

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} style={{ imageRendering: "pixelated" }} />
    </div>
  )
}