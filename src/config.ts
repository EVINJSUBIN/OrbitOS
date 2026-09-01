// Media base URL — Supabase Storage for audio/reels only, relative paths for images
const SUPABASE_BASE = import.meta.env.VITE_SUPABASE_MEDIA_URL || 'https://asmidlbevzqprejwevrs.supabase.co/storage/v1/object/public/media'

export const mediaUrl = (path: string) => {
  if (import.meta.env.PROD && (path.startsWith('/audio/') || path.startsWith('/reels/'))) {
    return `${SUPABASE_BASE}${path}`
  }
  // Strip leading slash if present to safely append to BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
