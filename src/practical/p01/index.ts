import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface UserApiResponse {
  id: number;
  name: string;
  phone: string;
  address?: Address;
}

interface PostalUser {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

export async function getPostalAddress(): Promise<PostalUser[]> {
  try {
    const response = await axios.get<UserApiResponse[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      return [];
    }

    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    }));
  } catch {
    return [];
  }
}
