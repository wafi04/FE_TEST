import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Gunakan axios untuk konsistensi
import { BASE_URL } from "../../constant";
import { API_RESPONSE } from "../../types/types.utils";
import { UserData } from "../../types/user";

export const useProfile = () => {
  return useQuery<API_RESPONSE<UserData>, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
          withCredentials: true, // Penting untuk mengirim cookies
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Trigger refresh token
          const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            return refreshResponse;
          } else {
            // If refresh fails, throw error or handle accordingly
            throw new Error("Failed to refresh token");
          }
        }

        // Handle error lainnya
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // Data dianggap fresh selama 30 menit
    gcTime: 60 * 60 * 1000, // Cache disimpan selama 1 jam
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Biarkan true untuk keamanan
  });
};
