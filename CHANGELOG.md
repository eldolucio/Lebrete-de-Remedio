# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-13

### Adicionado

- **Gerenciamento de Medicamentos**: Adicionar, editar e deletar medicamentos com múltiplos horários
- **Notificações Locais**: Sistema automático de notificações nos horários programados
- **Histórico de Doses**: Registro completo de todas as doses com filtros
- **Perfil de Usuário**: Informações pessoais e de saúde com suporte a contatos de emergência
- **Configurações**: Controle de notificações, tema e preferências
- **Tema Claro/Escuro**: Suporte automático a tema do sistema
- **Armazenamento Local**: Persistência de dados com AsyncStorage
- **Testes Unitários**: 22 testes cobrindo tipos e contextos
- **Documentação**: README completo com instruções de instalação e uso
- **Build Scripts**: Scripts automatizados para gerar APK e IPA

### Tecnologias

- React Native 0.81
- Expo 54
- React 19
- TypeScript 5.9
- Tailwind CSS (NativeWind) 4
- Expo Router 6
- React Query 5

### Plataformas

- ✅ Android (APK disponível)
- 🔄 iOS (Em desenvolvimento)
- ✅ Web (Suporte técnico)

## [Planejado] - Futuras Versões

### v1.1 - Sincronização e Autenticação

- [ ] Backend com Node.js/Express
- [ ] Autenticação de usuário
- [ ] Sincronização de dados entre dispositivos
- [ ] Backup automático na nuvem

### v1.2 - Relatórios e Análises

- [ ] Gráficos de aderência
- [ ] Relatórios por período
- [ ] Exportação de dados
- [ ] Análise de padrões

### v1.3 - Compartilhamento

- [ ] Compartilhamento de perfil com cuidadores
- [ ] Permissões de visualização
- [ ] Notificações para cuidadores
- [ ] QR code para compartilhamento

### v1.4 - Integração com Wearables

- [ ] Apple Watch
- [ ] Wear OS
- [ ] Sincronização de dados
- [ ] Notificações no relógio

### v2.0 - Internacionalização

- [ ] Suporte a múltiplos idiomas
- [ ] Localização de datas e horários
- [ ] Suporte a diferentes regiões

## Notas de Desenvolvimento

### Versão 1.0.0

Esta é a primeira versão estável do aplicativo Lembrete de Remédio. O aplicativo foi desenvolvido com foco em usabilidade, funcionalidade e confiabilidade. Todas as funcionalidades principais foram implementadas e testadas.

**Status de Plataformas:**
- Android: Pronto para produção
- iOS: Em desenvolvimento (versão beta em breve)
- Web: Suporte técnico apenas

**Conhecidos Problemas:**
- Nenhum problema crítico reportado

**Melhorias Futuras:**
- Sincronização com backend
- Relatórios de aderência
- Integração com wearables
- Suporte a múltiplos idiomas

---

Para mais informações, visite o [repositório GitHub](https://github.com/seu-usuario/lembrete-remedio-app).
