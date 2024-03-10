<p align="center">
  <img src="https://i.ibb.co/Rchw50r/iara-form-log.png" />
</p>

# > IaraForm
---
O **Iara-Form** é uma biblioteca React que simplifica a criação de formulários de forma simples e compacta. A Iaraform utiliza 2 bibliotecas: [jquense/yup](https://github.com/jquense/yup) e [Unform](https://unform-rocketseat.vercel.app/quick-start), respectivamente, uma possibilita a validação e transformação dos dados e outra a gestão e agrupamento.
Neste guia rápido, vamos explorar um exemplo básico de utilização da biblioteca.
# > Inicio Rápido
### Instalação
---
Certifique-se de ter a biblioteca instalada no seu projeto. Você pode instalá-la usando npm ou yarn:
```bash
npm install iara-form-kit 
# ou 
yarn add iara-form-kit
```

### Configuração Inicial
---
Importe os componentes necessários do **Iara-Form** no seu arquivo:
```tsx
import {
  IFormConfiguration,
  IInputIaraForm,
  IaraForm,
  InputField,
  iaraSchema,
} from "iara-form-kit";
```
### Construa sua base de Elementos Personalizados
---
Defina elementos de formulário personalizados, neste caso, um componente de entrada de texto:
```tsx
const elements = {
  input: (params: IInputIaraForm) => <InputField {...params} />,
};
```
### Interface do Formulário
---
Declare uma interface para representar a estrutura dos dados do seu formulário:
```tsx
interface IFormLogin {
  name: string;
  password: string;
}
```
### Configuração do Formulário
---
Configure seu formulário especificando seções, títulos e campos:
```tsx
const config: IFormConfiguration<typeof elements, IFormLogin> = {
  section: [
    {
      title: "Login",
      fields: [
        {
          label: "Nome",
          inputField: "input",
          serverProperty: "name",
          validate: iaraSchema.string().required(),
        },
        {
          label: "Senha",
          inputField: "input",
          serverProperty: "password",
          validate: iaraSchema.string().required(),
          type: "password",
        },
      ],
    },
  ],
  elements: elements,
};
```
### Formulário
---
No componente principal do seu aplicativo, defina uma função para lidar com o envio do formulário:
```tsx
export function App() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return <IaraForm formConfiguration={config} onSubmit={handleFormSubmit} />;
}
```
### Exemplo completo
---
```tsx
import {
  IFormConfiguration,
  IInputIaraForm,
  IaraForm,
  InputField,
  iaraSchema,
} from "iara-form-kit";

const elements = {
  input: (params: IInputIaraForm) => <InputField {...params} />,
};
interface IFormLogin {
  name: string;
  password: string;
}
const config: IFormConfiguration<typeof elements, IFormLogin> = {
  section: [
    {
      title: "Login",
      fields: [
        {
          label: "Nome",
          inputField: "input",
          serverProperty: "name",
          validate: iaraSchema.string().required(),
        },
        {
          label: "Senha",
          inputField: "input",
          serverProperty: "password",
          validate: iaraSchema.string().required(),
          type: "password",
        },
      ],
    },
  ],
  elements: elements,
};

export function App() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };
  return <IaraForm formConfiguration={config} onSubmit={handleFormSubmit} />;
}
```

# > Passo-a-Passo
### Configuração Básica Field
---
Para montar o seu formulário primeiro você deve construir um **ReactComponent**. A função receberá parâmetros que atenda a interface `IInputIaraForm`. 
```tsx
export function InputField({
  label,
  serverProperty
}: IInputIaraForm) [...]
```
No corpo do **ReactCompoenent** você deve chamar o hook `useIaraFormField` e passar como parâmetro a **property**. Você terá a disposição 6 retornos 
- **fieldName**: Campo do formulario ele deve ser valorado com o id do seu input.
- **defautValue**: valor padrão que você definir.
- **error**: mensagem de erro gerada.
- **clearError**: função para limpar o erro gerado.
- **registerField**: registra o seu formulário  
- **handleValidate**: função responsável por ativar a validação do seu formulário.

```jsx
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    handleValidate,
    clearError,
  } = useIaraFormField(property);
```

Após invocar o handler você deve registrar o seu campo assim que ele for iniciado. 

```tsx
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [registerField, fieldName]);

return (
	<div>
      <label htmlFor={fieldName}>{label}</label>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
        {...props}
      />
      {error && <span>{error}</span>}
    </div>
    )
```

Exemplo completo de um  campo normal interagindo interação com o **MUI**.

```tsx
export function InputField({
  label,
  placeholder,
  property,
  required,
  ...props
}: IInputIaraForm) {
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    handleValidate,
    clearError,
  } = useIaraFormField(property);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [registerField, fieldName]);

  return (
    <FormControl fullWidth>
      <Typography variant={"subtitle1"} pb={1} pt={2} component={"div"}>
        {label}
        {required ? "*" : null}:
      </Typography>
      <TextField
        error={!!error}
        helperText={error}
        onKeyDown={() => (error ? clearError() : undefined)}
        placeholder={`${placeholder}`}
        variant="outlined"
        onBlur={handleValidate}
        inputProps={{ id: fieldName, ...props }}
        inputRef={inputRef}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

```

### Definindo Campos
---
Após a criação do(s) campo(s) você deve criar um objeto atribuindo a `key` com o nome que desejar. A ``key`` é utilizada na configuração para direcionar o campo do formulario.
```jsx
export const DefaultFields = {
  inputField: (params: IInputIaraForm) => <InputField {...params} />,
  passwordField: (params: IInputIaraForm) => <PasswordField  {...params} />,
};
```

### Configuração
---
Esta etapa é responsável por montar a estrutura do seu formulário. Você deve criar um objeto do tipo ``IFormConfiguration<T, K>``. Ele recebe dois parâmetros. O primeiro define os `types` disponível para o campo ``inputField``. O segundo define os ``types`` disponível para o campo ``property``. O aconselhável é, *para T*,  inserir um ``typeof`` do objeto que define os campos. E, *para K*,  passar uma interface que contenha todas as propriedades do formulário.
```tsx
export const config: IFormConfiguration<typeof InputsLogin, IUserLogin> = {}
```
Assim você conseguirá construir o restante do seu formulário com facilidade. A estrutura básica consiste em:
- ``steps``*: um array que contém o titulo da suas etapa, bem como os campos que a compõe.
	- ``title``*: titulo da sua etapa.
	- ``fields``*: campos do seu formulário. Os principais campos são.
		- ``property``*: usado para definir o nome do campo.
		- ``inputField``*: tipo do campo a ser usado.
		- ``validate``*: validações e transformações do campo. *Documentação: *[jquense/yup: Dead simple Object schema validation (github.com)](https://github.com/jquense/yup?tab=readme-ov-file#getting-started)
		- ``label``: titulo do campo;
		
> [!NOTE]
> Os demais campos em **fields** são herdados da interface básica de input dentro do React. E podem ser manipulados livremente.

```tsx
export const config: IFormConfiguration<typeof InputsLogin, IUserLogin> = {
  steps: [
    {
      title: "Login",
      fields: [
        {
          label: "CPF ou Email",
          property: "emailOrCpf",
          inputField: "inputField",
          placeholder: "Digite seu email ou cpf",
          required: true,
          validate: iaraSchema.string().required(),
        },
        {
          label: "Senha",
          property: "password",
          inputField: "passwordField",
          placeholder: "Digite sua senha",
          required: true,
          validate: iaraSchema.string().required(),
        },
      ],
    },
  ],
  elements: InputsLogin,
};

```
### Formulário
---
Para visualizar o seu formulário basta criar uma função e chamar o elemento `Form` passando como parâmetro a sua configuração e uma função no método `onSubmit`.

```tsx
export function Login(){
  const handlerSubmit = (payload) => {
  // Manipule o conjunto de dados.
  }
  return <Form formConfiguration={config} onSubmit={handlerSubmit} />
}
```

### useWatch
---
Observar o valor de uma determinada propriedade, desde previamente registrada nas configurações como `serverProperty`.  O hook torna possível realizar interações dinâmicas com outros campos. Por exemplo, se antes de carregar uma listagem de cidade, você precisa ter o identificador do estado.

```tsx
function FieldTest() {
  const value = useWatch("stateId");
  return <SelectCity stateId={value} disabled={!value}/>;
}
```
### Interações Possíveis
---
Você pode definir a configuração do formulário dentro de um componente ou contexto. Desta forma poderá realizar validações extras em virtude de exibir ou não um determinado campo.
```tsx
const config: IFormConfiguration<typeof InputsLogin, IUserLogin> =
    useMemo(() => {
      let formConfiguration: IFormConfiguration<
        typeof InputsLogin,
        IUserLogin
      > = {
        steps: [
          {
            title: "Dados básicos",
            fields: [
              {
                label: "CPF ou Email",
                serverProperty: 'emailOrCpf',
                inputField: "inputField",
                placeholder: "Digite seu email ou cpf",
                required: true,
                validate: iaraSchema.string().required(),
              },
            ],
          },
        ],
        elements: InputsLogin,
      };

      if (hasPermission("sysAdmin")) {
        formConfiguration = {
          ...formConfiguration,
          ...{
            steps: [
              {
                title: "Claim",
                fields: [
                  {
                    label: "Permissão",
                    serverProperty: "permission",
                    inputField: "inputPermissions",
                    required: true,
                    validate: iaraSchema.string().required(),
                  },
                ],
              },
            ],
          },
        };
      }

      return formConfiguration;
    }, []);

```

Você tem acesso a estrutura básica do **IaraForm** dentro dos campos através do hook `useIaraForm`.
- ``schemaObject``: schema do Yup. *Documentação*  [jquense/yup: Dead simple Object schema validation (github.com)](https://github.com/jquense/yup?tab=readme-ov-file#getting-started).
- ``formConfiguration``: configurações do formulário.
- ``setFormConfiguration``: define configuração do formulário.
- ``formRef``: referencia do formulário unform. *Documentação*  [Accessing form reference | Unform (unform-rocketseat.vercel.app)](https://unform-rocketseat.vercel.app/recipes/accessing-form-ref).
- ``section``: seção atual.
- ``setSection``: define a seção atual

```tsx
  const {
    schemaObject,
    formConfiguration,
    formRef,
    section,
    setStep
    setformConfiguration,
  } = useIaraForm();
```