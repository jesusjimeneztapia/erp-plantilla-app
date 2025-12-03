# Plantilla ERP de React Native (JS)

## Configuración de ESLint y Prettier

### Configuración mínima

1. Ejecutar el siguiente comando para verificar e instalar eslint en el proyecto:

```bash
node_modules\.bin\expo lint
```

2. Instalar Prettier con el siguiente comando:

```bash
node_modules\.bin\expo install prettier eslint-config-prettier eslint-plugin-prettier --dev
```

3. Editar el archivo `eslint.config.js`, para agregar Prettier a la configuración de la misma:

```js
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
	expoConfig,
	eslintPluginPrettierRecommended,
	{
		ignores: ['dist/*']
	}
])
```

4. Crear el archivo `.prettierrc`, en la raíz del proyecto:

```json
{
	"semi": false,
	"singleQuote": true,
	"printWidth": 100,
	"trailingComma": "none",
	"endOfLine": "auto",
	"useTabs": true,
	"tabWidth": 2
}
```

5. En el archivo `package.json`, agregar:

```json
{
  "scripts": {
    ...
    "lint": "expo lint",
    "lint:fix": "expo lint --fix"
  }
}
```

### Comandos

1. Para verificar los errores del linter, debe ejecutar el siguiente comando:

```bash
npm run lint
# o
node_modules\.bin\expo lint
```

2. Para solucionar los errores del linter se ejecuta el siguiente comando:

```bash
npm run lint:fix
# o
npx expo lint --fix
```
