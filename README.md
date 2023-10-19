# Next.js Ecommerce step by step

## Configs

<!-- CREATE A NEXT APP -->
-npx create-next-app@latest 
 |_set name: nextjs-ecommerce
 |_use typescript: yes
 |_use eslint: yes
 |_use tailwind-css: yes
 |_use src-dir: yes
 |_customize default import alias: no
 
 <!--INSTAL DEPPENDENCIES -->
 npm i daisyui
 npm i prisma @prisma/client
 npm i next-auth @auth/prisma-adapter
 npm i prettier eslint-config-prettier prettier-plugin-tailwindcss

<!-- TAILWIND EXTENSION -->
-- instal Tailwind Css Intelisense
-- configure the settings
    |_settings
      |_files: associations
        |_Add Item: *css: tailwindcss
      editor: quick Suggestions
        |_strings: on

<!-- CSS Config - DaisyUI & Tailwind css -->
-- access the tailwind.config.ts
    |_in plugins: []
      |_ add plugin: require("daisyui")
    |_ then add the required theme
    |_ and can remove the default tailwind theme
    |_ like:   const config: Config = {
                                content: [
                                    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                                    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                                    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
                                ],
                                plugins: [require("daisyui")],
                                daisyui: {
                                  themes: [
                                    {   
                                      lightTheme: {
                                        primary: "#f4aa3a",
                                        secondary: "#f4f4a1",
                                        accent: "#1be885",
                                        neutral: "#272136",
                                        "base-100": "#ffffff",
                                        info: "#778ad4",
                                        success: "#23b893",
                                        warning: "#f79926",
                                        error: "#ea535a",
                                        body: {
                                            "background-color": "#e3e6e6",
                                        },
                                      },
                                    },
                                  ],
                                },
                              };
    
    |_Access file global.css and remove everything except:
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

<!--CONFIGURE PRITTIER WITH TAILWIND EXTENSION -->
-- create a new file in root structure called prettier.config.js
  |__ add to file : module.exports = {
                        plugins: ['prettier-plugin-tailwindcss'],
                    }

<!-- Config ESlint to not conflict with Prettier -->
-- Add preetier to ESLint config in eslintrc.json
  |__ "extends": ["next", "prettier"]

-- Instal Preetier Extension
-- Instal ESLint extensio

<!-- Add Prisma Extension -->
-- Instal Prisma Extension

<!-- Add ZOD Typescript Type Validadtion -->
-- npm i zod

<!-- Configure a database in MongoD -->

<!-- Set up Prisma Project -->
-- npx prisma init
  |_ change database url in .env file with url find in mongoDB-database-connect-drivers
    |_ overide the password in driver link to the db password
    |_ add in driver link the database name after mongodb.net/
  |_add the .env to .gitignore file
  |_ in prisma folder in schema.prisma change the datasource db provider to mongodb 
  |_ criate database collection in schema.prisma with the script:
    |_npx prisma db pull
  |_ modifie our collection products
    |_ rename in schema.prisma to model Product
    |_ add at final @@map("products") para informar
        que o nosso modelo Product se refere a coleção products
    |_ acrescentar os propriedades a coleção
      |_ createdAt DateTime @default(now())
      |_ updatetAt DateTime @updatedAt
    |_ fazer o push da coleção atualiza para o mongo
      |_ npx prisma db push
      |_ npx prisma generate -> update the client
    |_ avoid exaust prisma connections adding the script to src/lib/db/prisma.ts
      |_https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution

** every change in schema.prisma have to be pushed to database - npx prisma push  
** every pushed schema need to regenerate prisma client - npx prisma generate

## Building the Application

<!-- COMPONENTS -->
* Todo componente precisa usar export default sintaxe
* alt shift f para formatar o tailwind de acordo com a hierarquia 
* No tailwind quando temos repetiçoes nas classes do css NÃO é recomendável criar classes para evitar essa repetição,
  o recomendado é navegar através das propriedades com o ctrl+d
* ./app/layout.tsx é o layout(UI compartilhada pelas páginas) root, então se alguma
  configuração de layout for aplicada aqui, será aplicada em todas as páginas

<!-- add-product page -->
* Add-product é um serviço por onde o administrador pode adicionar produtos ao banco de dados.
  A única diretriz é que o cliente não pode fazer requisições diretamente. 
  Existem diferentes maneiras de se fazer isso, transformar nossa pagina em um form-client
  onde o cliente podem enviar requisiçoes para o endpoint do servidor para adicionar produtos, 
  assim o cliente não pode fazer operações diretamente no banco de dados e as credenciais do banco de 
  dados não ficam expostas, para isso pode ser feita uma API diretamente no projeto e manipulando rotas
  alternativamente com um servidor externo utilizando o expres
* No projeto executaremos com uma nova função do next que é o Server Actions


<!-- Configuração de autorização com google oAuth -->
https://next-auth.js.org/providers/google
https://authjs.dev/reference/adapter/prisma

-- acessar a página: https://console.developers.google.com/apis/credentials
 |_ criar um projeto e abrir ele
    |_ em api's e services
      |_ tela de permissoes oAuth
        |_  External
        |_ preencher [appName, userEmail, developerEmail]
        |_ selecionar os scopos [userinfo.email, userinfo.profile]
        |_ add test [personalEmail] -> email autorizados a logar em ambiente de teste
      |_ tela de credenciais
        |_ criar credenciais [localizado na parte superior central]
        |_ oAuth client id
          |_ web application 
          |_ redirecionamento de URI's autorizadas
            |_http://localhost:3000/api/auth/callback/google
          |_ guardar as informacoes

-- no vsCode
     |_ abrir .env
|->    |_ adicionar GOOGLE_CLIENT_ID = "{googleId das informações da tela oAuth}"
|      |_ adicionar GOOGLE_CLIENT_SECRET = "{googleId das informações da tela oAuth}"
|      |_ adicionar NEXTAUTH_URL = "http:localhost:3000/"
|      |_ adicionar NEXTAUTH_SECRET = "randomSecretCreatedByMe"
|    |_ adicionar a pasta /api/auth/[...nextauth]/rout.ts
|    |_ criar a variável resposável pela autorização do tipo: NextAuthOptions
|    |_ exportar essa variável através de um handler com a pattern definida:
|      |_  const handler = nextAuth(nomeDaVariavelDeAutenticacao);
|          export { handler as GET, handler as POST }
|    |_ resolvendo o erro de tipagem da variável de autorização:
|      |_ criar um arquivo env.ts na pasta lib -> que será responsável pela validação 
|__    das chaves de autenticação
