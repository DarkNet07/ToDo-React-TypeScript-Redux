import { ToDo } from './ToDo';

export const fetchLoadToDos = async (): Promise<ToDo[]> => {
  const response = await fetch('/api/toDos');
  const data = await response.json();
  return data;
};

export const fetchToDoCheck = async (
  id: number,
  toDos: ToDo[]
): Promise<ToDo['id'] | undefined> => {
  try {
    const response = await fetch(`api/toDos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isDone: !toDos.find((todo) => todo.id === id)?.isDone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.id;
  } catch (error: unknown | string) {
    console.error(
      'Fetch error:',
      error
    );
  }
};
export const fetchUpdateToDo = async (
  updToDo: ToDo
): Promise<ToDo | undefined> => {

  try {
    const response = await fetch(`api/toDos/${updToDo.id}`, {
      method: 'PUT',
      body: JSON.stringify(updToDo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown | string) {
    console.error(
      'Fetch error:',
      error
    );
  }
};
export const fetchToDoDelete = async (
  id: ToDo['id']
): Promise<ToDo['id'] | undefined> => {

  try {
    const response = await fetch(`api/toDos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return id;
  } catch (error: unknown | string) {
    console.error(
      'Fetch error:',
      error
    );
  }
};
export const fetchCreateNewToDo = async (
  newToDo: ToDo
): Promise<ToDo | undefined> => {

  try {
    const response = await fetch(`api/toDos/`, {
      method: 'POST',
      body: JSON.stringify(newToDo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown | string) {
    console.error(
      'Fetch error:',
      error
    );
  }
};

