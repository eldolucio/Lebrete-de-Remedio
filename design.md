# Design - Lembrete de Remédio

## Visão Geral

Aplicativo móvel para ajudar usuários a gerenciar seus medicamentos com lembretes automáticos, histórico de doses e rastreamento de aderência.

## Orientação e Uso

- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão (botões e controles no terço inferior da tela)
- **Estilo**: Seguir Apple Human Interface Guidelines (HIG) para parecer um app nativo iOS

## Lista de Telas

1. **Home (Medicamentos Hoje)** - Tela principal com lista de medicamentos do dia
2. **Adicionar Medicamento** - Formulário para cadastrar novo medicamento
3. **Detalhes do Medicamento** - Visualizar e editar informações de um medicamento
4. **Histórico** - Visualizar histórico de doses tomadas
5. **Configurações** - Ajustes do app (notificações, tema, etc.)

## Conteúdo e Funcionalidade por Tela

### 1. Home (Medicamentos Hoje)

**Conteúdo Principal:**
- Saudação com data/hora atual
- Lista de medicamentos do dia com:
  - Nome do medicamento
  - Horário programado
  - Dosagem (ex: 1 comprimido)
  - Status: "Tomado", "Pendente", "Atrasado"
  - Botão para marcar como tomado (com ícone de check)

**Funcionalidade:**
- Deslizar para atualizar lista
- Tocar em medicamento → vai para Detalhes
- Botão flutuante (+) → vai para Adicionar Medicamento
- Aba inferior para navegar para Histórico e Configurações

### 2. Adicionar Medicamento

**Conteúdo Principal:**
- Campos de formulário:
  - Nome do medicamento (texto)
  - Dosagem (ex: "1 comprimido", "5ml", "1 cápsula")
  - Horários (múltiplos horários possíveis com +/-)
  - Dias da semana (checkboxes para Segunda-Domingo)
  - Notas/observações (opcional)
- Botões: "Salvar" e "Cancelar"

**Funcionalidade:**
- Validação de campos obrigatórios
- Adicionar múltiplos horários
- Salvar e voltar para Home

### 3. Detalhes do Medicamento

**Conteúdo Principal:**
- Nome, dosagem, horários
- Próxima dose programada
- Histórico recente (últimas 5 doses)
- Botões: "Editar", "Marcar como Tomado", "Deletar"

**Funcionalidade:**
- Editar informações do medicamento
- Marcar como tomado manualmente
- Deletar medicamento com confirmação

### 4. Histórico

**Conteúdo Principal:**
- Lista de todas as doses (tomadas e perdidas)
- Cada item mostra:
  - Nome do medicamento
  - Data e hora programada
  - Data e hora tomada (se aplicável)
  - Status (Tomado, Perdido, Atrasado)
- Filtros: "Todos", "Tomados", "Perdidos"

**Funcionalidade:**
- Scroll infinito ou paginação
- Filtrar por status
- Tocar para ver detalhes

### 5. Configurações

**Conteúdo Principal:**
- Notificações: Toggle para ativar/desativar
- Horário padrão de notificação (ex: 30 min antes)
- Tema: Light/Dark/Auto
- Sobre o app
- Versão

**Funcionalidade:**
- Ativar/desativar notificações
- Escolher tema
- Abrir informações sobre o app

## Fluxos de Usuário Principais

### Fluxo 1: Adicionar Novo Medicamento
1. Usuário toca no botão flutuante (+) na Home
2. Vai para tela "Adicionar Medicamento"
3. Preenche nome, dosagem, horários, dias
4. Toca "Salvar"
5. Volta para Home (medicamento aparece na lista se é hoje)

### Fluxo 2: Marcar Dose como Tomada
1. Usuário vê medicamento "Pendente" na Home
2. Toca no botão de check/marcar
3. Status muda para "Tomado"
4. Notificação de sucesso aparece
5. Histórico é atualizado

### Fluxo 3: Visualizar Histórico
1. Usuário toca na aba "Histórico" na tab bar
2. Vê lista de todas as doses (últimas primeiro)
3. Pode filtrar por status
4. Toca em um item para ver detalhes

### Fluxo 4: Editar Medicamento
1. Usuário toca em um medicamento na Home
2. Vai para "Detalhes"
3. Toca "Editar"
4. Vai para formulário (similar a "Adicionar")
5. Modifica informações e salva

## Escolhas de Cor

**Paleta de Cores (Inspirada em saúde e bem-estar):**

| Elemento | Cor | Uso |
|----------|-----|-----|
| Primary | #0a7ea4 (Azul) | Botões principais, ícones ativos |
| Success | #22C55E (Verde) | Status "Tomado", check marks |
| Warning | #F59E0B (Laranja) | Status "Atrasado" |
| Error | #EF4444 (Vermelho) | Status "Perdido", deletar |
| Background | #ffffff (Branco) | Fundo da tela (light mode) |
| Surface | #f5f5f5 (Cinza claro) | Cards, superfícies elevadas |
| Foreground | #11181C (Preto) | Texto principal |
| Muted | #687076 (Cinza) | Texto secundário |

**Dark Mode:**
- Background: #151718
- Surface: #1e2022
- Foreground: #ECEDEE
- Muted: #9BA1A6

## Notas de Design

- Usar ícones claros e intuitivos (ex: comprimido, relógio, check)
- Feedback háptico ao marcar dose como tomada
- Animações suaves ao transicionar entre telas
- Botões grandes e acessíveis para toque com uma mão
- Notificações locais no horário programado
