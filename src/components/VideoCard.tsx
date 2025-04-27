import React, { useEffect, useCallback, useState, useRef } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp, X } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@/generated/prisma";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);
interface VideoCardProps {
    video: Video;
    onDownload?: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const hiddenVideoRef = useRef<HTMLVideoElement>(null);
    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 300,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video",
        });
    }, []);

    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,
        });
    }, []);

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_10:max_seg_9:min_seg_dur_1"],
        });
    }, []);
    const formatSize = useCallback((size: number) => {
        return filesize(size);
    }, []);
    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }, []);
    const compressionPercentage = video.orignalSize
        ? Math.round((1 - Number(video.compressedSize) / Number(video.orignalSize)) * 100)
        : 0;

    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);

    const handlePreviewError = () => {
        setPreviewError(true);
    };

    const openVideoModal = () => {
        setIsVideoModalOpen(true);
        // Add a class to prevent scrolling when modal is open
        document.body.classList.add('overflow-hidden');
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        document.body.classList.remove('overflow-hidden');
    };

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeVideoModal();
        }
    };
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isVideoModalOpen) {
                closeVideoModal();
            }
        };

        if (isVideoModalOpen) {
            window.addEventListener('keydown', handleEscKey);
        }

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isVideoModalOpen]);

    const handleDownloadVideo = () => {
        const videoUrl = getFullVideoUrl(video.publicId);
        
        setIsDownloading(true);
        toast.loading("Preparing download...");
        
        fetch(videoUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch video");
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${video.title.replace(/\s+/g, "_").toLowerCase()}.mp4`;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                window.URL.revokeObjectURL(url);
                
                toast.dismiss();
                toast.success("Download started!");
            })
            .catch((error) => {
                console.error("Download error:", error);
                toast.dismiss();
                toast.error("Failed to download video");
            })
            .finally(() => {
                setIsDownloading(false);
            });
    };

    return (
        <>
            <div
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <figure 
                    className="aspect-video relative cursor-pointer" 
                    onClick={openVideoModal}
                >
                    {isHovered ? (
                        previewError ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <p className="text-red-500">Preview not available</p>
                            </div>
                        ) : (
                            <video
                                src={getPreviewVideoUrl(video.publicId)}
                                autoPlay
                                muted
                                loop
                                className="w-full h-full object-cover"
                                onError={handlePreviewError}
                            />
                        )
                    ) : (
                        <img
                            src={getThumbnailUrl(video.publicId)}
                            alt={video.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
                        <Clock size={16} className="mr-1" />
                        {formatDuration(video.duration)}
                    </div>
                </figure>
                <div className="card-body p-4">
                    <h2 
                        className="card-title text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                        onClick={openVideoModal}
                    >
                        {video.title}
                    </h2>
                    <p className="text-sm text-base-content opacity-70 mb-4">
                        {video.description}
                    </p>
                    <p className="text-sm text-base-content opacity-70 mb-4">
                        Uploaded {dayjs(video.createdAt).fromNow()}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <FileUp size={18} className="mr-2 text-primary" />
                            <div>
                                <div className="font-semibold">Original</div>
                                <div>{formatSize(Number(video.orignalSize))}</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FileDown size={18} className="mr-2 text-secondary" />
                            <div>
                                <div className="font-semibold">Compressed</div>
                                <div>{formatSize(Number(video.compressedSize))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm font-semibold">
                            Compression:{" "}
                            <span className="text-accent">{compressionPercentage}%</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={openVideoModal}
                            >
                                Play
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleDownloadVideo}
                                disabled={isDownloading}
                            >
                                {isDownloading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <Download size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                    <video 
                        ref={hiddenVideoRef}
                        src={getFullVideoUrl(video.publicId)}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            {isVideoModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-base-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-bold">{video.title}</h3>
                            <button 
                                className="btn btn-sm btn-circle"
                                onClick={closeVideoModal}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="relative aspect-video w-full">
                            <video
                                src={getFullVideoUrl(video.publicId)}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <p className="mb-4">{video.description}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm opacity-70">
                                        Uploaded {dayjs(video.createdAt).fromNow()}
                                    </p>
                                    <p className="text-sm opacity-70">
                                        Duration: {formatDuration(video.duration)}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleDownloadVideo}
                                    disabled={isDownloading}
                                >
                                    {isDownloading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            Download
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoCard;