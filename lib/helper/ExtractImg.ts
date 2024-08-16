export function transformGoogleDriveUrl(url?: string | null) {
  if (!url) return "";

  // Match the URL against the two patterns
  const viewMatch = url.match(/\/file\/d\/(.*)\/view\?usp=sharing/);
  const previewMatch = url.match(/\/file\/d\/(.*)\/preview/);

  // Return the transformed URL based on which pattern matches
  if (viewMatch && viewMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${viewMatch[1]}`;
  } else if (previewMatch && previewMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${previewMatch[1]}`;
  }

  // Return the original URL if it doesn't match any of the expected patterns
  return url;
}
