export type CategoryKey =
  | 'all'
  | 'linkedin'
  | 'firstMeet'
  | 'chinaTour'
  | 'vietnamTour'
  | 'newZealand'
  | 'prewedding';

export interface GalleryItem {
  id: number;
  category: CategoryKey;
  src: string;
}