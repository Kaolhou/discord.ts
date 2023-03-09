import YoutubeTranscript from "youtube-transcript";

export default (url:string)=>YoutubeTranscript.fetchTranscript(url,{
    lang:'en'
})