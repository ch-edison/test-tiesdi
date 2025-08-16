# TIESDI — React Native CRUD de Personas (AsyncStorage)

CRUD de **personas** (nombre, apellido, fotografía) con **pantallas flotantes (Modal)**, miniaturas, edición/eliminación de fotos, y persistencia con **AsyncStorage**. Arquitectura por capas (app/domain/infrastructure) y **tests** con Jest + React Native Testing Library.

---

## ⚙️ Requisitos

- **Node.js 18 LTS** (recomendado). Con `nvm`:
  ```bash
  nvm install 18
  nvm use 18
  ```
- **Java 17** (Android) y **Android Studio** (SDK, emulador, `adb`).
- **Xcode** + **CocoaPods** (iOS): `sudo gem install cocoapods`.
- **Yarn o npm** (este repo usa npm).

> **Compatibilidad actual**: React Native **0.75.4** + React **18.2.0**.

---

## 📁 Estructura del proyecto

```
project/
├─ index.js
├─ App.tsx
├─ src/
│  ├─ app/
│  │  ├─ components/
│  │  │  ├─ PersonForm.tsx
│  │  │  └─ PersonCard.tsx
│  │  ├─ screens/
│  │  │  └─ PeopleScreen.tsx
│  │  └─ App.tsx
│  ├─ domains/
│  │  ├─ entities/
│  │  │  └─ Person.ts
│  │  ├─ repositories/
│  │  │  └─ personRepository.ts
│  │  └─ usecases/
│  │     ├─ addPerson.ts
│  │     ├─ listPerson.ts
│  │     ├─ updatePerson.ts
│  │     ├─ removePerson.ts
│  │     └─ removePersonPhoto.ts
│  ├─ storage/
│  │  └─ AsyncStoragePersonRepository.ts
├─ __tests__/
│  ├─ personRepository.test.ts
│  ├─ usecases.test.ts
│  └─ PeopleScreen.test.tsx
├─ ios/
│  ├─ Podfile
│  └─ ... (Pods generados)
├─ android/
│  └─ ...
└─ package.json
```

### 🔌 Capas

- **app/**: UI y navegación. No contiene lógica de negocio ni acceso a datos.
- **domains/**: *Enterprise rules*
  - **entities/**: modelos de dominio (`Person`).
  - **repositories/**: contratos/puertos (interfaces).
  - **usecases/**: casos de uso (Add/List/Update/Remove/RemovePhoto).
- **storage/**: adaptador/implementación concreta del repositorio (AsyncStorage).

### 📷 Imágenes

- Miniaturas renderizadas con \`\` (caché nativa y performance).
- Se guarda **sólo la URI** en AsyncStorage (no blobs), conservando el almacenamiento ligero.

---

## 🚀 Instalación

1. Dependencias JS

```bash
npm install
```

2. iOS (Pods)

```bash
npx pod-install
```


## ▶️ Correr en desarrollo

### Android (emulador o dispositivo)

```bash
npx react-native run-android 
```

Requisitos:

- Emulador con API acorde o dispositivo conectado con `adb devices`.

### iOS (simulador)

```bash
npx react-native run-ios 
```

> Si falla con código 65, abre el workspace en Xcode (`xed ios`) y compila con ⌘R para ver el log detallado.

### Metro con limpieza de caché

```bash
npm start -- --reset-cache
```

---

## 🧪 Tests

- **Unitarios** (casos de uso y repos): Jest.
- **Componentes**: @testing-library/react-native.

```bash
npm test
npm run test:watch
```

> Sugerencia:
>
> - Testea `AsyncStoragePersonRepository` con el mock oficial: `@react-native-async-storage/async-storage/jest/async-storage-mock`.
> - Testea `PeopleScreen` con interacciones: abrir modal, enviar formulario, verificar render de tarjeta y acciones.

---

## 🏗️ Builds de producción

### Android — APK / AAB (Release)

1. **Firma**: crea un keystore (si no tienes):

   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias tiesdi -keyalg RSA -keysize 2048 -validity 10000
   ```

   Mueve el keystore a `android/app/` y configura `android/gradle.properties` y `android/app/build.gradle` con tus credenciales (`MYAPP_UPLOAD_STORE_FILE`, etc.).

2. **Compilar**:

   ```bash
   cd android
   ./gradlew assembleRelease      # genera APK
   # o
   ./gradlew bundleRelease        # genera AAB
   ```

3. **Salida**:

   - APK: `android/app/build/outputs/apk/release/app-release.apk`
   - AAB: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS — Archive / App Store

1. Abre `ios/tiesdi.xcworkspace` en Xcode.
2. Selecciona **Any iOS Device (arm64)**.
3. **Product → Archive**. Luego **Distribute App** para TestFlight/App Store.

> Asegúrate de usar **Scheme: Release**, configurar Signing & Capabilities y versión/build en `General`.

---

## 🧩 Scripts útiles

```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint ."
  }
}
```

---

## 🩺 Troubleshooting

- **Metro “Unable to resolve module …”**

  - Asegúrate de que el paquete esté en `dependencies` (no dev).
  - `npm i` y `npm start -- --reset-cache`.

- **iOS: “Unable to open base configuration … Pods-\*.xcconfig”**

  - Falta instalar Pods o el Podfile es inconsistente.
  - `rm -rf ios/Pods ios/Podfile.lock && npx pod-install`.

---

## 🧱 Decisiones técnicas

- **AsyncStorage** para persistencia local liviana. Sólo se guardan URIs de fotos.
- **react-native-fast-image** para miniaturas con caché nativa.
- **Arquitectura por capas**: separación de UI, dominio y adaptadores para facilitar testing y cambios (p. ej., cambiar a SQLite o API remota sin tocar UI ni casos de uso).

---

## 📌 Roadmap sugerido

- Validar tamaños de imagen y comprimir con `react-native-image-resizer`.
- Agregar navegación con `@react-navigation/native` si crece el flujo.
- E2E con Detox.

---

## ✨ Preguntas Tecnicas Resueltas

- **¿Cuál es la diferencia principal entre React Native y ReactJS?**
  -ReactJS: renderiza en el DOM (web)
  -React Native: renderiza con componentes nativos de cada plataforma android/ios

- **Explique cómo funciona el ciclo de vida de un componente en React Native.**
  - son tres 
    - Montaje
      Se crea y se muestra por una vez ComponendDidMount con funciones como UseEfect
    - Actualizacion
      El componente se renderiza cuando cambia alguna prop o state componendDidUpdate, con funciones como useEffect agregando dependencias
    - Desmontaje
      Cuando el componente se quita de la pantalla componentWillUnmount con funciones como useEffect, aqui se limpia listeners, u aborta requests, etc. la idea es no dar a la fuga de memoria.

- **¿Qué es AsyncStorage y en qué casos es recomendable usarlo?**
 - Es un almacenamiento clave/valor que persiste en el dispositivo, se usa para datos no sensibles, datos pequeños, como preferencias, perfil, algunas flags.

- **¿Cuál es la diferencia entre usar FlatList y ScrollView en React Native?**
 - ScrollView: Renderiza todo
 - Flatlist: Renderiza lo que se ve en la pantalla, renderizado virtual, eficiente en información grande.
