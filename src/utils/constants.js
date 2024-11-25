export const getAssetUrl = (filename) => {
  const baseUrl = import.meta.env.VITE_R2_BUCKET_URL;
  const url = `${baseUrl}/portfolio/${filename}`;
  console.log('Base URL:', baseUrl);
  console.log('Generated URL:', url);
  return url;
};
