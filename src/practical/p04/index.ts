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

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Result = {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
  todos: Todo[];
};

export async function getTodosByUserId(
  id: number
): Promise<Result | "Invalid id"> {
  try {
    const [usersRes, todosRes] = await Promise.all([
      axios.get<UserApiResponse[]>(
        "https://jsonplaceholder.typicode.com/users"
      ),
      axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      ),
    ]);

    const user = usersRes.data.find((u) => u.id === id);

    if (!user) {
      return "Invalid id";
    }

    const todos = todosRes.data.filter((todo) => todo.userId === id);

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address ?? null,
      todos,
    };
  } catch {
    return "Invalid id";
  }
}
