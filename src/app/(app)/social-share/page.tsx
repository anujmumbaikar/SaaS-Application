'use client'
import React,{useState,useEffect,useRef} from 'react'
import { CldImage } from 'next-cloudinary'
import toast from 'react-hot-toast';

const socialFormats = {
  // Instagram
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Instagram Landscape (1.91:1)": { width: 1080, height: 566, aspectRatio: "1.91:1" },
  "Instagram Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "Instagram Reels (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },

  // Facebook
  "Facebook Post (1.91:1)": { width: 1200, height: 630, aspectRatio: "1.91:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  "Facebook Profile Picture (1:1)": { width: 180, height: 180, aspectRatio: "1:1" },
  "Facebook Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },

  // Twitter (now X)
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Twitter Profile Picture (1:1)": { width: 400, height: 400, aspectRatio: "1:1" },

  // LinkedIn
  "LinkedIn Banner (4:1)": { width: 1584, height: 396, aspectRatio: "4:1" },
  "LinkedIn Profile Picture (1:1)": { width: 400, height: 400, aspectRatio: "1:1" },
  "LinkedIn Post (1.91:1)": { width: 1200, height: 627, aspectRatio: "1.91:1" },

  // YouTube
  "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
  "YouTube Channel Art (16:9)": { width: 2560, height: 1440, aspectRatio: "16:9" },

  // Pinterest
  "Pinterest Pin (2:3)": { width: 1000, height: 1500, aspectRatio: "2:3" },

  // TikTok
  "TikTok Video (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },

  // Threads (by Instagram)
  "Threads Post (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Threads Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
};

type SocialFormat = keyof typeof socialFormats;

export default function socialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(()=>{
    if(uploadedImage){
      setIsTransforming(true);
    }
  },[selectedFormat,uploadedImage])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image-upload',{
        method:'POST',
        body: formData
      })
      if(!response.ok){
        throw new Error('Image upload failed');
      }
      const data = await response.json();
      setUploadedImage(data.publicId);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Image upload failed');
    } finally{
      setIsUploading(false);
    }

  }


  const handleDownload = ()=>{
    if(!imageRef.current) return;
    //here we r trying to access the resource and we r using fetch for it.
    //here fetch is used not for api but for accessing the resource
    //we r trying to access the image from the url
    //and then we r converting it to blob(means binary object)
    //nd then we r creating a url for that binary object
    //once binary object is created we r creating a url 
    //nd we r pointing it to the in memory data of image
    //then we r creating a link element so we can click on it nd download the image
    //"if we just click on download it will take u to other tab". we dont need that.

    fetch(imageRef.current.src)
    .then((res)=> res.blob())
    .then((blob)=>{
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    })
  }


  return (
    <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Social Media Image Creator
          </h1>

          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Upload an Image</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Choose an image file</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="file-input file-input-bordered file-input-primary w-full"
                />
              </div>

              {isUploading && (
                <div className="mt-4">
                  <progress className="progress progress-primary w-full"></progress>
                </div>
              )}

              {uploadedImage && (
                <div className="mt-6">
                  <h2 className="card-title mb-4">Select Social Media Format</h2>
                  <div className="form-control">
                    <select
                      className="select select-bordered w-full"
                      value={selectedFormat}
                      onChange={(e) =>
                        setSelectedFormat(e.target.value as SocialFormat)
                      }
                    >
                      {Object.keys(socialFormats).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 relative">
                    <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                    <div className="flex justify-center">
                      {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      )}
                      <CldImage
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity='auto'
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        />
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-primary" onClick={handleDownload}>
                      Download for {selectedFormat}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}