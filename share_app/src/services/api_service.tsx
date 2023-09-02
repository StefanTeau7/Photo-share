import axios, {AxiosResponse} from 'axios';

const BASE_URL = 'http://localhost:3000';

interface Image {
  imageUrl: string;
  imageId: string;
}

interface SaveImageResponse {
  success: boolean;
  image?: Image;
  message?: string;
}

class ApiService {
  // Fetch a user's favorite images by userId
  static async fetchFavoriteImages(userId: string): Promise<Image[] | null> {
    try {
      const response: AxiosResponse<{favorites: Image[]}> = await axios.get(
        `${BASE_URL}/users/${userId}/favorites`,
      );
      return response.data.favorites;
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      return null;
    }
  }

  // Save a new favorite image for a user
  static async saveFavoriteImages(
    userId: string,
    imageUrls: string[],
  ): Promise<SaveImageResponse | null> {
    try {
      const response: AxiosResponse<SaveImageResponse> = await axios.post(
        `${BASE_URL}/users/${userId}/favorites`,
        {images: imageUrls},
      );
      return response.data;
    } catch (error) {
      console.error('Error saving favorite images:', error);
      return null;
    }
  }
}

export default ApiService;
