"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImageIcon, UploadIcon, Share2Icon, ArrowRightIcon } from 'lucide-react';

function LandingPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
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
                  <div className="text-xl font-semibold">Your Media Management Solution</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Cloudinary Showcase</h1>
            <p className="py-6 text-lg">
              Manage your media assets with ease. Upload, compress, and share your images and videos across social platforms with our intuitive tools.
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
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <UploadIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title text-xl">Easy Video Upload</h3>
                <p>Upload and compress your videos with our cloud infrastructure.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <ImageIcon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="card-title text-xl">Image Optimization</h3>
                <p>Optimize your images for web and social media with one click.</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <Share2Icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="card-title text-xl">Social Sharing</h3>
                <p>Share your media across multiple platforms with proper formatting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-primary text-primary-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8">Sign in now and experience the power of Cloudinary Showcase</p>
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
            <Link href="#" className="link link-hover">About us</Link>
            <Link href="#" className="link link-hover">Contact</Link>
            <Link href="#" className="link link-hover">Privacy</Link>
            <Link href="#" className="link link-hover">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;