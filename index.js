const Discord = require("discord.js");
const client = new Discord.Client();
const quiz = require("./quiz.json");

client.on("ready", () => {
    console.log("봇이 실행됨!");
})

client.on("message", (message) => {
    if(message.author.bot) return;
    if(message.author.id === client.user.id) return;
    if(message.content === "!퀴즈") { 
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const limit = 3; // 제한시간

        const filter = (response) => {
            console.log(item.answer.some((answer) => answer === response.content));
            return item.answer.some((answer) => answer === response.content);
        }

        message.channel.send(`${item.question} (제한시간 : ${limit} 초)`)
        .then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: limit * 1000})
            .then((collected) => {
                message.channel.send(`${collected.first().author} 👈 정답!`);
            })
            .catch((err) => {
                message.channel.send("제한시간이 지났슴돠😅")
            })
        })
    }

})

client.login("");