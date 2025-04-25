'use client'
import { useState,useEffect,useCallback } from 'react'
import React from 'react'
import axios from 'axios'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/Types'
import toast from 'react-hot-toast'
function page() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get('/api/videos')
      if(Array.isArray(response.data)) {
        setVideos(response.data)
      }else{
        setError('Invalid response format')
        toast.error('Invalid response format')
      }
    } catch (err) {
      setError(err as string)
      toast.error('Error fetching videos')
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}, []);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>
  }
  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onDownload={handleDownload}
                    />
                ))
              }
            </div>
          )}
        </div>
      );
}

export default page