import { idPerson, Person } from "../entities/Person";

export interface PersonRepository {
  list(): Promise<Person[]>;
  add(person: Omit<Person, 'id'>): Promise<Person[]>;
  update(id: idPerson, patch: Partial<Omit<Person, 'id'>>): Promise<Person[]>;
  remove(id: idPerson): Promise<Person[]>;
  removePhoto(id: idPerson): Promise<Person[]>;
}