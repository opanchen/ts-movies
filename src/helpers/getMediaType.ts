type Media = "mobile" | "mobile-up" | "tablet" | "tablet-up" | "desktop";

export const getMediaType = (windowWidth: number): Media => {
  const mediaType =
    windowWidth < 480
      ? "mobile"
      : windowWidth >= 480 && windowWidth < 768
      ? "mobile-up"
      : windowWidth >= 1200
      ? "desktop"
      : windowWidth >= 1040 && windowWidth < 1200
      ? "tablet-up"
      : "tablet";

  return mediaType;
};
