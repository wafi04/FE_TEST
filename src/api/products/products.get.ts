// Impor hook dari react-query untuk manajemen state query
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Impor konstanta URL dasar dari file konfigurasi
import { BASE_URL } from "../../constant";
import { useProfile } from "../../hooks/auth/useProfile";
import { ProductData } from "../../types/products";
import { API_RESPONSE } from "../../types/types.utils";

// Kelas layanan untuk menangani operasi terkait produk
export class ProductDataService {
  // Metode untuk mengambil produk milik pengguna yang sedang login
  async getProductByUser() {
    // Lakukan permintaan GET ke endpoint produk pengguna
    const response = await fetch(`${BASE_URL}/product/user`, {
      method: "GET", // Tentukan metode HTTP sebagai GET
      headers: {
        // Tetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }

  // Metode untuk mengambil produk berdasarkan ID produk
  async getProductbyId(productId: string) {
    // Lakukan permintaan GET ke endpoint produk dengan ID spesifik
    const response = await fetch(`${BASE_URL}/product/${productId}`, {
      method: "GET", // Tentukan metode HTTP sebagai GET
      headers: {
        // Tetapkan header untuk menentukan tipe konten
        "Content-Type": "application/json",
      },
      credentials: "include", // Sertakan kredensial untuk autentikasi
    });

    // Periksa apakah pengguna tidak terautentikasi
    if (response.status === 401) {
      // Lempar error jika tidak memiliki otorisasi
      throw new Error("UNAUTHORIZED");
    }

    // Kembalikan data JSON dari respons
    return await response.json();
  }

  // Metode untuk membuat produk baru
}

// Buat instance dari layanan produk untuk digunakan di seluruh aplikasi
const GetProduct = new ProductDataService();

export function useProductByUser() {
  // Gunakan generic type untuk memastikan tipe data
  const query = useQuery<API_RESPONSE<ProductData[]>, Error>({
    // Gunakan query key yang unik
    queryKey: ["products", "user"],

    // Fungsi query
    queryFn: () => GetProduct.getProductByUser(),
    //   mencoba akases ke api seklai jika gagal
    retry: 1,
    gcTime: 5 * 60 * 1000,
  });

  // Return objek dengan struktur yang jelas
  return {
    products: query.data?.data, // Akses data produk
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
