export const getAssetUrl = (filename) => {
  // Log the raw environment variable
  console.log('Raw env var:', import.meta.env.VITE_R2_BUCKET_URL);
  
  const baseUrl = import.meta.env.VITE_R2_BUCKET_URL || '';
  // Remove any trailing slashes from base URL
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  // Remove any leading slashes from filename
  const cleanFilename = filename.replace(/^\/+/, '');
  
  // Don't include 'portfolio' in the path since it's the bucket name
  const url = `${cleanBaseUrl}/${cleanFilename}`;
  console.log('Generated URL:', url);
  return url;
};
