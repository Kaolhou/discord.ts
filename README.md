# Discord.ts

## Introdução
Isso é um projeto de desenvolvimento de um [Discord Bot](https://discord.js.org) usando [TypeScript](https://www.typescriptlang.org), ele possui objetivos recreativos e educacionais considerando que é aplicado diversas tecnologias

Se estiver interessado no projeto pode iniciar em sua máquina seguindo as seguintes instruções:

1. Inicie com o *`git clone`* para iniciar um repositório local, então dê *`npm install`* para instalar as dependências
2. Na pasta raiz crie um arquivo `.env` contendo todas as suas varáveis de ambiente, dentre elas deve conter:

    * CLIENT_ID **`Disponibilizado pelo discord`**
    * TOKEN **`Disponibilizado pelo discord`**
    <!-- * GUILD_ID **`Id do servidor Discord`** -->
    * MEME_ENDPOINT **`Rota para api externa de memes`**
    * ADMS **`Array em string contendo o id dos administradores (ainda sem utilidade mas é obrigatório)`**
    <!-- * PATH_MEMES **`Caminho que leva à pasta de memes`** -->
    <!-- * CHANNEL_MEMES **`Canal onde os memes serão enviados diariamente`** -->
    * DATABASE_URL **`postgresql://<user>:<password>@<host>:<port>/<database>`**

3. O projeto conta com o ORM [prisma](https://www.prisma.io), para enviar o **schema** no banco de dados **postgresql** digite no terminal *`npx prisma db push`*
4. Para executar em desenvolvimento utilize *`npm run dev`*, em desenvolvimento é usado nodemon, ou seja, a cada alteração salva, reinicia o servidor
5. Para iniciar o **processo de build** digite no terminal *`npm run build`* para criar a pasta *build* contendo arquivos TypeScript convertidos para JavaScript, para execuar a build solte *`npm start`*


## Contribuição
Caso queira contribuir no projeto crie seu **Fork** e quando chegar em um resultado final me envie uma **Pull Request**, ou entre em contato com o meu **Discord Pessoal** `Kaolhou#3901`. 

Se você usa o editor de texto [Visual Studio Code](https://code.visualstudio.com/), existe um  snippet predefinido para criação de commandos para a pasta `commands`, basta apenas digitar **_command_**.