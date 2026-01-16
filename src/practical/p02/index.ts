type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
export function addUser(newUser: newUser | null) {}

import axios from "axios";

type Geo = {
  lat: string | null;
  lng: string | null;
};

type Address = {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
};

type UserApiResponse = {
  id: number;
  name: string;
  phone: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
};

type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type ResultUser = {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
};

export async function addUser(
  newUser: newUser | null
): Promise<ResultUser[]> {
  try {
    const response = await axios.get<UserApiResponse[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    const users: ResultUser[] = response.data.map((user) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address
        ? {
            street: user.address.street ?? null,
            suite: user.address.suite ?? null,
            city: user.address.city ?? null,
            zipcode: user.address.zipcode ?? null,
            geo: user.address.geo
              ? {
                  lat: user.address.geo.lat ?? null,
                  lng: user.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    }));

    if (!newUser) {
      return users;
    }

    const lastId = users.length > 0 ? users[users.length - 1].id : 0;

    const addedUser: ResultUser = {
      id: lastId + 1,
      name: newUser.name ?? null,
      phone: newUser.phone ?? null,
      address: newUser.address
        ? {
            street: newUser.address.street ?? null,
            suite: newUser.address.suite ?? null,
            city: newUser.address.city ?? null,
            zipcode: newUser.address.zipcode ?? null,
            geo: newUser.address.geo
              ? {
                  lat: newUser.address.geo.lat ?? null,
                  lng: newUser.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    };

    return [...users, addedUser];
  } catch {
    return [];
  }
}