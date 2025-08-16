import { AddPerson } from "../src/domains/usecases/addPerson";
import { ListPeople } from "../src/domains/usecases/listPerson";
import { RemovePersonPhoto } from "../src/domains/usecases/removePersonPhoto";
import { UpdatePerson } from "../src/domains/usecases/updatePerson";

class InMemoryRepo {
  listData: any[] = [];
  async list() { return this.listData; }
  async add(p: any) {
    const n = { id: String(Date.now()), ...p };
    this.listData = [n, ...this.listData];
    return this.listData;
  }
  async update(id: string, patch: any) {
    this.listData = this.listData.map(x => x.id === id ? { ...x, ...patch } : x);
    return this.listData;
  }
  async remove(id: string) {
    this.listData = this.listData.filter(x => x.id !== id);
    return this.listData;
  }
  async removePhoto(id: string) {
    return this.update(id, { image: null });
  }
}

describe("UseCases (name/lastName/image)", () => {
  it("AddPerson valida y agrega", async () => {
    const repo = new InMemoryRepo();
    const add = new AddPerson(repo as any);

    await add.exec({ name: "Ada", lastName: "Lovelace" });

    const list = new ListPeople(repo as any);
    const data = await list.exec();
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({ name: "Ada", lastName: "Lovelace", image: null });
  });

  it("UpdatePerson y RemovePersonPhoto", async () => {
    const repo = new InMemoryRepo();
    const add = new AddPerson(repo as any);
    const list = new ListPeople(repo as any);

    await add.exec({ name: "Linus", lastName: "Torvalds", image: "uri://a" });
    const id = (await list.exec())[0].id;

    const update = new UpdatePerson(repo as any);
    await update.exec(id, { name: "Linus B." });
    expect((await list.exec())[0].name).toBe("Linus B.");

    const removePhoto = new RemovePersonPhoto(repo as any);
    await removePhoto.exec(id);
    expect((await list.exec())[0].image).toBeNull();
  });
});
