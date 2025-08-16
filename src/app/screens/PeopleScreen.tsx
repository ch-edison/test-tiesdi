import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AsyncStoragePersonRepository } from '../../storage/AsyncStoragePersonRepository';

import { ListPeople } from '../../domains/usecases/listPerson';
import { AddPerson } from '../../domains/usecases/addPerson';
import { UpdatePerson } from '../../domains/usecases/updatePerson';
import { RemovePerson } from '../../domains/usecases/removePerson';
import { RemovePersonPhoto } from '../../domains/usecases/removePersonPhoto';

import { PersonForm } from '../components/PersonForm';
import { PersonCard } from '../components/PersonCard';
import { Person } from '../../domains/entities/Person';

const repo = new AsyncStoragePersonRepository();

export function PeopleScreen() {
  const [people, setPeople] = useState<Person[]>([]);
  const [listVisible, setListVisible] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [editing, setEditing] = useState<Person | null>(null);

  const listUC = useMemo(() => new ListPeople(repo), []);
  const addUC = useMemo(() => new AddPerson(repo), []);
  const updateUC = useMemo(() => new UpdatePerson(repo), []);
  const removeUC = useMemo(() => new RemovePerson(repo), []);
  const removePhotoUC = useMemo(() => new RemovePersonPhoto(repo), []);

  const refresh = useCallback(async () => {
    const data = await listUC.exec();
    setPeople(data);
  }, [listUC]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onCreate = useCallback(() => {
    setEditing(null);
    setEditorVisible(true);
  }, []);

  const onEdit = useCallback((p: Person) => {
    setListVisible(false);
    setEditing(p);
    setEditorVisible(true);
}, []);

  const onSubmit = useCallback(
  async (values: { name: string; lastName: string; image?: string | null }) => {
    try {
      const payload = {
        name: values.name,
        lastName: values.lastName,
        image: values.image ?? null,
      };

      let next: Person[];
      if (editing) {
        next = await updateUC.exec(editing.id, payload);
      } else {
        next = await addUC.exec(payload);
      }

      setPeople(next);
      setEditorVisible(false);
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Ocurrió un error al guardar.');
    }
  },
  [editing, addUC, updateUC]
);


  const onDelete = useCallback(
    (id: string) => {
      Alert.alert('Eliminar', '¿Deseas eliminar este registro?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => setPeople(await removeUC.exec(id)),
        },
      ]);
    },
    [removeUC]
  );

  const onRemovePhoto = useCallback(
    async (id: string) => {
      setPeople(await removePhotoUC.exec(id));
    },
    [removePhotoUC]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Personas</Text>
        <TouchableOpacity onPress={onCreate} style={[styles.btn, styles.primary]}>
          <Text style={styles.btnText}>Nueva</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setListVisible(true)} style={[styles.btn, styles.secondary]}>
          <Text style={styles.btnText}>Ver listado</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={editorVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditorVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
          <PersonForm
            initial={editing ? {
                name: editing.name,
                lastName: editing.lastName,
                image: editing.image,
            } : undefined}
            onSubmit={onSubmit}
            onCancel={() => setEditorVisible(false)}
          />
        </SafeAreaView>
      </Modal>

      <Modal
        visible={listVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setListVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Listado de personas</Text>
            <TouchableOpacity onPress={() => setListVisible(false)} style={[styles.btn, styles.secondary]}>
              <Text style={styles.btnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 12, gap: 12 }}
            ListEmptyComponent={
              <Text style={{ color: '#94a3b8', padding: 16 }}>No hay personas registradas.</Text>
            }
            renderItem={({ item }) => (
              <PersonCard
                person={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onRemovePhoto={onRemovePhoto}
              />
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginLeft: 8 },
  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#334155' },
  btnText: { color: 'white', fontWeight: '600' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  listTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
});
