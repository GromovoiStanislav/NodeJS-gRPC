export interface GenerateHashRequest {
  id: number;
  data: string;
}

export interface GenerateHashResponse {
  id: number;
  hash: string;
}

export interface TaskService {
  GenerateHash(request: GenerateHashRequest): Promise<GenerateHashResponse>;
}