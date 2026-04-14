# Contribuindo para Lembrete de Remédio

Obrigado por seu interesse em contribuir para o projeto Lembrete de Remédio! Este documento fornece diretrizes e instruções para contribuir.

## Código de Conduta

Por favor, note que este projeto é lançado com um Código de Conduta do Colaborador. Ao participar neste projeto, você concorda em cumprir seus termos.

## Como Contribuir

### Reportar Bugs

Antes de criar um relatório de bug, verifique a lista de issues, pois você pode descobrir que o bug já foi reportado. Ao criar um relatório de bug, inclua o máximo de detalhes possível:

- **Use um título descritivo** para a issue
- **Descreva o comportamento exato que observou** e qual era o comportamento esperado
- **Forneça exemplos específicos** para demonstrar as etapas
- **Descreva o comportamento observado** e aponte a diferença com o comportamento esperado
- **Inclua capturas de tela e GIFs animados** se possível
- **Inclua seu ambiente operacional** (iOS, Android, versão do app, etc.)

### Sugerir Melhorias

Sugestões de melhorias são sempre bem-vindas. Ao criar uma sugestão de melhoria, inclua:

- **Use um título descritivo** para a sugestão
- **Forneça uma descrição detalhada** da melhoria sugerida
- **Liste alguns exemplos** de como a melhoria seria útil
- **Mencione outras aplicações** que implementam funcionalidades similares

### Pull Requests

- Preencha o template fornecido
- Siga os padrões de código do projeto
- Inclua screenshots e GIFs animados em seus PRs quando apropriado
- Termine todos os arquivos com uma nova linha
- Evite plataformas específicas quando possível

## Padrões de Código

### TypeScript

- Use tipos explícitos sempre que possível
- Evite usar `any`
- Use interfaces para estruturas de dados
- Documente funções complexas com comentários

### React Native / Expo

- Use componentes funcionais com hooks
- Prefira `useCallback` para funções passadas como props
- Use `useMemo` para valores computados complexos
- Mantenha componentes pequenos e focados

### Estilização

- Use Tailwind CSS (NativeWind) para estilização
- Mantenha consistência com o design system existente
- Teste em tema claro e escuro

### Nomes e Convenções

- Use camelCase para variáveis e funções
- Use PascalCase para componentes e tipos
- Use UPPER_SNAKE_CASE para constantes
- Use nomes descritivos e significativos

## Processo de Desenvolvimento

1. **Fork o repositório** e clone localmente
2. **Crie uma branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Faça seus commits** com mensagens descritivas
4. **Execute os testes** para garantir que tudo funciona (`pnpm test`)
5. **Push para sua fork** (`git push origin feature/MinhaFeature`)
6. **Abra um Pull Request** descrevendo suas mudanças

## Mensagens de Commit

- Use o imperativo ("Adiciona feature" não "Adicionada feature")
- Limite a primeira linha a 72 caracteres ou menos
- Referencie issues e pull requests relevantes
- Considere começar a mensagem com um emoji:
  - 🎉 Novo recurso
  - 🐛 Correção de bug
  - 📝 Documentação
  - 🎨 Formatação/estilo
  - ♻️ Refatoração
  - ✅ Testes

## Estrutura de Branches

- `main` - Branch principal com código em produção
- `develop` - Branch de desenvolvimento
- `feature/*` - Branches de novas features
- `bugfix/*` - Branches de correção de bugs
- `hotfix/*` - Branches de correção urgente

## Testando Suas Mudanças

Antes de submeter um PR, certifique-se de:

1. **Executar os testes**: `pnpm test`
2. **Verificar tipos TypeScript**: `pnpm check`
3. **Testar em múltiplas plataformas**: iOS, Android e Web
4. **Testar em tema claro e escuro**
5. **Testar em diferentes tamanhos de tela**

## Documentação

- Atualize o README se adicionar novas funcionalidades
- Adicione comentários para código complexo
- Mantenha a documentação sincronizada com o código

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

## Dúvidas?

Sinta-se livre para abrir uma issue com a tag `question` se tiver dúvidas sobre como contribuir.

---

Obrigado por contribuir! 🎉
