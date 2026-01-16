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
  address?: Address;
};

type FilteredUser = {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
};

export async function filterUserById(
  id: number
): Promise<FilteredUser | "Invalid id"> {
  try {
    const response = await axios.get<UserApiResponse[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    const user = response.data.find((u) => u.id === id);

    if (!user) {
      return "Invalid id";
    }

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
    };
  } catch {
    return "Invalid id";
  }
}