# Guia de Build - Lembrete de Remédio

Este guia fornece instruções passo a passo para empacotar o aplicativo Lembrete de Remédio para iOS e Android.

## Pré-requisitos

### Para Android
- **Android Studio** (versão 2022.1 ou superior)
- **Android SDK** (API level 34 ou superior)
- **Java Development Kit (JDK)** versão 11 ou superior
- **Gradle** (incluído no Android Studio)

### Para iOS
- **macOS** (Monterey ou superior)
- **Xcode** (versão 14 ou superior)
- **CocoaPods** (`sudo gem install cocoapods`)
- **Node.js** e **npm**

## Preparação do Projeto

### 1. Instalar Dependências

```bash
cd lembrete-remedio-app
npm install
```

### 2. Gerar Arquivos Nativos

```bash
npx expo prebuild --clean
```

Este comando cria os diretórios `android/` e `ios/` com toda a configuração necessária.

## Build para Android

### Opção 1: Gerar APK (Recomendado para Teste)

```bash
cd android
./gradlew assembleRelease
```

O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

**Tempo estimado**: 10-15 minutos

### Opção 2: Gerar AAB (Para Google Play Store)

```bash
cd android
./gradlew bundleRelease
```

O AAB será gerado em: `android/app/build/outputs/bundle/release/app-release.aab`

### Configuração de Assinatura (Android)

O projeto já inclui um keystore pré-configurado em `android/app/lembrete-remedio-key.keystore`:

- **Alias**: `lembrete-remedio-key`
- **Senha**: `lembreteremedio123`
- **Validade**: 10.000 dias

Se desejar criar um novo keystore:

```bash
keytool -genkey -v -keystore android/app/my-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

## Build para iOS

### 1. Instalar Dependências CocoaPods

```bash
cd ios
pod install
cd ..
```

### 2. Abrir no Xcode

```bash
open ios/lembreteremedio.xcworkspace
```

### 3. Configurar Assinatura

1. Selecione o projeto no Xcode
2. Vá para **Signing & Capabilities**
3. Selecione sua **Team**
4. Configure o **Bundle Identifier** (se necessário)

### 4. Gerar Build

#### Para Teste (Development)

```bash
xcodebuild -workspace ios/lembreteremedio.xcworkspace \
  -scheme lembreteremedio \
  -configuration Debug \
  -derivedDataPath build
```

#### Para Produção (Release)

```bash
xcodebuild -workspace ios/lembreteremedio.xcworkspace \
  -scheme lembreteremedio \
  -configuration Release \
  -derivedDataPath build \
  -archivePath build/lembreteremedio.xcarchive \
  archive
```

### 5. Exportar IPA

Após criar o arquivo, abra o Xcode Organizer:

```bash
open build/lembreteremedio.xcarchive
```

Clique em **Distribute App** e siga as instruções.

## Publicação nas Lojas

### Google Play Store

1. Crie uma conta de desenvolvedor: https://play.google.com/console
2. Crie um novo app
3. Faça upload do AAB (`app-release.aab`)
4. Preencha as informações do app (descrição, screenshots, etc.)
5. Envie para revisão

### App Store

1. Crie uma conta de desenvolvedor: https://developer.apple.com
2. Crie um novo app no App Store Connect
3. Faça upload do IPA usando o Transporter
4. Preencha as informações do app
5. Envie para revisão

## Troubleshooting

### Erro: "Gradle sync failed"

**Solução**: Limpe o cache do Gradle

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Erro: "Pod install failed"

**Solução**: Atualize o CocoaPods

```bash
sudo gem install cocoapods
cd ios
pod repo update
pod install
```

### Erro: "Certificate not found"

**Solução**: Verifique as credenciais de assinatura no Xcode

1. Abra Xcode Preferences
2. Vá para **Accounts**
3. Adicione sua conta Apple Developer
4. Atualize os certificados

## Informações do App

- **Nome**: Lembrete de Remédio
- **Bundle ID (iOS)**: `space.manus.lembrete.remedio.app.t20240115103045`
- **Package Name (Android)**: `space.manus.lembrete.remedio.app.t20240115103045`
- **Versão**: 1.0.0
- **Requisitos Mínimos**:
  - iOS 13.4 ou superior
  - Android 8.0 (API 26) ou superior

## Recursos Adicionais

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Android Build Documentation](https://developer.android.com/build)
- [iOS Build Documentation](https://developer.apple.com/build)

## Suporte

Para problemas ou dúvidas, consulte:
- Documentação do Expo: https://docs.expo.dev
- Stack Overflow: https://stackoverflow.com/questions/tagged/react-native
- GitHub Issues: https://github.com/expo/expo/issues
