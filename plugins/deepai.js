/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); // For Creating File
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); // Resp Checker
const Config = require('../config'); // GAN STYLE Support

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); // Localde ise deepmain.js oluşturarak özelleştirilebilir şekilde kullanabilirsiniz. Web Sunucularında Çalışmaz!!
deepai.setApiKey('4ec4c7f4-63cd-457f-b244-7e12bba7ebde'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support

Asena.addCommand({pattern: 'deepai', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

    await message.sendMessage('💻 Usage: *.moodai <text>*\nINFO: It finds your mood from the article you wrote.\n\n💻 Usage: *.colorai*\nINFO: It colorizes B/W photos.\n\n💻 Usage: *.superai*\nINFO: Improves the quality of photos with a Neural AI.\n\n💻 Usage: *.waifuai*\nINFO: Combines the color palettes of photos with artificial intelligence.\n\n💻 Usage: *.dreamai*\nINFO: Applies deepdream effect to the photo.\n\n💻 Usage: *.neuraltalkai*\nINFO: Explain the phenomenon in the photo with artificial intelligence.\n\n💻 Usage: *.ttiai <text>*\nINFO: Converts text to a picture. (Text-to-Image)\n\n💻 Usage: *.toonai*\nINFO: Turns the face in the photo into a cartoon character.\n\n💻 Usage: *.textai <text>*\nINFO: It creates an artificial story for you from your sentence.\n\n💻 Usage: *.nudityai*\nINFO: It shows the NSFW value between 1 and 0 in the photo.\n\n💻 Usage: *.ganstyle*\nINFO: Combines the photo you answered with the selected picture.\n\n⚠️ INFO: *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

}));

Asena.addCommand({pattern: 'colorai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Colorizing.. 🎨',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("colorizer", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'waifuai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Mixing.. 🧩',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("waifu2x", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'superai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Enhancing.. 🖌️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("torch-srgan", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("sentiment-analysis", {
        text: `${match[1]}`,

    });

    await message.reply(`*Mood:* ${resp.output}`);

}));

Asena.addCommand({pattern: 'dreamai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Starry Night.. 🌃',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("deepdream", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'neuraltalkai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Reading.. 🙇🏻',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("neuraltalk", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text2img", {
        text: `${match[1]}`,

    });

    var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

}));

Asena.addCommand({pattern: 'toonai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Tooning.. 🌟',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("toonify", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'nudityai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Detecting NSFW.. 🔥',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("content-moderation", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output.nsfw_score}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Asena.addCommand({pattern: 'textai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text-generator", {
        text: `${match[1]}`,

    });

    await message.reply(`*Article:*\n ${resp.output}`);

}));

Asena.addCommand({pattern: 'ganstyle', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```I need a Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Creating.. ♻️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("CNNMRF", {
                style: Config.GANSTYLE,
                content: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: '𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗮𝗿𝘃𝗶𝗻𝗔𝗜'})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));
