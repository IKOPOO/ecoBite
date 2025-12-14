/**
 * Image utility functions for Snap & Cook feature
 * Handles image conversion, resizing, and compression
 */

/**
 * Convert File to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result as string
            // Remove data URL prefix to get pure base64
            const base64 = result.split(',')[1]
            resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

/**
 * Resize image if it exceeds max dimensions
 */
export async function resizeImage(
    file: File,
    maxWidth: number = 1024,
    maxHeight: number = 1024,
    quality: number = 0.8
): Promise<File> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
        }

        img.onload = () => {
            let { width, height } = img

            // Calculate new dimensions
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width
                    width = maxWidth
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height
                    height = maxHeight
                }
            }

            canvas.width = width
            canvas.height = height

            // Draw resized image
            ctx.drawImage(img, 0, 0, width, height)

            // Convert to blob
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Could not create blob'))
                        return
                    }
                    const resizedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    })
                    resolve(resizedFile)
                },
                'image/jpeg',
                quality
            )
        }

        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = URL.createObjectURL(file)
    })
}

/**
 * Validate image file
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WebP.',
        }
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Ukuran file terlalu besar. Maksimal 10MB.',
        }
    }

    return { valid: true }
}

/**
 * Compress image to target size (in bytes)
 */
export async function compressImage(
    file: File,
    targetSizeBytes: number = 4 * 1024 * 1024 // 4MB default
): Promise<File> {
    if (file.size <= targetSizeBytes) {
        return file
    }

    // Start with quality 0.8 and reduce if needed
    let quality = 0.8
    let resized = await resizeImage(file, 1024, 1024, quality)

    // If still too large, reduce quality further
    while (resized.size > targetSizeBytes && quality > 0.1) {
        quality -= 0.1
        resized = await resizeImage(file, 1024, 1024, quality)
    }

    return resized
}

/**
 * Convert blob URL to File
 */
export async function blobUrlToFile(
    blobUrl: string,
    filename: string = 'camera-capture.jpg'
): Promise<File> {
    const response = await fetch(blobUrl)
    const blob = await response.blob()
    return new File([blob], filename, { type: 'image/jpeg' })
}

/**
 * Capture image from video stream
 */
export function captureFromVideo(
    videoElement: HTMLVideoElement,
    filename: string = 'camera-capture.jpg'
): Promise<File> {
    return new Promise((resolve, reject) => {
        // Validate video element
        if (!videoElement) {
            reject(new Error('Video element is null'))
            return
        }

        if (videoElement.readyState < 2) {
            reject(new Error('Video not ready. Please wait for camera to load.'))
            return
        }

        if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
            reject(new Error('Video has no dimensions. Camera may not be active.'))
            return
        }

        try {
            const canvas = document.createElement('canvas')
            canvas.width = videoElement.videoWidth
            canvas.height = videoElement.videoHeight

            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject(new Error('Could not get canvas context'))
                return
            }

            // Draw current video frame to canvas
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

            // Convert to blob with higher quality
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Failed to create image. Please try again.'))
                        return
                    }

                    const file = new File([blob], filename, {
                        type: 'image/jpeg',
                        lastModified: Date.now(),
                    })

                    console.log('✅ Photo captured:', {
                        size: `${(file.size / 1024).toFixed(2)} KB`,
                        dimensions: `${canvas.width}x${canvas.height}`
                    })

                    resolve(file)
                },
                'image/jpeg',
                0.95 // Higher quality
            )
        } catch (error) {
            reject(error)
        }
    })
}
