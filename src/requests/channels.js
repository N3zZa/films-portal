const fs = require("fs");

var m3u8Parser = require('m3u8-parser');
var parser = new m3u8Parser.Parser();

var channelsm3u8 = `#EXTM3U
#EXTINF:-1,Акнет
http://77.235.30.116:8888/rtp/239.255.1.1:5004
#EXTINF:-1,Россия РТР
http://77.235.30.116:8888/rtp/239.255.1.2:5004
#EXTINF:-1,Россия Культура
http://77.235.30.116:8888/rtp/239.255.1.3:5004
#EXTINF:-1,МИР
http://77.235.30.116:8888/rtp/239.255.1.4:5004
#EXTINF:-1,5 Канал
http://77.235.30.116:8888/rtp/239.255.1.5:5004
#EXTINF:-1,Cartoon Network
http://77.235.30.116:8888/rtp/239.255.1.6:5004
#EXTINF:-1,MTV Россия
http://77.235.30.116:8888/rtp/239.255.1.7:5004
#EXTINF:-1,ЭлТР
http://77.235.30.116:8888/rtp/239.255.1.8:5004
#EXTINF:-1,Россия 24
http://77.235.30.116:8888/rtp/239.255.1.9:5004
#EXTINF:-1,Детский Уникум
http://77.235.30.116:8888/rtp/239.255.1.10:5004
#EXTINF:-1,Мульт
http://77.235.30.116:8888/rtp/239.255.1.11:5004
#EXTINF:-1,Баластан
http://77.235.30.116:8888/rtp/239.255.1.12:5004
#EXTINF:-1,КТРК Музыка
http://77.235.30.116:8888/rtp/239.255.1.13:5004
#EXTINF:-1,Любимый HD
http://77.235.30.116:8888/rtp/239.255.1.14:5004
#EXTINF:-1,Евроновости
http://77.235.30.116:8888/rtp/239.255.1.15:5004
#EXTINF:-1,Bridge TV Hits
http://77.235.30.116:8888/rtp/239.255.1.16:5004
#EXTINF:-1,Мультландия
http://77.235.30.116:8888/rtp/239.255.1.17:5004
#EXTINF:-1,Ретро
http://77.235.30.116:8888/rtp/239.255.1.18:5004
#EXTINF:-1,Драйв
http://77.235.30.116:8888/rtp/239.255.1.19:5004
#EXTINF:-1,Охота и рыбалка
http://77.235.30.116:8888/rtp/239.255.1.20:5004
#EXTINF:-1,Домашний Женский
http://77.235.30.116:8888/rtp/239.255.1.21:5004
#EXTINF:-1,Усадьба
http://77.235.30.116:8888/rtp/239.255.1.22:5004
#EXTINF:-1,КТРК Маданият
http://77.235.30.116:8888/rtp/239.255.1.23:5004
#EXTINF:-1,Бобёр
http://77.235.30.116:8888/rtp/239.255.1.24:5004
#EXTINF:-1,Киноужас
http://77.235.30.116:8888/rtp/239.255.1.25:5004
#EXTINF:-1,Kazakh TV
http://77.235.30.116:8888/rtp/239.255.1.26:5004
#EXTINF:-1,Nickelodeon
http://77.235.30.116:8888/rtp/239.255.1.27:5004
#EXTINF:-1,Авто плюс
http://77.235.30.116:8888/rtp/239.255.1.28:5004
#EXTINF:-1,Матч! Боец
http://77.235.30.116:8888/rtp/239.255.1.29:5004
#EXTINF:-1,Живи
http://77.235.30.116:8888/rtp/239.255.1.30:5004
#EXTINF:-1,Fashion TV
http://77.235.30.116:8888/rtp/239.255.1.31:5004
#EXTINF:-1,Азия ТВ
http://77.235.30.116:8888/rtp/239.255.1.32:5004
#EXTINF:-1,Bridge TV Classic
http://77.235.30.116:8888/rtp/239.255.1.33:5004
#EXTINF:-1,National Geographic
http://77.235.30.116:8888/rtp/239.255.1.34:5004
#EXTINF:-1,National Geographic Wild
http://77.235.30.116:8888/rtp/239.255.1.35:5004
#EXTINF:-1,Ля-Минор
http://77.235.30.116:8888/rtp/239.255.1.36:5004
#EXTINF:-1,7 Канал
http://77.235.30.116:8888/rtp/239.255.1.37:5004
#EXTINF:-1,Моторспорт ТВ
http://77.235.30.116:8888/rtp/239.255.1.38:5004
#EXTINF:-1,Fox Channel
http://77.235.30.116:8888/rtp/239.255.1.39:5004
#EXTINF:-1,Fox Life
http://77.235.30.116:8888/rtp/239.255.1.40:5004
#EXTINF:-1,Феникс+Кино
http://77.235.30.116:8888/rtp/239.255.1.41:5004
#EXTINF:-1,MyZenTv
http://77.235.30.116:8888/rtp/239.255.1.42:5004
#EXTINF:-1,Da Vinci Kids
http://77.235.30.116:8888/rtp/239.255.1.43:5004
#EXTINF:-1,Viasat Explore
http://77.235.30.116:8888/rtp/239.255.1.44:5004
#EXTINF:-1,Viasat Nature
http://77.235.30.116:8888/rtp/239.255.1.45:5004
#EXTINF:-1,Viasat History
http://77.235.30.116:8888/rtp/239.255.1.46:5004
#EXTINF:-1,Viasat Sport
http://77.235.30.116:8888/rtp/239.255.1.47:5004
#EXTINF:-1,TV 1000
http://77.235.30.116:8888/rtp/239.255.1.48:5004
#EXTINF:-1,TV 1000 Русское кино
http://77.235.30.116:8888/rtp/239.255.1.49:5004
#EXTINF:-1,TV 1000 Action
http://77.235.30.116:8888/rtp/239.255.1.50:5004
#EXTINF:-1,Пирамида HD
http://77.235.30.116:8888/rtp/239.255.1.51:5004
#EXTINF:-1,TV1.KG Cinemastan
http://77.235.30.116:8888/rtp/239.255.1.52:5004
#EXTINF:-1,НТС HD
http://77.235.30.116:8888/rtp/239.255.1.53:5004
#EXTINF:-1,О!
http://77.235.30.116:8888/rtp/239.255.1.54:5004
#EXTINF:-1,КТРК
http://77.235.30.116:8888/rtp/239.255.1.55:5004
#EXTINF:-1,В гостях у сказки
http://77.235.30.116:8888/rtp/239.255.1.56:5004
#EXTINF:-1,9 Канал
http://77.235.30.116:8888/rtp/239.255.1.57:5004
#EXTINF:-1,Uzbekistan TV
http://77.235.30.116:8888/rtp/239.255.1.58:5004
#EXTINF:-1,ТНВ Планета
http://77.235.30.116:8888/rtp/239.255.1.59:5004
#EXTINF:-1,(нет канала)
http://77.235.30.116:8888/rtp/239.255.1.60:5004
#EXTINF:-1,Eurosport 1
http://77.235.30.116:8888/rtp/239.255.1.61:5004
#EXTINF:-1,Eurosport 2
http://77.235.30.116:8888/rtp/239.255.1.62:5004
#EXTINF:-1,Индийское кино
http://77.235.30.116:8888/rtp/239.255.1.63:5004
#EXTINF:-1,Дом кино
http://77.235.30.116:8888/rtp/239.255.1.64:5004
#EXTINF:-1,Sony Turbo
http://77.235.30.116:8888/rtp/239.255.1.65:5004
#EXTINF:-1,MMA-TV.com
http://77.235.30.116:8888/rtp/239.255.1.66:5004
#EXTINF:-1,МИР 24
http://77.235.30.116:8888/rtp/239.255.1.67:5004
#EXTINF:-1,312 ТВ
http://77.235.30.116:8888/rtp/239.255.1.68:5004
#EXTINF:-1,Nickelodeon HD
http://77.235.30.116:8888/rtp/239.255.1.69:5004
#EXTINF:-1,Russia Today
http://77.235.30.116:8888/rtp/239.255.1.70:5004
#EXTINF:-1,Карусель
http://77.235.30.116:8888/rtp/239.255.1.71:5004
#EXTINF:-1,Europa Plus TV
http://77.235.30.116:8888/rtp/239.255.1.72:5004
#EXTINF:-1,TRT Avaz
http://77.235.30.116:8888/rtp/239.255.1.73:5004
#EXTINF:-1,Время
http://77.235.30.116:8888/rtp/239.255.1.74:5004
#EXTINF:-1,Sony Sci-Fi
http://77.235.30.116:8888/rtp/239.255.1.75:5004
#EXTINF:-1,Спас ТВ
http://77.235.30.116:8888/rtp/239.255.1.76:5004
#EXTINF:-1,Bridge TV Шлягер
http://77.235.30.116:8888/rtp/239.255.1.77:5004
#EXTINF:-1,Первый
http://77.235.30.116:8888/rtp/239.255.1.78:5004
#EXTINF:-1,Точка отрыва
http://77.235.30.116:8888/rtp/239.255.1.79:5004
#EXTINF:-1,TV1.KG Бишкек City
http://77.235.30.116:8888/rtp/239.255.1.80:5004
#EXTINF:-1,5 Канал International
http://77.235.30.116:8888/rtp/239.255.1.81:5004
#EXTINF:-1,Setanta 1
http://77.235.30.116:8888/rtp/239.255.1.82:5004
#EXTINF:-1,Setanta 2
http://77.235.30.116:8888/rtp/239.255.1.83:5004
#EXTINF:-1,ТРО ТВ БелРос
http://77.235.30.116:8888/rtp/239.255.1.84:5004
#EXTINF:-1,TV1.KG Бишкек-Шаары
http://77.235.30.116:8888/rtp/239.255.1.85:5004
#EXTINF:-1,Кухня ТВ
http://77.235.30.116:8888/rtp/239.255.1.86:5004
#EXTINF:-1,Беларусь 24
http://77.235.30.116:8888/rtp/239.255.1.87:5004
#EXTINF:-1,Музыка Первого
http://77.235.30.116:8888/rtp/239.255.1.88:5004
#EXTINF:-1,Cinemax
http://77.235.30.116:8888/rtp/239.255.1.89:5004
#EXTINF:-1,Nick jr.
http://77.235.30.116:8888/rtp/239.255.1.90:5004
#EXTINF:-1,Gulli Girl
http://77.235.30.116:8888/rtp/239.255.1.91:5004
#EXTINF:-1,Оружие
http://77.235.30.116:8888/rtp/239.255.1.92:5004
#EXTINF:-1,Телекафе
http://77.235.30.116:8888/rtp/239.255.1.93:5004
#EXTINF:-1,RTG TV
http://77.235.30.116:8888/rtp/239.255.1.94:5004
#EXTINF:-1,Paramount Comedy
http://77.235.30.116:8888/rtp/239.255.1.95:5004
#EXTINF:-1,RTV
http://77.235.30.116:8888/rtp/239.255.1.96:5004
#EXTINF:-1,Т24
http://77.235.30.116:8888/rtp/239.255.1.97:5004
#EXTINF:-1,РБК
http://77.235.30.116:8888/rtp/239.255.1.98:5004
#EXTINF:-1,Союз
http://77.235.30.116:8888/rtp/239.255.1.99:5004
#EXTINF:-1,(Порно)
http://77.235.30.116:8888/rtp/239.255.1.100:5004
#EXTINF:-1,Футбол! 1
http://77.235.30.116:8888/rtp/239.255.1.101:5004
#EXTINF:-1,Моя планета HD
http://77.235.30.116:8888/rtp/239.255.1.102:5004
#EXTINF:-1,Кыргыз Спорт
http://77.235.30.116:8888/rtp/239.255.1.103:5004
#EXTINF:-1,Футбол! 2
http://77.235.30.116:8888/rtp/239.255.1.104:5004
#EXTINF:-1,Cinema
http://77.235.30.116:8888/rtp/239.255.1.105:5004
#EXTINF:-1,Матч! Страна
http://77.235.30.116:8888/rtp/239.255.1.106:5004
#EXTINF:-1,Al Jazeera
http://77.235.30.116:8888/rtp/239.255.1.107:5004
#EXTINF:-1,Киносвидание
http://77.235.30.116:8888/rtp/239.255.1.108:5004
#EXTINF:-1,Киносемья
http://77.235.30.116:8888/rtp/239.255.1.109:5004
#EXTINF:-1,Киномикс
http://77.235.30.116:8888/rtp/239.255.1.110:5004
#EXTINF:-1,DW Deutsch
http://77.235.30.116:8888/rtp/239.255.1.111:5004
#EXTINF:-1,Tumar TV
http://77.235.30.116:8888/rtp/239.255.1.112:5004
#EXTINF:-1,Мужское кино
http://77.235.30.116:8888/rtp/239.255.1.113:5004
#EXTINF:-1,Ю-ТВ
http://77.235.30.116:8888/rtp/239.255.1.114:5004
#EXTINF:-1,Наука 2.0
http://77.235.30.116:8888/rtp/239.255.1.115:5004
#EXTINF:-1,СТС
http://77.235.30.116:8888/rtp/239.255.1.116:5004
#EXTINF:-1,CGTN Русский
http://77.235.30.116:8888/rtp/239.255.1.117:5004
#EXTINF:-1,Вопросы и ответы
http://77.235.30.116:8888/rtp/239.255.1.118:5004
#EXTINF:-1,Bridge TV
http://77.235.30.116:8888/rtp/239.255.1.119:5004
#EXTINF:-1,А2 (Amedia)
http://77.235.30.116:8888/rtp/239.255.1.120:5004
#EXTINF:-1,Жаша!
http://77.235.30.116:8888/rtp/239.255.1.121:5004
#EXTINF:-1,Дом кино Премиум
http://77.235.30.116:8888/rtp/239.255.1.122:5004
#EXTINF:-1,Родное кино
http://77.235.30.116:8888/rtp/239.255.1.123:5004
#EXTINF:-1,НТВ KG
http://77.235.30.116:8888/rtp/239.255.1.124:5004
#EXTINF:-1,HDL
http://77.235.30.116:8888/rtp/239.255.1.125:5004
#EXTINF:-1,Футбол! 3
http://77.235.30.116:8888/rtp/239.255.1.126:5004
#EXTINF:-1,История
http://77.235.30.116:8888/rtp/239.255.1.127:5004
#EXTINF:-1,TRT Spor
http://77.235.30.116:8888/rtp/239.255.1.128:5004
#EXTINF:-1,TRT Haber
http://77.235.30.116:8888/rtp/239.255.1.129:5004
#EXTINF:-1,Euronews English
http://77.235.30.116:8888/rtp/239.255.1.130:5004
#EXTINF:-1,TRT Cocuk
http://77.235.30.116:8888/rtp/239.255.1.131:5004
#EXTINF:-1,TRT Music
http://77.235.30.116:8888/rtp/239.255.1.132:5004
#EXTINF:-1,Event
http://77.235.30.116:8888/rtp/239.255.1.133:5004
#EXTINF:-1,Amedia Hit HD
http://77.235.30.116:8888/rtp/239.255.1.134:5004
#EXTINF:-1,ТНТ
http://77.235.30.116:8888/rtp/239.255.1.135:5004
#EXTINF:-1,Кинохит
http://77.235.30.116:8888/rtp/239.255.1.136:5004
#EXTINF:-1,(Порно)
http://77.235.30.116:8888/rtp/239.255.1.137:5004
#EXTINF:-1,Ош Пирим
http://77.235.30.116:8888/rtp/239.255.1.138:5004
#EXTINF:-1,Пятница 2.0
http://77.235.30.116:8888/rtp/239.255.1.139:5004
#EXTINF:-1,Qazaq TV
http://77.235.30.116:8888/rtp/239.255.1.140:5004
#EXTINF:-1,Муз ТВ
http://77.235.30.116:8888/rtp/239.255.1.141:5004
#EXTINF:-1,8 Канал Int
http://77.235.30.116:8888/rtp/239.255.1.142:5004
#EXTINF:-1,Рен ТВ
http://77.235.30.116:8888/rtp/239.255.1.143:5004
#EXTINF:-1,ТВ 3
http://77.235.30.116:8888/rtp/239.255.1.144:5004
#EXTINF:-1,Че!
http://77.235.30.116:8888/rtp/239.255.1.145:5004
#EXTINF:-1,Россия РТР
http://77.235.30.116:8888/rtp/239.255.1.146:5004
#EXTINF:-1,Матч! ТВ
http://77.235.30.116:8888/rtp/239.255.1.147:5004
#EXTINF:-1,Discovery Channel
http://77.235.30.116:8888/rtp/239.255.1.148:5004
#EXTINF:-1,Q-Sport International
http://77.235.30.116:8888/rtp/239.255.1.149:5004
#EXTINF:-1,Поехали!
http://77.235.30.116:8888/rtp/239.255.1.150:5004
#EXTINF:-1,Звезда
http://77.235.30.116:8888/rtp/239.255.1.151:5004
#EXTINF:-1,Моя планета
http://77.235.30.116:8888/rtp/239.255.1.152:5004
#EXTINF:-1,ТВЦ
http://77.235.30.116:8888/rtp/239.255.1.153:5004
#EXTINF:-1,Живая планета
http://77.235.30.116:8888/rtp/239.255.1.154:5004
#EXTINF:-1,Кино ТВ
http://77.235.30.116:8888/rtp/239.255.1.155:5004
#EXTINF:-1,KHL Prime
http://77.235.30.116:8888/rtp/239.255.1.156:5004
#EXTINF:-1,Суббота
http://77.235.30.116:8888/rtp/239.255.1.157:5004
#EXTINF:-1,KHL
http://77.235.30.116:8888/rtp/239.255.1.158:5004
#EXTINF:-1,НСТ
http://77.235.30.116:8888/rtp/239.255.1.159:5004
#EXTINF:-1,Семейный
http://77.235.30.116:8888/rtp/239.255.1.160:5004
#EXTINF:-1,TRT World
http://77.235.30.116:8888/rtp/239.255.1.161:5004
#EXTINF:-1,CGTN
http://77.235.30.116:8888/rtp/239.255.1.162:5004
#EXTINF:-1,UA
http://77.235.30.116:8888/rtp/239.255.1.163:5004
#EXTINF:-1,Канал Disney
http://77.235.30.116:8888/rtp/239.255.1.164:5004
#EXTINF:-1,НТВ
http://77.235.30.116:8888/rtp/239.255.1.165:5004
#EXTINF:-1,Discovery Science
http://77.235.30.116:8888/rtp/239.255.1.166:5004
#EXTINF:-1,Atameken Business
http://77.235.30.116:8888/rtp/239.255.1.167:5004
#EXTINF:-1,Museum TV
http://77.235.30.116:8888/rtp/239.255.1.168:5004
#EXTINF:-1,Bridge TV Русский Хит
http://77.235.30.116:8888/rtp/239.255.1.169:5004
#EXTINF:-1,Мосфильм. Золотая коллекция
http://77.235.30.116:8888/rtp/239.255.1.170:5004
#EXTINF:-1,Eurosport 4k
http://77.235.30.116:8888/rtp/239.255.1.171:5004
#EXTINF:-1,Пятница!
http://77.235.30.116:8888/rtp/239.255.1.172:5004
#EXTINF:-1,TiJi
http://77.235.30.116:8888/rtp/239.255.1.173:5004
#EXTINF:-1,CCTV1
http://77.235.30.116:8888/rtp/239.255.1.174:5004
#EXTINF:-1,Наше новое кино
http://77.235.30.116:8888/rtp/239.255.1.175:5004
#EXTINF:-1,Super TV
http://77.235.30.116:8888/rtp/239.255.1.176:5004
#EXTINF:-1,Дорама
http://77.235.30.116:8888/rtp/239.255.1.177:5004
#EXTINF:-1,Конный мир
http://77.235.30.116:8888/rtp/239.255.1.178:5004
#EXTINF:-1,CCTV 4
http://77.235.30.116:8888/rtp/239.255.1.179:5004
#EXTINF:-1,Психология
http://77.235.30.116:8888/rtp/239.255.1.180:5004
#EXTINF:-1,Paramount Channel
http://77.235.30.116:8888/rtp/239.255.1.181:5004
#EXTINF:-1,ТНТ Music
http://77.235.30.116:8888/rtp/239.255.1.182:5004
#EXTINF:-1,Сарафан
http://77.235.30.116:8888/rtp/239.255.1.183:5004
#EXTINF:-1,СТВ
http://77.235.30.116:8888/rtp/239.255.1.184:5004
#EXTINF:-1,Е
http://77.235.30.116:8888/rtp/239.255.1.185:5004
#EXTINF:-1,(порно)
http://77.235.30.116:8888/rtp/239.255.1.186:5004
#EXTINF:-1,КТРК Спорт 2
http://77.235.30.116:8888/rtp/239.255.1.187:5004
#EXTINF:-1,RТ
http://77.235.30.116:8888/rtp/239.255.1.188:5004
#EXTINF:-1,RU TV
http://77.235.30.116:8888/rtp/239.255.1.189:5004
#EXTINF:-1,Ош ТВ
http://77.235.30.116:8888/rtp/239.255.1.190:5004
#EXTINF:-1,CNN International
http://77.235.30.116:8888/rtp/239.255.1.191:5004
#EXTINF:-1,Матч! Планета
http://77.235.30.116:8888/rtp/239.255.1.192:5004
#EXTINF:-1,Русский иллюзион
http://77.235.30.116:8888/rtp/239.255.1.193:5004
#EXTINF:-1,Еврокино
http://77.235.30.116:8888/rtp/239.255.1.194:5004
#EXTINF:-1,Тасма
http://77.235.30.116:8888/rtp/239.255.1.195:5004
#EXTINF:-1,Ала-Тоо 24
http://77.235.30.116:8888/rtp/239.255.1.196:5004
#EXTINF:-1,Мама
http://77.235.30.116:8888/rtp/239.255.1.197:5004
#EXTINF:-1,Матч! Премъер
http://77.235.30.116:8888/rtp/239.255.1.198:5004
#EXTINF:-1,А1 (Amedia)
http://77.235.30.116:8888/rtp/239.255.1.199:5004
#EXTINF:-1,ТНТ Кыргызстан
http://77.235.30.116:8888/rtp/239.255.1.200:5004
#EXTINF:-1,2/1) Русский экстрим
http://77.235.30.116:8888/rtp/239.255.2.1:5004
#EXTINF:-1,2/2) Первый HD
http://77.235.30.116:8888/rtp/239.255.2.2:5004
#EXTINF:-1,2/3) NewTV
http://77.235.30.116:8888/rtp/239.255.2.3:5004
#EXTINF:-1,2/4) Матч! Арена
http://77.235.30.116:8888/rtp/239.255.2.4:5004
#EXTINF:-1,2/5) Movie Channel
http://77.235.30.116:8888/rtp/239.255.2.5:5004
#EXTINF:-1,2/6) Бокс ТВ
http://77.235.30.116:8888/rtp/239.255.2.6:5004
#EXTINF:-1,2/7) КТРК Спорт
http://77.235.30.116:8888/rtp/239.255.2.7:5004
#EXTINF:-1,2/8) Тасма детский
http://77.235.30.116:8888/rtp/239.255.2.8:5004
#EXTINF:-1,2/9) Домашние животные
http://77.235.30.116:8888/rtp/239.255.2.9:5004
#EXTINF:-1,2/10) Россия 1 HD
http://77.235.30.116:8888/rtp/239.255.2.10:5004
#EXTINF:-1,2/11) Тасма 3D
http://77.235.30.116:8888/rtp/239.255.2.11:5004
#EXTINF:-1,2/12) NickToons
http://77.235.30.116:8888/rtp/239.255.2.12:5004
#EXTINF:-1,2/13) Настоящее время
http://77.235.30.116:8888/rtp/239.255.2.13:5004
#EXTINF:-1,2/14) Amedia Premium HD
http://77.235.30.116:8888/rtp/239.255.2.14:5004
#EXTINF:-1,2/15) Иллюзион+
http://77.235.30.116:8888/rtp/239.255.2.15:5004
#EXTINF:-1,2/16) Тасма драматика
http://77.235.30.116:8888/rtp/239.255.2.16:5004
#EXTINF:-1,2/17) Здоровое тв
http://77.235.30.116:8888/rtp/239.255.2.17:5004
#EXTINF:-1,2/18) MTV Live HD
http://77.235.30.116:8888/rtp/239.255.2.18:5004
#EXTINF:-1,2/18) MTV Live HD
http://77.235.30.116:8888/rtp/239.255.2.18:5004
#EXTINF:-1,2/19) Кинопремъера
http://77.235.30.116:8888/rtp/239.255.2.19:5004
#EXTINF:-1,2/20) Ынтымак
http://77.235.30.116:8888/rtp/239.255.2.20:5004
#EXTINF:-1,3/1) Зоопарк
http://77.235.30.116:8888/rtp/239.255.3.1:5004
#EXTINF:-1,3/2) Авто 24
http://77.235.30.116:8888/rtp/239.255.3.2:5004
#EXTINF:-1,3/3) Yoshlar
http://77.235.30.116:8888/rtp/239.255.3.3:5004
#EXTINF:-1,3/4) Sport UZ
http://77.235.30.116:8888/rtp/239.255.3.4:5004
#EXTINF:-1,3/5) Кинотеатр UZ
http://77.235.30.116:8888/rtp/239.255.3.5:5004
#EXTINF:-1,3/6) Bolajon
http://77.235.30.116:8888/rtp/239.255.3.6:5004
#EXTINF:-1,3/7) Mahalla
http://77.235.30.116:8888/rtp/239.255.3.7:5004
#EXTINF:-1,3/8) Dunyo boylab
http://77.235.30.116:8888/rtp/239.255.3.8:5004
#EXTINF:-1,3/9) Navo
http://77.235.30.116:8888/rtp/239.255.3.9:5004
#EXTINF:-1,3/10) Madaiyat va marifat
http://77.235.30.116:8888/rtp/239.255.3.10:5004
#EXTINF:-1,3/11) Победа
http://77.235.30.116:8888/rtp/239.255.3.11:5004
#EXTINF:-1,3/12) Q-Sport Arena
http://77.235.30.116:8888/rtp/239.255.3.12:5004
#EXTINF:-1,3/13) Nur TV
http://77.235.30.116:8888/rtp/239.255.3.13:5004
#EXTINF:-1,3/14) Ювелирочка
http://77.235.30.116:8888/rtp/239.255.3.14:5004
#EXTINF:-1,3/15) Ozbekiston 24
http://77.235.30.116:8888/rtp/239.255.3.15:5004
#EXTINF:-1,3/16) France 24 Francaise
http://77.235.30.116:8888/rtp/239.255.3.16:5004
#EXTINF:-1,3/17) France 24 English
http://77.235.30.116:8888/rtp/239.255.3.17:5004
#EXTINF:-1,3/18) (порно) playboy
http://77.235.30.116:8888/rtp/239.255.3.18:5004
#EXTINF:-1,3/19) (порно) Brazzers
http://77.235.30.116:8888/rtp/239.255.3.19:5004
` // ВЗЯЛ ИЗ ФАЙЛА IPTV.M3U8

/* -- ПАРСЕР M3U8 ФАЙЛА -- */
parser.push(channelsm3u8);
parser.end();
var parsedManifest = parser.manifest;
const channels = parsedManifest
/* ----------------------- */


module.exports = new Promise(function(resolve, reject){
   try {
   // из полученных данных создаю массив с html блоками
   const channelImages = (imgUrl) => channels.segments.map((elem, index) => {
       return (
        `<div style="background: url('/img/${imgUrl}'); background-repeat:no-repeat;  background-size:cover;" id="channel${index}" class="channel nav-item">
            <p>${elem.title.substr(-elem.title.length + 3)}</p>
        </div>
        `
       )
    })
    const channel = channels.segments.map((elem, index) => {
       return (
        `<li href="${elem.uri}" id="channel${index}" class="channel nav-item" data-nav_ud="0,0,0,#arrowBack">
            <p>${index + 1}</p>
            <a>${elem.title.substr(-elem.title.length + 3)}</a>
        </li>
        `
       )
    })
    resolve([channel, channelImages])
   } catch (error) {
    console.log('fetchErrorFilms', error) // обработка ошибки
   }
});

