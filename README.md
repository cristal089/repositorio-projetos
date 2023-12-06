# Repositório de projetos

Este é um projeto criado para a disciplina XDES03 da Universidade Federal de Itajubá.

Desenvolvedores:

- [@Deocoe](https://github.com/Deocoe) Daniel Coelho
- [@cristal089](https://github.com/cristal089) Rafaela Cristina
- [@RodBacelar](https://github.com/RodBacelar) Rodrigo Bacelar

## Tecnologias utilizadas

Para desenvolvermos o projeto, foram utilizadas as seguintes tecnologias:

#### Front-end e Back-end

- [React](https://react.dev/)
- [Nodejs](https://nodejs.org/en)

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
