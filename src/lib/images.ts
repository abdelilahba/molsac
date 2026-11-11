/**
 * Safely parses images from a product (handles string, JSON-stringified string[], or raw string[])
 */
export function getProductImage(imagesInput: any): string {
  if (!imagesInput) return "/images/logo.png";

  if (Array.isArray(imagesInput) && imagesInput.length > 0) {
    return imagesInput[0];
  }

  if (typeof imagesInput === "string") {
    const trimmed = imagesInput.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      } catch {
        // ignore JSON parse error
      }
    }
    if (trimmed.startsWith("/") || trimmed.startsWith("http")) {
      return trimmed;
    }
  }

  return "/images/logo.png";
}

export function getAllProductImages(imagesInput: any): string[] {
  if (!imagesInput) return ["/images/logo.png"];

  if (Array.isArray(imagesInput) && imagesInput.length > 0) {
    return imagesInput;
  }

  if (typeof imagesInput === "string") {
    const trimmed = imagesInput.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // ignore
      }
    }
    if (trimmed.startsWith("/") || trimmed.startsWith("http")) {
      return [trimmed];
    }
  }

  return ["/images/logo.png"];
}

