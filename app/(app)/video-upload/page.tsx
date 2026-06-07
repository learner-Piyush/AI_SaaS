"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()

  // max file size is 75 MB
  const MAX_FILE_SIZE = 75 * 1024 * 1024

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert("File size is too large")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("orignalSize", file.size.toString())

    try {
      const response = await fetch("/api/video-upload", {
        method: "POST", body: formData
      })

      if (!response.ok) throw new Error("Failed to upload video")
    } catch (error) {
      console.log(error)
      alert("Failed to upload video")
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered input-lg w-full"
            placeholder="Enter video title"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered textarea-lg w-full h-32"
            placeholder="Enter video description"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg font-semibold">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered file-input-lg w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  )
}

export default VideoUpload