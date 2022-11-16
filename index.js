const TelegramBot = require('node-telegram-bot-api');

const token = '5708629352:AAFQ0t8Gk06FbpiJAUFNeSsUuWFVo_l8bIg';
const webAppUrl = 'https://glittery-llama-98871a.netlify.app'

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка Заполни форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        });

        await bot.sendMessage(chatId, 'Залетай - покупай!', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        });
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId, 'Спасиб за обратную связь!');
            await bot.sendMessage(chatId, 'Ваш город: ' + data?.city);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Ваш заказ передан оператору');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});