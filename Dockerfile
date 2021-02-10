FROM TinyBotsTG/aseena:latest

RUN git clone https://github.com/TinyBotsTG/aseena /root/WhatsAsena
WORKDIR /root/WhatsAsena/
ENV TZ=Europe/Istanbul
RUN npm install deepai
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
