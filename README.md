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

## Agregar Path Alias

1. Instalar paquete para resolver los path alias:

```bash
npm i eslint-import-resolver-typescript -D -E
```

2. Crear el archivo `jsconfig.json`, en la raíz del proyecto:

```json
{
	"compilerOptions": {
		"baseUrl": "./src",
		"paths": {
			"@screens/*": ["screens/*"]
		}
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "dist", ".expo"]
}
```

3. Editar el archivo `eslint.config.js`:

```js
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
	expoConfig,
	eslintPluginPrettierRecommended,
	{
		settings: {
			'import/resolver': {
				typescript: {
					project: './jsconfig.json',
					alwaysTryTypes: true
				}
			}
		},
		rules: {
			'import/no-unresolved': 'error'
		}
	},
	{
		ignores: ['dist/*', 'node_modules/*', '.expo/*']
	}
])
```

## Extensiones para VS Code recomendadas

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
