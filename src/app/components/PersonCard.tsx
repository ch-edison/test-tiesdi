import { Image, TouchableOpacity, View, StyleSheet,Text } from "react-native";
import { Person } from "../../domains/entities/Person";

export function PersonCard({ person, onEdit, onDelete, onRemovePhoto }: {
  person: Person;
  onEdit: (p: Person) => void;
  onDelete: (id: string) => void;
  onRemovePhoto: (id: string) => void;
}) {
  return (
    <View style={styles.card}>
      {person.image ? (
        <Image source={{ uri: person.image }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbEmpty]}><Text style={styles.thumbText}>No foto</Text></View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{person.name} {person.lastName}</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => onEdit(person)} style={[styles.small, styles.primary]}><Text style={styles.smallText}>Editar</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(person.id)} style={[styles.small, styles.danger]}><Text style={styles.smallText}>Eliminar</Text></TouchableOpacity>
          {person.image ? (
            <TouchableOpacity onPress={() => onRemovePhoto(person.id)} style={[styles.small, styles.warn]}><Text style={styles.smallText}>Quitar foto</Text></TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#0f172a', borderRadius: 12, padding: 12, flexDirection: 'row', gap: 12, alignItems: 'center', borderWidth: 1, borderColor: '#1e293b' },
  thumb: { width: 56, height: 56, borderRadius: 8 },
  thumbEmpty: { backgroundColor: '#0b1220', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1e293b' },
  thumbText: { color: '#64748b', fontSize: 12 },
  name: { color: 'white', fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  small: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  smallText: { color: 'white', fontWeight: '600' },
  primary: { backgroundColor: '#2563eb' },
  danger: { backgroundColor: '#dc2626' },
  warn: { backgroundColor: '#d97706' },
});
