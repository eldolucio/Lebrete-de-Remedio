#!/bin/bash

# Script de Build para Android - Lembrete de Remédio
# Este script automatiza o processo de geração do APK

set -e

echo "================================"
echo "Build Android - Lembrete de Remédio"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se o projeto está pronto
if [ ! -d "android" ]; then
    echo -e "${YELLOW}Gerando arquivos nativos...${NC}"
    npx expo prebuild --clean
fi

echo -e "${YELLOW}Limpando builds anteriores...${NC}"
cd android
./gradlew clean

echo -e "${YELLOW}Construindo APK de release...${NC}"
./gradlew assembleRelease

# Verificar se o build foi bem-sucedido
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo -e "${GREEN}✓ Build concluído com sucesso!${NC}"
    echo ""
    echo "APK gerado em:"
    echo "  app/build/outputs/apk/release/app-release.apk"
    echo ""
    echo "Tamanho do APK:"
    ls -lh app/build/outputs/apk/release/app-release.apk | awk '{print "  " $5}'
    echo ""
    echo "Para instalar em um dispositivo conectado:"
    echo "  adb install -r app/build/outputs/apk/release/app-release.apk"
else
    echo -e "${RED}✗ Erro ao gerar APK${NC}"
    exit 1
fi

cd ..
