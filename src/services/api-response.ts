import mongoose from 'mongoose';

export interface ApiResponse {
  status: number;
  response: {
    result?: mongoose.Document | mongoose.Document[];
    errors?: object[];
    message?: string;
  };
}
