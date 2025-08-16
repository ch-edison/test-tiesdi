import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersonRepository } from "../domains/repositories/personRepository";
import { idPerson, Person } from "../domains/entities/Person";
import { STORAGE_KEY } from "../utils/constants";

async function loadPeople(): Promise<Person[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map((p) => ({
      id: String(p.id),
      name: String(p.name ?? ''),
      lastName: String(p.lastName ?? ''),
      image: p.image ?? null,
    }));
  } catch {
    return [];
  }
}

async function save(list: Person[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export class AsyncStoragePersonRepository implements PersonRepository {
  async list(): Promise<Person[]> { return loadPeople(); }
  async add(newPerson: Omit<Person, 'id'>): Promise<Person[]> {
    const current = await loadPeople();
    const person: Person = { id: Date.now().toString(), ...newPerson };
    const next = [person, ...current];
    await save(next); return next;
  }
  async update(id: idPerson, patch: Partial<Omit<Person, 'id'>>): Promise<Person[]> {
    const current = await loadPeople();
    const next = current.map((p) => (p.id === id ? { ...p, ...patch } : p));
    await save(next); return next;
  }
  async remove(id: string): Promise<Person[]> {
    const current = await loadPeople();
    const next = current.filter((p) => p.id !== id);
    await save(next); return next;
  }
  async removePhoto(id: string): Promise<Person[]> { return this.update(id, { image: null }); }
}