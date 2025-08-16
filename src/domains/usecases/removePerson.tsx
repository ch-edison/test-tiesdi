import { idPerson } from "../entities/Person";
import { PersonRepository } from "../repositories/personRepository";

export class RemovePerson {
  constructor(private readonly repo: PersonRepository) {}
  exec(id: idPerson) { return this.repo.remove(id); }
}