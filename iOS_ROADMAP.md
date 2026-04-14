# Roadmap iOS - Lembrete de Remédio

## Status Atual

A versão iOS do Lembrete de Remédio está em desenvolvimento. O código base é totalmente compatível com iOS, e estamos trabalhando na preparação para publicação na App Store.

**Status**: 🔄 Em desenvolvimento | **ETA**: Q2 2026

## O que já está pronto

Todas as funcionalidades principais já foram desenvolvidas e testadas no iOS através do Expo Go:

- ✅ Gerenciamento de medicamentos
- ✅ Notificações locais
- ✅ Histórico de doses
- ✅ Perfil de usuário
- ✅ Configurações
- ✅ Tema claro/escuro
- ✅ Armazenamento local
- ✅ Interface nativa iOS

## Próximos Passos

### Fase 1: Preparação (Semana 1-2)

1. **Configurar Conta Apple Developer**
   - Acesse https://developer.apple.com/account
   - Crie uma conta ou faça login
   - Pague a taxa anual de $99 USD
   - Aceite os acordos de desenvolvedor

2. **Gerar Certificados e Provisioning Profiles**
   - Acesse Certificates, Identifiers & Profiles
   - Crie um App ID para o aplicativo
   - Gere um certificado de desenvolvimento
   - Crie um provisioning profile

3. **Configurar Xcode**
   - Instale Xcode (versão 14+)
   - Configure sua conta Apple Developer no Xcode
   - Instale dependências necessárias

### Fase 2: Build e Testes (Semana 3-4)

1. **Gerar Build iOS**
   ```bash
   ./build-ios.sh
   ```

2. **Testar em Dispositivo Real**
   - Conecte um iPhone/iPad
   - Execute o build no dispositivo
   - Teste todas as funcionalidades
   - Verifique notificações e background tasks

3. **Testar em Simulador**
   - Use o simulador do Xcode
   - Teste em diferentes versões do iOS (14+)
   - Teste em diferentes tamanhos de tela

### Fase 3: Preparação para App Store (Semana 5-6)

1. **Criar Listagem na App Store**
   - Acesse App Store Connect
   - Crie uma nova aplicação
   - Preencha informações básicas
   - Configure preço e disponibilidade

2. **Preparar Screenshots e Descrição**
   - Capture screenshots em diferentes idiomas
   - Escreva descrição atraente
   - Prepare palavras-chave (keywords)
   - Crie ícone de 1024x1024px

3. **Configurar Informações de Privacidade**
   - Preencha Privacy Policy
   - Configure permissões solicitadas
   - Declare coleta de dados (se houver)

### Fase 4: Submissão (Semana 7)

1. **Submeter para Review**
   - Faça upload do build
   - Preencha informações de contato
   - Responda perguntas de conformidade
   - Clique em "Submit for Review"

2. **Aguardar Aprovação**
   - Tempo típico: 24-48 horas
   - Apple pode solicitar alterações
   - Responda rapidamente a qualquer feedback

3. **Publicar**
   - Após aprovação, clique em "Release"
   - Escolha lançamento imediato ou agendado
   - Monitore downloads e reviews

## Requisitos Técnicos

### Mínimo

- iOS 14.0+
- iPhone 6s ou posterior
- iPad (5ª geração) ou posterior

### Recomendado

- iOS 15.0+
- iPhone 12 ou posterior
- iPad (7ª geração) ou posterior

## Recursos Necessários

1. **Mac com macOS 12+**
   - Para compilar e testar
   - Xcode instalado

2. **Conta Apple Developer**
   - Taxa anual: $99 USD
   - Necessária para publicar na App Store

3. **Certificados e Provisioning Profiles**
   - Gerados através do Apple Developer Portal
   - Válidos por 1 ano

4. **Dispositivo iOS Real** (recomendado)
   - Para testes finais
   - Verificar notificações e background

## Checklist de Lançamento

- [ ] Conta Apple Developer criada e ativa
- [ ] Certificados e provisioning profiles gerados
- [ ] Xcode configurado com conta Apple
- [ ] Build iOS compilado com sucesso
- [ ] Testado em dispositivo real
- [ ] Testado em simulador (múltiplas versões)
- [ ] Screenshots preparadas (5 por idioma)
- [ ] Descrição escrita e revisada
- [ ] Privacy Policy preparada
- [ ] Ícone 1024x1024px criado
- [ ] Versão incrementada (1.0.0)
- [ ] Build number incrementado
- [ ] Listagem criada no App Store Connect
- [ ] Build enviado e testado
- [ ] Submetido para review
- [ ] Aprovado e publicado

## Instruções Detalhadas

### 1. Configurar Conta Apple Developer

```bash
# Visite o site
open https://developer.apple.com/account

# Faça login com sua Apple ID
# Pague a taxa anual de $99 USD
# Aceite os acordos
```

### 2. Gerar Certificados

```bash
# Acesse Certificates, Identifiers & Profiles
open https://developer.apple.com/account/resources/certificates/list

# Crie um novo App ID
# Crie um certificado de desenvolvimento
# Crie um provisioning profile
```

### 3. Configurar Xcode

```bash
# Abra Xcode
open /Applications/Xcode.app

# Vá para Xcode > Preferences > Accounts
# Adicione sua conta Apple Developer
# Selecione o team
```

### 4. Compilar para iOS

```bash
cd /home/ubuntu/lembrete-remedio-app

# Instale dependências
pnpm install

# Compile para iOS
./build-ios.sh

# Ou manualmente com Expo
eas build --platform ios --profile preview
```

### 5. Testar no Dispositivo

```bash
# Conecte seu iPhone via USB
# Abra o projeto no Xcode
open ios/LembreteRemedio.xcworkspace

# Selecione seu dispositivo
# Clique em "Run"
```

### 6. Preparar Screenshots

Use um iPhone 14 Pro Max (6.7") para capturar screenshots:

1. Abra o aplicativo
2. Navegue para cada tela principal
3. Capture 5 screenshots
4. Redimensione para 1242x2688px
5. Salve em alta qualidade

**Telas recomendadas:**
- Home com medicamentos
- Adicionar medicamento
- Histórico de doses
- Perfil do usuário
- Configurações

### 7. Escrever Descrição

```
Lembrete de Remédio - Seu assistente pessoal de saúde

Nunca mais esqueça de tomar seus medicamentos com o Lembrete de Remédio, 
o aplicativo inteligente para gerenciar medicamentos e acompanhar sua aderência.

FUNCIONALIDADES PRINCIPAIS:
• Gerenciar múltiplos medicamentos com horários personalizados
• Receber notificações automáticas nos horários programados
• Acompanhar histórico completo de doses
• Armazenar informações de saúde pessoal
• Manter contatos de emergência sempre à mão
• Tema claro e escuro automático
• Sincronização segura entre dispositivos (em breve)

PRIVACIDADE E SEGURANÇA:
Seus dados de saúde são armazenados localmente no seu dispositivo. 
Nós não coletamos, compartilhamos ou vendemos seus dados pessoais.

COMPATIBILIDADE:
iOS 14.0 ou posterior
iPhone, iPad

Comece hoje mesmo e cuide melhor da sua saúde!
```

## Perguntas Frequentes

### P: Quanto custa publicar na App Store?
R: A taxa de desenvolvedor é $99 USD por ano. Não há taxa por aplicativo.

### P: Quanto tempo leva para ser aprovado?
R: Geralmente 24-48 horas, mas pode variar.

### P: Posso testar antes de publicar?
R: Sim, use TestFlight para distribuir beta para até 100 testadores.

### P: O aplicativo é gratuito?
R: Sim, o Lembrete de Remédio é gratuito e sem anúncios.

### P: Como faço atualizações?
R: Incremente a versão no `app.config.ts`, compile e submeta uma nova versão.

## Recursos Úteis

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Expo iOS Documentation](https://docs.expo.dev/build/setup/#ios)
- [TestFlight Guide](https://developer.apple.com/testflight/)

## Suporte

Se encontrar problemas durante o processo:

1. Consulte a documentação oficial
2. Abra uma issue no GitHub
3. Entre em contato com o suporte da Apple

---

**Última atualização**: Abril 2026  
**Versão**: 1.0.0  
**Status**: 🔄 Em desenvolvimento
