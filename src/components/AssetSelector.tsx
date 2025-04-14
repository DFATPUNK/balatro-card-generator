import React from "react"

interface AssetSelectorProps {
  label: string
  folder: string
  selected: string
  onSelect: (value: string) => void
}

export default function AssetSelector({ label, folder, selected, onSelect }: AssetSelectorProps) {
  const index = `/assets/${folder}/index.json`
  const [images, setImages] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch(index)
      .then((res) => res.json())
      .then((data) => {
        setImages(data)
      })
  }, [folder])

  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ fontSize: 16, marginBottom: 8 }}>{label}</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {images.map((img) => (
          <img
            key={img}
            src={`/assets/${folder}/${img}`}
            onClick={() => onSelect(`/assets/${folder}/${img}`)}
            draggable={false}
            style={{
              width: 48,
              height: "auto",
              border: selected.endsWith(img) ? "2px solid red" : "1px solid lightgray",
              borderRadius: 4,
              cursor: "pointer",
              imageRendering: "pixelated"
            }}
          />
        ))}
      </div>
    </div>
  )
}