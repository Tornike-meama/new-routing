import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';


export type DataResponse<T> = {
  data: T;
  infoMessage: string;
  isError: boolean;
}

class ApiManager {
  private readonly baseURL: string;
  private readonly tokenStorageKey: string;
  private readonly refreshTokenStorageKey: string;
  private token: string | null;
  private refreshToken: string | null;

  constructor(baseURL: string, tokenStorageKey: string, refreshTokenStorageKey: string) {
    this.baseURL = baseURL;
    this.tokenStorageKey = tokenStorageKey;
    this.refreshTokenStorageKey = refreshTokenStorageKey;
    this.token = localStorage.getItem(tokenStorageKey);
    this.refreshToken = localStorage.getItem(refreshTokenStorageKey);
  };

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    try {
      const response = await axios.request<T>({ ...config, url: this.baseURL + config.url });
      return response.data;
    } catch (ex) {
      const error = ex as AxiosError;
      if (error.response && 
          error.response?.status === 401 && 
          !error.request?.responseURL?.toLowerCase()?.includes("refreshtoken") &&
          this.refreshToken
          ) {
        try {
          const refreshResponse = await this.post<{ accessToken: string }>('/en/RefreshToken', {
            refreshToken: this.refreshToken,
          });
          this.token = refreshResponse.data.accessToken;
          this.setTokenInLocalStorage(this.token);
          const retryConfig: AxiosRequestConfig = {
            ...config,
            headers: { ...config.headers, Authorization: `Bearer ${this.token}` },
          };
          const retryResponse = await axios.request<T>({ ...retryConfig, url: this.baseURL + config.url });
          return retryResponse.data;
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
        }
      }
      throw error;
    }
  };

  public setTokenInLocalStorage(token: string) {
    localStorage.setItem(this.tokenStorageKey, token)
  }

  public setRefreshTokenInLocalStorage(token: string) {
    localStorage.setItem(this.refreshTokenStorageKey, token)
  }

  public async get<T>(url: string): Promise<DataResponse<T>> {
    return this.request<DataResponse<T>>({ method: 'get', url });
  };

  public async post<T>(url: string, data: any): Promise<DataResponse<T>> {
    return this.request<DataResponse<T>>({ method: 'post', url, data });
  };
};

export default ApiManager;