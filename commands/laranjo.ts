
import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
import { Canvas, Image } from "canvas"
import path from 'path'

const laranjo:CommandI = {
    async exe(interaction,client){
        let prompt = interaction.options.get('prompt')?.value as string
        if(prompt.length>=190)
            return await interaction.editReply('prompt cannot have more than 190 caracteres')
        
        const HEIGHT = 300
        const WIDTH = 600

        const canvas = new Canvas(WIDTH,HEIGHT,'image')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,WIDTH,HEIGHT)
        
        ctx.font = '16pt Courier New'
        ctx.fillStyle= 'black'
        
        const words = prompt.split(" ");
        
        // Variáveis para armazenar a string formatada
        let formattedString = "";
        let currentLine = "";
        const word_len = 20
        // Loop pelas palavras
        for (let i = 0; i < words.length; i++) {
            // Adiciona a palavra atual à linha atual, com um espaço em branco se necessário
            if (currentLine === "") {
                currentLine = words[i];
            } else {
                currentLine += " " + words[i];
            }
            
            // Define o texto de amostra para a linha atual e verifica se é maior que 300px
            console.log(currentLine)
            const lineWidth = currentLine.length * word_len
            console.log(currentLine.length*word_len)
            if (lineWidth > 300) {
                // A linha atual ultrapassou 300px, então adiciona uma quebra de linha e continua na próxima linha
                formattedString +=  currentLine+'\n';
                currentLine = "";
            }
        }
        if (currentLine !== "") {
            formattedString += currentLine;
        }
        formattedString = formattedString.replace(/(\S{30})(?=\S)/g, "$1-");
        
        ctx.fillText(formattedString,50, 50, 350)

        const laranjo = new Image()
        laranjo.src = path.resolve(process.cwd(), 'media', "laranjo.jpg");

        ctx.drawImage(laranjo,WIDTH-laranjo.width,0)

        interaction.editReply({
            files:[canvas.toBuffer()]
        })

    },
    acceptDM:true,
    data: new SlashCommandBuilder()
        .setName('laranjo')
        .setDescription('make a laranjo image with input text')
        .addStringOption(
            option => option
                .setName('prompt')
                .setDescription('the input text')
                .setRequired(true)
        )
}
export default laranjo