import axios from '@/utils/http';

export function getPhotos(params) {
  return axios('photos', 'get', params);
}
