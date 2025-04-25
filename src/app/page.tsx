"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ImageIcon,
  UploadIcon,
  Share2Icon,
  ArrowRightIcon,
  StarIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";

function LandingPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl w-full">
          <div className="lg:w-1/2">
            <div className="mockup-browser border bg-base-300">
              <div className="mockup-browser-toolbar">
                <div className="input">cloudinary-showcase.app</div>
              </div>
              <div className="flex justify-center items-center px-4 py-16 bg-base-200">
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-16 h-16 text-primary mb-4" />
                  <div className="text-xl font-semibold">
                    Your Media Management Solution
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Cloudinary Showcase</h1>
            <p className="py-6 text-lg">
              Manage your media assets with ease. Upload, compress, and share
              your images and videos across social platforms with our intuitive
              tools.
            </p>
            <button onClick={handleSignIn} className="btn btn-primary">
              Sign in to continue <ArrowRightIcon className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <UploadIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title text-xl">Easy Video Upload</h3>
                <p>
                  Upload and compress your videos with our cloud infrastructure.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <ImageIcon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="card-title text-xl">Image Optimization</h3>
                <p>
                  Optimize your images for web and social media with one click.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Share2Icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="card-title text-xl">Social Sharing</h3>
                <p>
                  Share your media across multiple platforms with proper
                  formatting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center mb-10 mt-10">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full max-w-4xl mx-auto">
          <div className="stat">
            <div className="stat-figure text-primary">
              <UsersIcon className="w-6 h-6" />
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value text-primary">15K+</div>
            <div className="stat-desc">Active in past month</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <ClockIcon className="w-6 h-6" />
            </div>
            <div className="stat-title">Avg Processing Time</div>
            <div className="stat-value text-secondary">0.8s</div>
            <div className="stat-desc">Media optimized quickly</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-accent">
              <StarIcon className="w-6 h-6" />
            </div>
            <div className="stat-title">Customer Rating</div>
            <div className="stat-value text-accent">5.0/5</div>
            <div className="stat-desc">Based on 6K+ reviews</div>
          </div>
        </div>
      </div>

      {/* New List Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4">
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Top Uploaded Images
            </li>

            {/* Upload 1 */}
            <li className="list-row flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <img
                  className="size-14 rounded-box"
                  src="https://plus.unsplash.com/premium_photo-1669750817438-3f7f3112de8d?w=900&auto=format&fit=crop&q=60"
                  alt="Image 1"
                />
                <div>
                  <div className="font-medium">Beach View</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Uploaded by Jane Doe
                  </div>
                </div>
              </div>
              <span className="badge badge-primary">2.5K views</span>
            </li>

            {/* Upload 2 */}
            <li className="list-row flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <img
                  className="size-14 rounded-box"
                  src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=900&auto=format&fit=crop&q=60"
                  alt="Image 2"
                />
                <div>
                  <div className="font-medium">Mountain Top</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Uploaded by Alex Smith
                  </div>
                </div>
              </div>
              <span className="badge badge-primary">1.8K views</span>
            </li>

            {/* Upload 3 */}
            <li className="list-row flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <img
                  className="size-14 rounded-box"
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=60"
                  alt="Image 3"
                />
                <div>
                  <div className="font-medium">Sunset Lake</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Uploaded by Emily Clark
                  </div>
                </div>
              </div>
              <span className="badge badge-primary">1.5K views</span>
            </li>

            {/* Upload 4 */}
            <li className="list-row flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <img
                  className="size-14 rounded-box"
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=900&auto=format&fit=crop&q=60"
                  alt="Image 4"
                />
                <div>
                  <div className="font-medium">City Lights</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Uploaded by Michael Brown
                  </div>
                </div>
              </div>
              <span className="badge badge-primary">1.2K views</span>
            </li>

            {/* Upload 5 */}
            <li className="list-row flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <img
                  className="size-14 rounded-box"
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&auto=format&fit=crop&q=60"
                  alt="Image 5"
                />
                <div>
                  <div className="font-medium">Desert Ride</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Uploaded by Sarah Lee
                  </div>
                </div>
              </div>
              <span className="badge badge-primary">980 views</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 bg-base-300 rounded-4xl mt-10 flex flex-col items-center mb-10">
        <h1 className="flex items-center mb-4 w-full justify-center text-4xl font-serif font-stretch-50% font-medium">
          Cloudinary Showcase Timeline
        </h1>
        <ul className="timeline ">
          <li>
            <div className="timeline-start timeline-box">Initial Release</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-primary h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr className="bg-primary" />
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-primary h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Image Optimization</div>
            <hr className="bg-primary" />
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-start timeline-box">Video Support</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-primary h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Social Sharing</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">Mobile Support</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-base-100 text-primary-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">
            Sign in now and experience the power of Cloudinary Showcase
          </p>
          <button onClick={handleSignIn} className="btn btn-secondary">
            Sign in <ArrowRightIcon className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div>
          <div className="flex items-center">
            <ImageIcon className="w-8 h-8 text-primary mr-2" />
            <p className="font-bold text-lg">Cloudinary Showcase</p>
          </div>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <Link href="#" className="link link-hover">
              About us
            </Link>
            <Link href="#" className="link link-hover">
              Contact
            </Link>
            <Link href="#" className="link link-hover">
              Privacy
            </Link>
            <Link href="#" className="link link-hover">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
