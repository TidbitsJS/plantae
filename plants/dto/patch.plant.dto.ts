import { PutPlantDto } from "./put.plant.dto";

// Partial creates a new type by copying another type and making all its fields optional.
export interface PatchPlantDto extends Partial<PutPlantDto> {}
