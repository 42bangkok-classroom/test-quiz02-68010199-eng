import axios from "axios";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type UserApiResponse = {
  id: number;
  name: string;
  phone: string;
  address?: Address | null;
};

type SafeUser = {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
};

export async function safeFetchUser(
  userId: number
): Promise<SafeUser | null> {
  if (userId <= 0) {
    return null;
  }

  try {
    const response = await axios.get<UserApiResponse[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.data || !Array.isArray(response.data)) {
      return null;
    }

    const user = response.data.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    };
  } catch {
    return null;
  }
}
