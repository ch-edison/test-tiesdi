import { useCallback, useMemo, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { launchImageLibrary } from "react-native-image-picker";

export function PersonForm({ initial, onSubmit, onCancel }: {
  initial?: { name?: string; lastName?: string; image?: string | null };
  onSubmit: (values: { name: string; lastName: string; image?: string | null }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [lastName, setLastName] = useState(initial?.lastName ?? '');
  const [image, setImage] = useState<string | null | undefined>(initial?.image ?? null);

  const pickImage = useCallback(async () => {
    const res = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const asset = res.assets?.[0];
    if (asset?.uri) setImage(asset.uri);
  }, []);

  const disabled = useMemo(() => !name.trim() || !lastName.trim(), [name, lastName]);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{initial ? 'Editar persona' : 'Nueva persona'}</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nombre" style={styles.input} />
      <TextInput value={lastName} onChangeText={setLastName} placeholder="Apellido" style={styles.input} />
      <View style={styles.row}>
        <TouchableOpacity onPress={pickImage} style={styles.pickBtn}><Text style={styles.btnText}>Elegir foto</Text></TouchableOpacity>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={[styles.preview, styles.previewEmpty]}><Text style={styles.previewText}>Sin foto</Text></View>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.secondary]}><Text style={styles.btnText}>Cancelar</Text></TouchableOpacity>
        <TouchableOpacity disabled={disabled} onPress={() => onSubmit({ name: name.trim(), lastName: lastName.trim(), image })} style={[styles.btn, disabled ? styles.disabled : styles.primary]}><Text style={styles.btnText}>Guardar</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 16, gap: 10 },
  title: { color: 'white', fontSize: 18, fontWeight: '700' },
  input: { backgroundColor: '#0f172a', color: 'white', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#1e293b' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pickBtn: { backgroundColor: '#475569', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: 'white', fontWeight: '600' },
  preview: { width: 54, height: 54, borderRadius: 8 },
  previewEmpty: { backgroundColor: '#0b1220', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1e293b' },
  previewText: { color: '#64748b', fontSize: 12 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#334155' },
  disabled: { backgroundColor: '#475569' },
});