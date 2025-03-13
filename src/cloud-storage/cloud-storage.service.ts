import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
@Injectable()
export class CloudStorageService {
  private storage: Storage;
  private bucketName = process.env.GCS_BUCKET_NAME; // Set in your .env file

  constructor() {
    this.storage = new Storage();
  }

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    folder = 'uploads',
  ): Promise<string> {
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const fileName = `${folder}/${Date.now()}_${sanitizedName}`;
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: {
        contentType: this.getMimeType(originalName),
      },
    });

    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`;
  }

  private getMimeType(filename: string): string {
    const extension = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }
}
