import { PersonRepository } from "../repositories/personRepository";

export class ListPeople {
  constructor(private readonly repo: PersonRepository) {}
  exec() { return this.repo.list(); }
}
