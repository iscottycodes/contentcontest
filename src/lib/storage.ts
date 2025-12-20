import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

export interface UploadProgress {
  progress: number
  downloadUrl?: string
  error?: string
}

// Upload a file to Firebase Storage
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (onProgress) {
          onProgress(progress)
        }
      },
      (error) => {
        reject(error)
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadUrl)
      }
    )
  })
}

// Upload submission file
export async function uploadSubmissionFile(
  file: File,
  submissionId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const extension = file.name.split('.').pop()
  const path = `submissions/${submissionId}/${Date.now()}.${extension}`
  return uploadFile(file, path, onProgress)
}

// Upload sponsor logo
export async function uploadSponsorLogo(
  file: File,
  sponsorId: string
): Promise<string> {
  const extension = file.name.split('.').pop()
  const path = `sponsors/${sponsorId}/logo.${extension}`
  return uploadFile(file, path)
}

// Upload blog post image
export async function uploadBlogImage(
  file: File,
  postId: string
): Promise<string> {
  const extension = file.name.split('.').pop()
  const path = `blog/${postId}/${Date.now()}.${extension}`
  return uploadFile(file, path)
}

// Delete a file from storage
export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// Get file size in human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate file type
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => file.type.startsWith(type))
}

// Validate file size (in MB)
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  return file.size <= maxSizeMB * 1024 * 1024
}





