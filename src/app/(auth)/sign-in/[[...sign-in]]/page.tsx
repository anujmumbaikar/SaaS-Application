"use client";

import { SignIn } from '@clerk/nextjs';
import { ImageIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card shadow-xl bg-base-100 max-w-md w-full">
        <div className="card-body">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-2">
              <ImageIcon className="w-8 h-8 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Cloudinary Showcase</h2>
            </div>
            <p className="text-base-content/70 text-center">
              Sign in to manage your media assets
            </p>
          </div>
          
          {/* Divider */}
          <div className="divider mb-6"></div>
          
          {/* Clerk SignIn Component */}
          <div className="bg-base-100 rounded-lg">
            <SignIn />
          </div>
          
          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 w-full p-4 text-center text-base-content/70 text-sm">
        <p>© {new Date().getFullYear()} Cloudinary Showcase. All rights reserved.</p>
      </div>
    </div>
  );
}