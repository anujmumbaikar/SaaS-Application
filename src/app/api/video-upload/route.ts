import { v2 as cloudinary } from 'cloudinary';
import { NextRequest,NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma'


const prisma = new PrismaClient()
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
interface CloudinaryUploadResult{
    public_id:string;
    bytes:number;
    duration?:number;
    [key:string]:any
}
export async function POST(request:NextRequest){
    //todo to check user
    // const {userId} = await auth();
    // if(!userId){
    //     return NextResponse.json({error:'Unauthorized'}, {status:401});
    // }
    try {
        if(
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ){
            return NextResponse.json({error:'Cloudinary credentials not found'}, {status:500});
        }
    } catch (error) {
        console.log('Error checking Cloudinary credentials:', error);
        return NextResponse.json({error:'Internal Server Error'}, {status:500});
        
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as string | null;
        const description = formData.get('description') as string | null;
        const orignalSize = formData.get('orignalSize') as string | null;

        if(!file){
            return NextResponse.json({error:'File not found'}, {status:400});
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder:"video-cloudinary-saas-uploads",
                    resource_type:"video",
                    transformation:[
                        {quality:"auto",fetch_format:"mp4"},
                    ]
                },
                (error,result)=>{
                    if(error){
                        reject(error);
                    }
                    resolve(result as CloudinaryUploadResult);
                }
            )
            upload_stream.end(buffer);
        })
        const video = await prisma.video.create({
            data:{
                title:title || "",
                description,
                publicId:result.public_id,
                compressedSize:String(result.bytes),
                orignalSize:orignalSize || "",
                duration:result.duration || 0,
            }
        })
        return NextResponse.json((video), {status:200});
    } catch (error) {
        console.log('Error uploading video:', error);
        return NextResponse.json({error:'Internal Server Error'}, {status:500});
    }finally{
        await prisma.$disconnect();
    }
}