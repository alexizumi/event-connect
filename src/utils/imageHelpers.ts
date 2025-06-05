// src/utils/imageHelpers.ts
import {
  DEFAULT_EVENT_IMAGE,
  DEFAULT_EVENT_IMAGE_LARGE,
} from '../constants/defaults';

export const getEventImage = (imageUrl?: string | null): string => {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  return DEFAULT_EVENT_IMAGE;
};
export const getEventImageLarge = (imageUrl?: string | null): string => {
  if (imageUrl && imageUrl.trim() !== '') {
    return imageUrl;
  }
  return DEFAULT_EVENT_IMAGE_LARGE;
};
