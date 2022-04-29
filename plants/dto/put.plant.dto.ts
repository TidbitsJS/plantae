// PUT: to update the entire object. All fields are required.
export interface PutPlantDto {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  description: string;
}
