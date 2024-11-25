export const getAssetUrl = (filename) => {
  return `${import.meta.env.VITE_R2_BUCKET_URL}/${filename}`;
};
