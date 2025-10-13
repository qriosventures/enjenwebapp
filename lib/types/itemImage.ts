export interface ItemImageDto {
  id?: number;
  itemId: number;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}