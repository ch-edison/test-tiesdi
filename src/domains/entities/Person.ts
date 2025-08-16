export type idPerson = string;

export interface Person {
  id: idPerson;
  name: string;
  lastName: string;
  image?: string | null;
}

export function createPerson(attrs: Omit<Person, 'id'> & { id?: string }): Person {
  const id = attrs.id ?? Date.now().toString();
  return {
    id,
    name: attrs.name.trim(),
    lastName: attrs.lastName.trim(),
    image: attrs.image ?? null,
  };
}
