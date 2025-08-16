import { idPerson } from "../entities/Person";
import { PersonRepository } from "../repositories/personRepository";

export class UpdatePerson {
  constructor(private readonly repo: PersonRepository) {}
  exec(id: idPerson, patch: { name?: string; lastName?: string; image?: string | null }) {
    return this.repo.update(id, {
      name: patch.name?.trim(),
      lastName: patch.lastName?.trim(),
      image: patch.image,
    });
  }
}