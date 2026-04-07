#!/bin/bash

# Script de Build para iOS - Lembrete de Remédio
# Este script automatiza o processo de geração do IPA

set -e

echo "================================"
echo "Build iOS - Lembrete de Remédio"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está em macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}✗ Este script só funciona em macOS${NC}"
    exit 1
fi

# Verificar se o projeto está pronto
if [ ! -d "ios" ]; then
    echo -e "${YELLOW}Gerando arquivos nativos...${NC}"
    npx expo prebuild --clean
fi

echo -e "${YELLOW}Instalando dependências CocoaPods...${NC}"
cd ios
pod install
cd ..

echo -e "${YELLOW}Construindo arquivo para iOS...${NC}"
xcodebuild -workspace ios/lembreteremedio.xcworkspace \
  -scheme lembreteremedio \
  -configuration Release \
  -derivedDataPath build \
  -archivePath build/lembreteremedio.xcarchive \
  archive

if [ -d "build/lembreteremedio.xcarchive" ]; then
    echo -e "${GREEN}✓ Build concluído com sucesso!${NC}"
    echo ""
    echo "Arquivo gerado em:"
    echo "  build/lembreteremedio.xcarchive"
    echo ""
    echo "Para exportar o IPA:"
    echo "  1. Abra o Xcode Organizer: open build/lembreteremedio.xcarchive"
    echo "  2. Clique em 'Distribute App'"
    echo "  3. Selecione 'App Store Connect' ou 'Ad Hoc'"
    echo "  4. Siga as instruções"
else
    echo -e "${RED}✗ Erro ao gerar arquivo${NC}"
    exit 1
fi
