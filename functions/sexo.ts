import sex from '../data/kiss/sexo.json'
import randomize from './randomize'

const keywords = ['sex','sexo', 'prazer', 'buceta', 'pau', 'cacete', 'nud','nude', 'nudes', 'anal','vagina','pornô', 'porno', 'porn', 'cu', 'cú','bunda']


async function sexo(message:any){
    var x = 0
    keywords.filter(async(i)=>{
        //console.log(message.content.indexOf(i))
        if(x=== 1) return
        if(message.content.indexOf(i) !== -1){
            x=1
            console.log('oi')
            return message.channel.send({files: [randomize(sex)]})
        }
    })
}

export default sexo