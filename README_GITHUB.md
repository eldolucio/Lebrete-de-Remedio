# Lembrete de Remédio 💊

Um aplicativo móvel inteligente para gerenciar medicamentos, acompanhar doses e manter informações de saúde pessoais. Desenvolvido com **React Native**, **Expo** e **TypeScript**, o Lembrete de Remédio oferece uma experiência fluida e intuitiva para usuários iOS e Android.

## 🎯 Características Principais

O aplicativo foi desenvolvido com foco em usabilidade e funcionalidade, oferecendo as seguintes características:

### Gerenciamento de Medicamentos
O sistema de gerenciamento permite adicionar medicamentos com múltiplos horários de administração. Cada medicamento pode ser configurado para dias específicos da semana, e o aplicativo gera automaticamente um calendário de doses para os próximos 30 dias. Usuários podem visualizar o status de cada dose (pendente, tomada ou perdida) e marcar doses como tomadas com um simples toque.

### Notificações Inteligentes
O aplicativo envia notificações locais nos horários programados para cada medicamento. As notificações podem ser personalizadas com antecedência (5, 10 ou 15 minutos antes do horário). Quando uma dose é marcada como tomada, a notificação correspondente é automaticamente cancelada, evitando lembretes desnecessários.

### Histórico de Doses
Todas as doses tomadas são registradas com data e hora exata. O histórico oferece filtros para visualizar todas as doses, apenas as tomadas ou as perdidas. Usuários podem acompanhar sua aderência ao longo do tempo e identificar padrões de comportamento.

### Perfil de Usuário Completo
A tela de perfil permite armazenar informações pessoais e de saúde, incluindo nome, data de nascimento, tipo sanguíneo, alergias e condições médicas. O aplicativo suporta múltiplos contatos de emergência com nome, relacionamento, telefone e email, facilitando o acesso rápido a informações críticas em situações de emergência.

### Configurações Personalizáveis
Os usuários podem controlar preferências de notificação, selecionar entre tema claro ou escuro, e ajustar a antecedência padrão para notificações. Todas as configurações são salvas localmente no dispositivo.

## 📱 Plataformas Suportadas

| Plataforma | Status | Versão |
|-----------|--------|---------|
| iOS | ✅ Em desenvolvimento | 1.0.0 |
| Android | ✅ Pronto | 1.0.0 |
| Web | ✅ Suporte técnico | 1.0.0 |

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm** (gerenciador de pacotes)
- **Expo CLI** (para desenvolvimento e preview)
- **Git** (para controle de versão)

Para desenvolvimento em iOS, você precisará de um Mac com Xcode instalado. Para Android, instale o Android Studio e configure o Android SDK.

### Instalação

Comece clonando o repositório e instalando as dependências:

```bash
git clone https://github.com/seu-usuario/lembrete-remedio-app.git
cd lembrete-remedio-app
pnpm install
```

### Executar em Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

Isso iniciará o Metro Bundler e o servidor de desenvolvimento. Você verá um código QR no terminal que pode ser escaneado com o Expo Go no seu dispositivo móvel para visualizar o aplicativo em tempo real.

### Executar em Dispositivos Específicos

Para executar no iOS (requer macOS):

```bash
pnpm ios
```

Para executar no Android:

```bash
pnpm android
```

Para executar na web:

```bash
pnpm web
```

## 📁 Estrutura do Projeto

O projeto segue uma estrutura modular e bem organizada:

```
lembrete-remedio-app/
├── app/                          # Rotas e telas do aplicativo
│   ├── (tabs)/                   # Navegação por abas
│   │   ├── index.tsx             # Tela Home com medicamentos do dia
│   │   ├── history.tsx           # Histórico de doses
│   │   ├── settings.tsx          # Configurações
│   │   ├── profile.tsx           # Perfil do usuário
│   │   ├── add-medication.tsx    # Adicionar medicamento
│   │   ├── edit-medication.tsx   # Editar medicamento
│   │   └── medication-detail.tsx # Detalhes do medicamento
│   ├── _layout.tsx               # Layout raiz com providers
│   └── oauth/                    # Callbacks de autenticação
├── components/                   # Componentes reutilizáveis
│   ├── screen-container.tsx      # Container com SafeArea
│   ├── medication-card.tsx       # Card de medicamento
│   ├── haptic-tab.tsx            # Tab com feedback háptico
│   └── ui/
│       └── icon-symbol.tsx       # Ícones da navegação
├── hooks/                        # Hooks customizados
│   ├── use-colors.ts             # Hook de cores do tema
│   ├── use-color-scheme.ts       # Hook de modo claro/escuro
│   └── use-notifications.ts      # Hook de notificações
├── lib/                          # Utilitários e contextos
│   ├── types.ts                  # Tipos TypeScript
│   ├── medication-context.tsx    # Contexto de medicamentos
│   ├── user-profile-context.tsx  # Contexto de perfil
│   ├── utils.ts                  # Funções utilitárias
│   ├── trpc.ts                   # Cliente tRPC
│   └── theme-provider.tsx        # Provider de tema
├── assets/                       # Imagens e ícones
│   └── images/
│       ├── icon.png              # Ícone do app
│       ├── splash-icon.png       # Ícone da splash screen
│       └── favicon.png           # Favicon web
├── tailwind.config.js            # Configuração Tailwind CSS
├── theme.config.js               # Configuração de cores
├── app.config.ts                 # Configuração Expo
├── package.json                  # Dependências do projeto
└── README.md                     # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| React Native | 0.81 | Framework mobile |
| Expo | 54 | Plataforma de desenvolvimento |
| React | 19 | Biblioteca UI |
| TypeScript | 5.9 | Tipagem estática |
| Tailwind CSS (NativeWind) | 4 | Estilização |
| Expo Router | 6 | Roteamento |
| React Query | 5 | Gerenciamento de dados |
| AsyncStorage | 2 | Armazenamento local |
| Expo Notifications | 0.32 | Notificações locais |
| Expo Haptics | 15 | Feedback háptico |

## 📋 Funcionalidades Detalhadas

### Tela Home
A tela inicial exibe todos os medicamentos programados para o dia atual. Cada medicamento mostra o nome, dosagem, horário e status da dose. Um botão flutuante permite adicionar novos medicamentos rapidamente. O pull-to-refresh atualiza a lista de medicamentos.

### Adicionar Medicamento
O formulário de adição permite preencher nome, dosagem, múltiplos horários, seleção de dias da semana e notas adicionais. Validação garante que todos os campos obrigatórios sejam preenchidos antes de salvar.

### Editar Medicamento
A tela de edição permite modificar qualquer informação do medicamento existente. As alterações são salvas imediatamente e refletem no histórico de doses futuras.

### Detalhes do Medicamento
A tela de detalhes mostra todas as informações do medicamento com opções para editar ou deletar. Confirmação de segurança é solicitada antes de deletar.

### Histórico de Doses
O histórico organiza todas as doses por data, permitindo visualizar o histórico completo. Filtros permitem visualizar todas as doses, apenas as tomadas ou as perdidas. Cada entrada mostra data, hora e status.

### Perfil do Usuário
A tela de perfil permite editar informações pessoais (nome, data de nascimento, tipo sanguíneo, alergias, condições médicas, contato e endereço). Suporta múltiplos contatos de emergência com relacionamento e informações de contato.

### Configurações
A tela de configurações permite ativar/desativar notificações, ajustar a antecedência padrão para notificações, e selecionar entre tema claro ou escuro.

## 💾 Armazenamento de Dados

O aplicativo utiliza **AsyncStorage** para armazenamento persistente local. Todos os dados são salvos no dispositivo do usuário, garantindo privacidade e funcionamento offline. Os dados incluem:

- Medicamentos e seus horários
- Histórico de doses
- Informações de perfil do usuário
- Contatos de emergência
- Preferências de configuração

## 🔔 Sistema de Notificações

O aplicativo utiliza **Expo Notifications** para enviar lembretes locais. As notificações são agendadas automaticamente quando um medicamento é adicionado e canceladas quando a dose é marcada como tomada. O sistema suporta:

- Notificações em horários específicos
- Antecedência configurável (5, 10 ou 15 minutos)
- Cancelamento automático após marcar dose como tomada
- Funcionamento em background (iOS e Android)

## 🎨 Design e UX

O aplicativo segue os padrões de design iOS (Human Interface Guidelines) para oferecer uma experiência nativa e intuitiva. O design é otimizado para uso com uma mão em dispositivos móveis, com elementos interativos posicionados na parte inferior da tela.

### Tema
O aplicativo suporta tema claro e escuro, com cores que se adaptam automaticamente às preferências do sistema operacional. As cores são definidas em `theme.config.js` e podem ser personalizadas.

### Feedback Visual
Todos os elementos interativos oferecem feedback visual imediato, incluindo mudanças de opacidade, escala e cor. O feedback háptico é utilizado em ações importantes para reforçar a interação do usuário.

## 🧪 Testes

O projeto inclui testes unitários para validar tipos, contextos e funcionalidades. Execute os testes com:

```bash
pnpm test
```

Os testes cobrem:

- Tipos e interfaces de medicamentos
- Tipos e interfaces de perfil de usuário
- Contexto de medicamentos
- Contexto de perfil

## 📦 Build para Produção

### Android

Para gerar um APK para teste:

```bash
./build-android.sh
```

Para publicar na Google Play Store, siga as instruções em `BUILD_GUIDE.md`.

### iOS

Para gerar um build para teste:

```bash
./build-ios.sh
```

A versão iOS está em desenvolvimento e será lançada em breve. Para publicar na App Store, você precisará de uma conta Apple Developer e seguir as instruções em `BUILD_GUIDE.md`.

## 🚀 Deployment

### GitHub

Para fazer deploy no GitHub:

```bash
git remote add origin https://github.com/seu-usuario/lembrete-remedio-app.git
git branch -M main
git push -u origin main
```

### Expo Go

Para visualizar o aplicativo em tempo real no Expo Go:

```bash
pnpm dev
```

Escaneie o código QR exibido no terminal com o Expo Go no seu dispositivo.

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (opcional):

```
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_NAME=Lembrete de Remédio
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -am 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🐛 Reportar Bugs

Se você encontrar um bug, por favor abra uma issue no GitHub descrevendo:

- O comportamento esperado
- O comportamento atual
- Passos para reproduzir
- Versão do aplicativo e dispositivo

## 📞 Suporte

Para suporte, abra uma issue no repositório GitHub ou entre em contato através de email.

## 🗺️ Roadmap

As seguintes funcionalidades estão planejadas para futuras versões:

- **v1.1**: Sincronização com backend e login de usuário
- **v1.2**: Relatórios de aderência com gráficos
- **v1.3**: Compartilhamento de perfil com cuidadores
- **v1.4**: Integração com wearables (Apple Watch, Wear OS)
- **v2.0**: Suporte a múltiplos idiomas

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Linhas de código | ~2,500 |
| Componentes | 8 |
| Telas | 7 |
| Testes | 22 |
| Dependências | 35+ |

## 👨‍💻 Desenvolvido por

**Manus AI** - Plataforma de desenvolvimento de aplicativos inteligentes

## 🙏 Agradecimentos

Agradecemos à comunidade Expo, React Native e à comunidade open-source por fornecer ferramentas e bibliotecas excelentes que tornaram este projeto possível.

---

**Versão**: 1.0.0  
**Última atualização**: Abril 2026  
**Status**: ✅ Pronto para produção (Android) | 🔄 Em desenvolvimento (iOS)
