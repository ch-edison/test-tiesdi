import { AsyncStoragePersonRepository } from '../src/storage/AsyncStoragePersonRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('AsyncStoragePersonRepository (name/lastName/image)', () => {
  let repo: AsyncStoragePersonRepository;

  beforeEach(async () => {
    await AsyncStorage.clear();
    repo = new AsyncStoragePersonRepository();
  });

  it('add/list works', async () => {
    await repo.add({ name: 'Ada', lastName: 'Lovelace', image: null });
    const list = await repo.list();

    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({
      name: 'Ada',
      lastName: 'Lovelace',
      image: null,
    });
    expect(typeof list[0].id).toBe('string');
  });

  it('update and remove photo', async () => {
    const afterAdd = await repo.add({ name: 'Linus', lastName: 'Torvalds', image: 'uri://x' });
    const id = afterAdd[0].id;

    await repo.update(id, { name: 'Linus B.' });
    let list = await repo.list();
    expect(list[0].name).toBe('Linus B.');
    expect(list[0].image).toBe('uri://x');

    await repo.removePhoto(id);
    list = await repo.list();
    expect(list[0].image).toBeNull();
  });

  it('remove works', async () => {
    const afterAdd = await repo.add({ name: 'Grace', lastName: 'Hopper', image: null });
    const id = afterAdd[0].id;

    await repo.remove(id);
    const list = await repo.list();
    expect(list).toHaveLength(0);
  });
});
