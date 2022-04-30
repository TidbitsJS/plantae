export interface CreatePlantDto {
  id: string;
  name: string;
  scientificName?: string;
  family?: string;
  description: string;
}
