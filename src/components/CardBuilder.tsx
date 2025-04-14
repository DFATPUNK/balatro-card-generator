import { useEffect, useRef } from "react"
import { JokerFaceConfig } from "../types/JokerFaceConfig"
import layerPositions from "../config/layerPositions.json"

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

      const overlayPath = config.overlay || ""
      const isRainbow = overlayPath.toLowerCase().includes("rainbow")
      const isHolographic = overlayPath.toLowerCase().includes("holographic")

      let orderedLayers: (keyof JokerFaceConfig | "overlay")[] = []

      if (isRainbow) {
        orderedLayers = [
          "background",
          "collar",
          "face",
          "eyes",
          "nose",
          "mouth",
          "hat"
        ]
      } else if (isHolographic) {
        orderedLayers = [
          "background",
          "collar",
          "face",
          "eyes",
          "nose",
          "mouth",
          "hat"
        ]
      } else {
        orderedLayers = [
          "background",
          "collar",
          "face",
          "eyes",
          "nose",
          "mouth",
          "hat"
        ]
      }

      for (const key of orderedLayers) {
        const path = config[key as keyof JokerFaceConfig]
        if (!path) continue
        const img = await loadImage(path)
        const position = layerPositions[key as keyof typeof layerPositions]
        if (!position) continue

        if (key === "nose") {
          ctx.drawImage(img, position.x, position.y - img.height)
        } else {
          ctx.drawImage(img, position.x, position.y)
        }
      }

      // 🎯 Ajouter overlay rainbow en mode hue tout à la fin
      if (isRainbow && config.overlay) {
        const overlayImg = await loadImage(config.overlay)
        ctx.globalCompositeOperation = "hue"
        ctx.drawImage(overlayImg, 0, 0)
        ctx.globalCompositeOperation = "source-over"
      }

      // 🎯 Ajouter overlay holographic en mode darken tout à la fin
      if (isHolographic && config.overlay) {
        const overlayImg = await loadImage(config.overlay)
        ctx.globalCompositeOperation = "darken"
        ctx.drawImage(overlayImg, 0, 0)
        ctx.globalCompositeOperation = "source-over"
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