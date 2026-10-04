/**
 * Client-side image upload and compression utility
 * Optimizes images uploaded from PC for instant Firestore and local storage persistence
 */

export interface ProcessedImageResult {
  dataUrl: string;
  fileName: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  dimensions: { width: number; height: number };
}

export const processImageFile = (
  file: File, 
  maxWidth = 1000, 
  maxHeight = 1200, 
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPEG, PNG, WebP, etc.)'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file from your PC'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse selected image'));
      img.onload = () => {
        let { width, height } = img;

        // Maintain aspect ratio while clamping max bounds
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const isPng = file.type === 'image/png' || file.name.endsWith('.png');
        if (!isPng) {
          // Fill white background for JPEGs to prevent black bars
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // For transparent logos preserve PNG, for photos use JPEG compression
        const outputMime = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, isPng ? undefined : quality);
        resolve(dataUrl);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};
