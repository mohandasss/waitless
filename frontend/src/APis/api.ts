import { apiAgent, type HttpResponse } from "./AxiosWrapper";
import type {
  AiInsightsData,
  SendOtpData,
  SendOtpRequest,
  VerifyOtpData,
  VerifyOtpRequest,
} from "./Types";

export type { AuthMethod } from "./Types";

class Api {
  async sendOtp(payload: SendOtpRequest): Promise<SendOtpData | null> {
    const response = await apiAgent
      .path("/auth/send-otp")
      .method("POST")
      .json(payload)
      .execute<SendOtpData>();
    return response.data;
  }

  async sendOtpWithStatus(
    payload: SendOtpRequest,
  ): Promise<HttpResponse<SendOtpData>> {
    return apiAgent
      .path("/auth/send-otp")
      .method("POST")
      .json(payload)
      .execute<SendOtpData>();
  }

  async verifyOtpWithStatus(
    payload: VerifyOtpRequest,
  ): Promise<HttpResponse<VerifyOtpData>> {
    return apiAgent
      .path("/auth/verify-otp")
      .method("POST")
      .json(payload)
      .execute<VerifyOtpData>();
  }
  async AiInsights(salonId: string): Promise<HttpResponse<AiInsightsData>> {
    return apiAgent
      .path(`/ai/insights/${salonId}`)
      .method("GET")
      .execute<AiInsightsData>();
  }

  

  async getSalons(pageNumber = 1, pageSize = 10, search = "") {
    return apiAgent
      .path(`/salon/salons`)
      .method("GET")
      .query({ pageNumber, pageSize, search })
      .execute();
  }

  async getSalonDetails(id: string) {
    return apiAgent.path(`/salon/salon/${id}`)
    .method("GET")
    .execute();
  }

  async getServices(salonId: string, pageNumber = 1, pageSize = 50) {
    return apiAgent
      .path(`/service/salon/${salonId}/services`)
      .method("GET")
      .query({ pageNumber, pageSize })
      .execute();
  }

  async addService(salonId: string, payload: { name: string; duration: number; price?: number }) {
    return apiAgent
      .path(`/service/salon/${salonId}/services`)
      .method("POST")
      .json(payload)
      .execute();
  }

  async bookSlot(salonId: string, payload: { serviceId: number }) {
    return apiAgent
      .path(`/queue/salon/${salonId}/book-slot`)
      .method("POST")
      .json(payload)
      .execute();
  }

  async getBookings(salonId: string, opts?: { serviceId?: number; pageNumber?: number; pageSize?: number }) {
    const { serviceId, pageNumber = 1, pageSize = 10 } = opts || {};
    return apiAgent
      .path(`/queue/salon/${salonId}/book-list`)
      .method("GET")
      .query({ serviceId, pageNumber, pageSize })
      .execute();
  }

  async getTodayAnalytics(salonId: string) {
    return apiAgent
      .path(`/analytics/today/${salonId}`)
      .method("GET")
      .execute<import("./Types").TodayAnalyticsData>();
  }
}

export const api = new Api();

export default api;
