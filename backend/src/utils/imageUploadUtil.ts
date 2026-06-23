
import dotenv from "dotenv";
import multer from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import type {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});


const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});







const uploadImage = (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "image",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(
            new Error("Cloudinary upload failed")
          );
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};


export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      return next(new Error("No file uploaded"));
    }

    // const resizedBuffer = await sharp(file.buffer)
    //   .resize({
    //     width: 800,
    //     height: 600,
    //     fit: "inside",
    //     withoutEnlargement: true,
    //   })
    //   .jpeg({ quality: 80 })
    //   .toBuffer();

    const imageUrl = await uploadImage(file.buffer);

    req.body.imageUrl = imageUrl;

    next();
  } catch (error) {
    next(error);
  }
};


export const uploadPdf = (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "prescriptions",
          resource_type: "image",
          format: "pdf",
          public_id:
            `prescription-${Date.now()}`
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(
              new Error("Upload failed")
            );

          resolve(result.secure_url);
        }
      );

    stream.end(buffer);
  });
};
