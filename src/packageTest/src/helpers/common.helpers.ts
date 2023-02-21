export const getValidUrl = (prevUrl: string, pageUrl: string) =>{
  if(prevUrl === "/") {
    return prevUrl
  }
  return pageUrl ? `${prevUrl}/${pageUrl}` : null;
};
