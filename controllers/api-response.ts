interface ApiResponse {
  status: number;
  response: {
    result?: object;
    errors?: string[];
    message?: string;
  };
}
