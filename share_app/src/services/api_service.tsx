import axios, {AxiosResponse} from 'axios';

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
  static BASE_URL = 'http://localhost:3000';

  static setBaseURL(url: string) {
    this.BASE_URL = url;
  }
  static cachedCollections: {[collectionName: string]: string[]} = {};
  // Fetch a user's favorite images by userId
  static async fetchFavoriteImages(userId: string): Promise<Image[] | null> {
    try {
      const response: AxiosResponse<{favorites: Image[]}> = await axios.get(
        `${ApiService.BASE_URL}/users/${userId}/favorites`,
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
        `${ApiService.BASE_URL}/users/${userId}/favorites`,
        {images: imageUrls},
      );
      return response.data;
    } catch (error) {
      console.error('Error saving favorite images:', error);
      return null;
    }
  }

  static async saveCollection(
    collectionName: string,
    images: string[],
    userId?: string,
  ) {
    if (userId === undefined) {
      throw new Error('userId is undefined');
    }
    try {
      const response = await fetch(
        `${ApiService.BASE_URL}/users/${userId}/collections`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collectionName: collectionName,
            images: images,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error saving collection.');
      }
      ApiService.cachedCollections[collectionName] = images;

      return data;
    } catch (error) {
      console.error('Error in saveCollection:', error);
      throw error;
    }
  }

  static async fetchCollections(userId: string) {
    if (Object.keys(ApiService.cachedCollections).length) {
      return ApiService.cachedCollections; // If cached, return immediately
    }
    try {
      const response = await fetch(
        `${ApiService.BASE_URL}/users/${userId}/collections`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error fetching collections.');
      }

      data.collections.forEach((collection: any) => {
        ApiService.cachedCollections[collection.name] = collection.images;
      });

      return ApiService.cachedCollections;
    } catch (error) {
      console.error('Error in fetchCollections:', error);
      throw error;
    }
  }

  static getCachedCollectionImages(collectionName: string): string[] {
    return ApiService.cachedCollections[collectionName] || [];
  }

  static async addImagesToCollection(
    collectionName: string,
    images: string[],
    userId?: string,
  ) {
    const endpoint = `${ApiService.BASE_URL}/users/${userId}/collections/${collectionName}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: images,
        }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Unexpected response:', textResponse);
        throw new Error(
          'Error adding images to collection. Unexpected server response.',
        );
      }
      // Update cachedCollections after adding images to existing collection
      if (ApiService.cachedCollections[collectionName]) {
        ApiService.cachedCollections[collectionName] = [
          ...ApiService.cachedCollections[collectionName],
          ...images,
        ];
      } else {
        ApiService.cachedCollections[collectionName] = images;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in addImagesToCollection:', error);
      throw error;
    }
  }
}

export default ApiService;
