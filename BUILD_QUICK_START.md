# Quick Start - Build para iOS e Android

## Resumo Rápido

Este projeto inclui scripts automatizados para facilitar o build para iOS e Android.

## Android (Recomendado para Começar)

### No Windows/Linux/macOS:

```bash
# 1. Instale as dependências
npm install

# 2. Execute o script de build
./build-android.sh
```

O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

### Instalar em um dispositivo:

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

## iOS (Apenas macOS)

### No macOS:

```bash
# 1. Instale as dependências
npm install

# 2. Execute o script de build
./build-ios.sh
```

O arquivo será gerado em: `build/lembreteremedio.xcarchive`

### Exportar IPA:

1. Abra o arquivo gerado: `open build/lembreteremedio.xcarchive`
2. Clique em **Distribute App**
3. Selecione o método de distribuição
4. Siga as instruções

## Informações Importantes

### Keystore Android
- **Localização**: `android/app/lembrete-remedio-key.keystore`
- **Alias**: `lembrete-remedio-key`
- **Senha**: `lembreteremedio123`

### Certificados iOS
- Você precisa de uma conta Apple Developer
- Configure os certificados no Xcode antes de fazer build

## Troubleshooting

### "Command not found: ./build-android.sh"
```bash
chmod +x build-android.sh build-ios.sh
```

### "Gradle sync failed"
```bash
cd android && ./gradlew clean && cd ..
```

### "Pod install failed"
```bash
cd ios && pod repo update && pod install && cd ..
```

## Próximos Passos

1. **Teste o app**: Instale o APK em um dispositivo Android
2. **Configure o iOS**: Adicione seus certificados Apple Developer
3. **Publique**: Envie para Google Play Store ou App Store

Para instruções detalhadas, consulte `BUILD_GUIDE.md`
