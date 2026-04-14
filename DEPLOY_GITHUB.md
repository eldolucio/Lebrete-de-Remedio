# Guia de Deploy no GitHub

Este documento fornece instruções passo a passo para fazer deploy do aplicativo Lembrete de Remédio no GitHub.

## Pré-requisitos

Antes de começar, certifique-se de ter:

- Uma conta no GitHub (crie em https://github.com/signup)
- Git instalado no seu computador
- Acesso ao terminal/linha de comando
- O código do projeto localmente

## Passo 1: Criar um Repositório no GitHub

1. Acesse https://github.com/new
2. Preencha os seguintes campos:
   - **Repository name**: `lembrete-remedio-app`
   - **Description**: "Um aplicativo móvel para gerenciar medicamentos e acompanhar doses"
   - **Visibility**: Escolha "Public" para repositório público ou "Private" para privado
   - **Initialize this repository with**: Deixe desmarcado (já temos commits locais)
3. Clique em "Create repository"

## Passo 2: Configurar Git Localmente

Abra o terminal na pasta do projeto e execute:

```bash
cd /home/ubuntu/lembrete-remedio-app
```

Configure suas credenciais do Git (se não tiver feito ainda):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

## Passo 3: Adicionar Remote do GitHub

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub:

```bash
git remote add origin https://github.com/SEU_USUARIO/lembrete-remedio-app.git
git branch -M main
```

## Passo 4: Fazer Push para GitHub

Faça push de todos os commits para o GitHub:

```bash
git push -u origin main
```

Se solicitado, forneça suas credenciais do GitHub (use um Personal Access Token em vez de senha).

### Criar Personal Access Token (recomendado)

1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Dê um nome ao token (ex: "lembrete-remedio-deploy")
4. Selecione os escopos: `repo` (acesso completo a repositórios privados e públicos)
5. Clique em "Generate token"
6. Copie o token (você não poderá vê-lo novamente)
7. Use o token como senha quando solicitado pelo Git

## Passo 5: Verificar o Upload

1. Acesse https://github.com/SEU_USUARIO/lembrete-remedio-app
2. Verifique se todos os arquivos foram enviados
3. Confirme que o README.md está visível na página principal

## Passo 6: Configurar Descrição e Tópicos

1. Clique em "Settings" (engrenagem no canto superior direito)
2. Na seção "About", adicione:
   - **Description**: "Aplicativo móvel para gerenciar medicamentos"
   - **Website**: (opcional) URL do seu site
   - **Topics**: Adicione tags como `react-native`, `expo`, `mobile-app`, `healthcare`, `medication-reminder`
3. Clique em "Save changes"

## Passo 7: Configurar GitHub Pages (Opcional)

Se desejar hospedar documentação do projeto:

1. Vá para "Settings" → "Pages"
2. Em "Build and deployment", selecione "Deploy from a branch"
3. Selecione a branch `main` e pasta `/ (root)`
4. Clique em "Save"

## Passo 8: Adicionar Badges ao README

Adicione badges ao README para mostrar status do projeto. Edite o arquivo `README.md` e adicione no início:

```markdown
[![GitHub license](https://img.shields.io/github/license/SEU_USUARIO/lembrete-remedio-app)](https://github.com/SEU_USUARIO/lembrete-remedio-app/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/SEU_USUARIO/lembrete-remedio-app)](https://github.com/SEU_USUARIO/lembrete-remedio-app/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/SEU_USUARIO/lembrete-remedio-app)](https://github.com/SEU_USUARIO/lembrete-remedio-app/issues)
```

## Passo 9: Criar Releases

Para criar uma release (versão):

1. Acesse a página do repositório
2. Clique em "Releases" (no lado direito)
3. Clique em "Create a new release"
4. Preencha:
   - **Tag version**: `v1.0.0`
   - **Release title**: `Lembrete de Remédio v1.0.0`
   - **Description**: Cole o conteúdo do `CHANGELOG.md`
5. Clique em "Publish release"

## Passo 10: Configurar Actions (CI/CD)

Para automatizar testes e builds:

1. Crie a pasta `.github/workflows` no projeto
2. Crie um arquivo `tests.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm test
      - run: pnpm check
```

3. Commit e push:

```bash
git add .github/workflows/tests.yml
git commit -m "📝 Adiciona GitHub Actions para testes"
git push
```

## Próximos Passos

Após fazer o deploy:

1. **Compartilhe o repositório**: Envie o link para amigos, colegas e comunidades
2. **Solicite feedback**: Abra issues para coletar feedback dos usuários
3. **Mantenha atualizado**: Faça commits regularmente com melhorias
4. **Documente mudanças**: Atualize o CHANGELOG.md com cada versão

## Troubleshooting

### Erro: "fatal: remote origin already exists"

Se receber este erro, remova o remote existente:

```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/lembrete-remedio-app.git
```

### Erro: "Permission denied (publickey)"

Configure SSH em vez de HTTPS:

```bash
git remote set-url origin git@github.com:SEU_USUARIO/lembrete-remedio-app.git
```

Depois configure sua chave SSH em https://github.com/settings/keys

### Erro: "fatal: The current branch main has no upstream branch"

Use o comando com `-u`:

```bash
git push -u origin main
```

## Recursos Adicionais

- [Documentação do GitHub](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub CLI](https://cli.github.com/)

---

Parabéns! Seu aplicativo está agora no GitHub! 🎉
