import { PersonRepository } from "../repositories/personRepository";

export class AddPerson {
  constructor(private readonly repo: PersonRepository) {}
  exec(input: { name: string; lastName: string; image?: string | null }) {
    if (!input.name?.trim() || !input.lastName?.trim()) {
      throw new Error('Name and lastName is required');
    }
    return this.repo.add({ name: input.name.trim(), lastName: input.lastName.trim(), image: input.image ?? null });
  }
}