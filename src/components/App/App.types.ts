export interface ImageType {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
}

export interface AppState {
  query: string;
  images: ImageType[];
  page: number;
  loading: boolean;
  error: string | null;
  modalImage: ImageType | null;
}
