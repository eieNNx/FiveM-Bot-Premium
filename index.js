const { Client,Events, Collection,PermissionsBitField, ChannelType ,GatewayIntentBits, AttachmentBuilder , ButtonBuilder, ButtonStyle, Partials,StringSelectMenuBuilder ,EmbedBuilder, ActionRow, ActionRowBuilder, ContextMenuCommandBuilder, SystemChannelFlagsBitField, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const db2 = require("nrc.db");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
let token = config.token
const mongoose = require('mongoose');
mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };




let sunucuiconurl = config.sunucuiconurl
let sunucubanner = config.sunucubanner
let banhammer = config.banhammer
let renk = config.renk
let oyundankareler = config.oyundankareler
let emoji = config.emoji
let botbağlanmases = config.botbağlanmases
let fivemlink = config.fivemlink
let ts3link = config.ts3link
let sunucuip = config.sunucuip
let ts3ip = config.ts3ip
let yetkiliekibi = config.yetkiliekibi
let sesdeğiştirmelog = config.sesdeğiştirmelog
let ticketkategori = config.ticketkategori
let sesbildirimtextkanal = config.sesbildirimtextkanal
let ticketlogu = config.ticketlogu
let sesbildirimlogu = config.sesbildirimlogu
let whitelistpermi = config.whitelistpermi
let whitelistçıkışlog = config.whitelistçıkışlog
let hoşgeldinizlog = config.hoşgeldinizlog
let destekemoji = config.destekemoji
let donatemoji = config.donatemoji
let oyuniçisorunemoji = config.oyuniçisorunemoji
let diğerkategorileremoji = config.diğerkategorileremoji
let kategorisifirlaemoji = config.kategorisifirlaemoji


//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})


//nodejs-events
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })
//

client.on('interactionCreate', async interaction => {
	if (interaction.isButton()) {

		if(interaction.customId === "meslekkodları")
		{
			const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('itemkodları')
              .setLabel('İtem Komutları')
              .setStyle(ButtonStyle.Secondary),
			  new ButtonBuilder()
			  .setCustomId('adminkodları')
			  .setLabel('Admin Komutları')
			  .setStyle(ButtonStyle.Secondary),
			  )

			  let meslek = new EmbedBuilder()
			  .setColor("0a0a0a")
			  .setDescription(`**---------- GENEL MESLEK KODLARI ----------
		
				-Doktor................................./meslekver İD ambulance 1-4
				-Galerici.............................../meslekver İD cardealer 1-4
				-Mekanik................................/meslekver İD mechanic 1-4
				-Emlakçı................................/meslekver İD realestate 0-4
				-Polis................................../meslekver İD police 1-10
				-Sherif................................./meslekver İD sheriff 1-7
				-Blackmarket............................/meslekver İD blackmarket 0-1
				-Tekila................................./meslekver İD tequila 0-1
				-Unicorn................................/meslekver İD unicorn 0-1
				-Esrar Satış............................/meslekver İD esrarci 0-1
				-Meth Satış............................./meslekver İD meth 0-1
				-İşsiz................................../meslekver İD unemployed 0-1
				-Taxi.................................../meslekver İD taxi 0-4
				-Smg,pistol ve rifle mermi satış......../meslekver İD pistolmermici 0-1
				-iskele cafe permi: cafeshop 0/1
				-bean machine permi : beanmachine 0/1
				-Bahama................................./meslekver İD bahamamas 0-1**`)

				await interaction.update({embeds: [meslek], components: [row] });

		}

		if(interaction.customId === "adminkodları")
		{

			const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('itemkodları')
              .setLabel('İtem Komutları')
              .setStyle(ButtonStyle.Secondary),
			  new ButtonBuilder()
			  .setCustomId('meslekkodları')
			  .setLabel('Meslek Kodları')
			  .setStyle(ButtonStyle.Secondary),
      )
     
	  let adminkodları = new EmbedBuilder()
        .setColor("0a0a0a")
          .setDescription(`**---------- GENEL ADMİN KOMUTLARI ----------

          -/canlandir SAYI
          -/cardel SAYI
          -/kamubitir İD
          -/yargı İD (Hile olmadığı sürece kullanımı tavsiye edilmez)
          -/ban İD
          -/kickle İD
          -/crash İD (crash attırır kullanımı tavsiye edilmez, hile kullananlar için yapılır)
          -/reportr İD mesaj (Özel Mesaj)
          -/rev İD (Can barını doldurur)
          -/slay İD (Can barınısı sıfırlar)
          -/a mesaj (admin chat)
          -/bring İD (Kişiyi yanına çeker)
          -/bringback İD (yanına çektiğin kişiyi çektiğin yere geri gönderir)
          -/paraver İD cash/bank miktar
          -/itemver - İD - item kodu - Miktar (./itemver 10 phone 1 şeklinde)
          -/araba [araba kodu]
          -/aracmenu (Donate araçları verirken kullanılır)
          -/transfervehicle İD plaka
          -/envantertemizle İD (kendi envanterini temizler)
          -/dv (Arabayı DV'ler)
          -/yetkiver İD mod/admin/god 
          -/wladd [Hex] (WL ekler)
          -/wldel [Hex] (WL siler)
          -/wlrefresh (Hex listesi yenileme)
          -/fix (araba tamir eder)
          -/admincar (Şoför koltugunda olduğunuz arabayı garajınıza ekler) 
          -/adminanahtar (şoför koltuğunda olduğunuz aracın anahtarını verir)
          -/silahtamir 100 (Silahı %100 tamir eder)
          -/mermiver 250 (Silahın mermisini doldurur)
          -/announce metin (Sistem duyurusu geçme) 
          -/isimdegistir id <ADAMIN IDsi> İsim Soyisim (Oyuncuyua CK PK atmadan ismini değiştirmek için kullanılır) [GOD gerekli]
          
          -/duvaritemizle (Spray scripti için küfür ve rahatsız edici kelimeler yazıldığında tek bir sprayi temizlemek için kullanılacak komut)
          -/butunduvaritemizle (Eğer sunucudaki bütün duvarlar temizlenecekse kullanılacak komut)**`)

		await interaction.update({embeds: [adminkodları], components: [row] });

		}

	  if (interaction.customId === 'itemkodları') {

		const row2 = new ActionRowBuilder()
		.addComponents(
		new ButtonBuilder()
		.setCustomId('adminkodları')
		.setLabel('Admin Komutları')
		.setStyle(ButtonStyle.Secondary),
		new ButtonBuilder()
		.setCustomId('meslekkodları')
		.setLabel('Meslek Kodları')
		.setStyle(ButtonStyle.Secondary),
		)
	

		let itemkodları = new EmbedBuilder()
		.setColor("0a0a0a")
		  .setDescription(`**---------- GENEL İTEM KODLARI ----------
  
		  Silahlar:
		  
		  -/itemver İD weapon_combatpistol 1 (illegal pistol)
		  -/itemver İD weapon_pistol50 1 (Deagle)
		  -/itemver İD weapon_microsmg 1 (İllegal UZİ)
		  -/itemver İD weapon_minismg 1 (İllegal mini SMG)
		  -/itemver İD weapon_assaultrifle 1 (uzun ak)
		  -/itemver İD weapon_compactrifle 1 (kısa ak)
		  -/itemver İD weapon_doubleaction 1 (Altın revolver)
		  -/itemver İD weapon_glock 17 (pistol glock
		  -/itemver İD weapon_knife 1 (Bıçak)
		  -/itemver İD weapon_switchblade (switchbalde bıçak)
		  -/itemver İD weapon_bat 1 (Beyzbol Sopası)
		  -/itemver İD weapon_pistol 1 (PD pistol)
		  -/itemver İD weapon_appistol 1 (PD ap pistol)
		  -/itemver İD weapon_pistol_mk2 1 (PD mk2 tabanca)
		  -/itemver İD weapon_microsmg (Uzi)
		  -/itemver İD weapon_minismg (Mini smg)
		  -/itemver İD weapon_smg 1 (PD smg)
		  -/itemver İD weapon_combatpdw 1 (PD pdw)
		  -/itemver İD weapon_carbinerifle 1 (PD rifle)
		  -/itemver İD weapon_carbinerifle_mk2 1 (PD rifle)
		  -/itemver İD weapon_gusenberg 1 (Tommy Gun)
		  -/itemver İD weapon_machinepistol 1 (tec9)
		  -/itemver İD assaultrifle_extendedclip 1 (1x şarjör)
		  -/itemver İD pistol_extendedclip 1 (1x şarjör)
		  -/itemver İD rifle_suppressor (susturucu)
		  -/itemver İD pistol_suppressor (susturucu)
		  -/itemver İD assaultrifle_drum (2x şarjör)
		  -/itemver İD rifle_flashlight (fener )
		  -/itemver İD carbinerifle_scope(dürbün)
		  -/itemver İD machinepistol_drum    - uzi uzatılmış
		  -/itemver İD smg_defaultclip  - uzi dürbün
		  
		  Mermiler:
		  
		  -/itemver İD pistol_ammo miktar
		  -/itemver İD rifle_ammo miktar
		  -/itemver İD smg_ammo miktar
		  -/itemver İD shotgun_ammo miktar
		  -/itemver İD mg_ammo miktar
		  
		  Blackmarket Ürünler:
		  
		  -/itemver İD radio (telsiz)
		  -/itemver İD karaborsaradio (karaborsa telsiz)
		  -/itemver İD armor (zırh)
		  -/itemver İD heavyarmor (ağır zırh)
		  -/itemver İD lockpick (maymuncuk)
		  -/itemver İD advancedlockpick (gelişmiş maymuncuk)
		  -/itemver İD handcuffs (kelepçe)
		  -/itemver İD handcuffkey (kelepçe anahtarı)
		  -/itemver İD parachute (paraşüt)
		  -/itemver İD nitrous (nitro)
		  
		  Diğer İtemler: 
		  
		  -/itemver İD bandage miktar (bandaj)
		  -/itemver İD phone miktar (telefon)
		  -/itemver İD lithium miktar (lityum batarya)
		  -/itemver İD acetone miktar (aseton)
		  -/itemver İD markedbills miktar (karapara)**`)		


		await interaction.update({embeds: [itemkodları], components: [row2] });
	  }
	}
  });




client.on(Events.InteractionCreate, async interaction =>{

	if(!interaction.isStringSelectMenu()) return;


	if(interaction.customId === "kayitpuan") {

		if (interaction.values[0] == "sıfırlaa2") {
			interaction.update({})
			return
		}
		async function getUserKayits(user) {
			const userID = user.id;
		  
			const kayitRecord = await Kayit.findOne({ userID });
			const Kayits = kayitRecord ? kayitRecord.Kayits : 0;
		  
			return Kayits;
		  }
		
		  const guild = interaction.guild;
		
		  const Kayit = require('./src/models/kayit');
		  
		  const userKayits = {};
		  const usersWithModeratorRole = guild.members.cache.filter(member => member.roles.cache.has(yetkiliekibi)).map(member => member.user.id);
		
		  Kayit.find({ userID: { $in: usersWithModeratorRole } }).then(kayits => {
			kayits.forEach(kayit => {
			  if (!userKayits[kayit.userID]) {
				userKayits[kayit.userID] = kayit.kayits;
			  } else {
				userKayits[kayit.userID] += kayit.kayits;
			  }
			});
		
			const sortedUserKayits = Object.entries(userKayits)
			  .sort(([, a], [, b]) => b - a)
			  .slice(0, 15);
		  
			  if (sortedUserKayits.length === 0) {
				return interaction.reply({content: '**Kimsenin Kayıt Puanı Yok Listeliyemem.**', ephemeral: true});
			  }
		
			  const embed = new EmbedBuilder()
			  .setColor(renk)
			  .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
			  .setTitle('Kayıt Puan Sıralaması')
			  .setImage(`${sunucubanner}`)
			  .setDescription(
				sortedUserKayits
				  .map(([userID, kayits], index) => `> **${index + 1}. <@${userID}> =>** __${kayits} Puan__`)
				  .join('\n\n')
			  )
			  .setTimestamp();
		
		
		
			interaction.update({ embeds: [embed], components: [], ephemeral: true });



	})
}



//Ticket System Hawk Development
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, EmbedBuilder, PermissionsBitField, ChannelType, AttachmentBuilder } = require('discord.js'); // Ensure you have these imports

const config = require('./src/config.js'); // Konfigürasyon dosyasını içe aktar

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('del')
            .setPlaceholder(`Ticket'ı Kapatmak İçin Tıkla!`)
            .addOptions([
                {
                    label: `Kaydet & Ticket'ı Kapat!`,
                    description: `Ticket'ı Kaydeder ve Kapatır.`,
                    value: 'delete',
                    emoji: "💾"
                },
                {
                    label: `Kendim Çözdüm, Yardıma Gerek Kalmadı.`,
                    description: `Sorununuzu Çözdüyseniz Bunu Seçin.`,
                    value: 'delete2',
                    emoji: '⚙️'
                }
            ])
    );

const addMemberButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('addMember')
            .setLabel('Üye Ekle')
            .setStyle(ButtonStyle.Primary)
    );

var serverIcon = interaction.guild.iconURL({ dynamic: true });

let DejaUnChannel = await interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);

if (interaction.customId === "del") {
    if (interaction.values[0] == "delete2") {
        if (interaction.member.roles.cache.has(config.yetkiliekibi)) return interaction.reply({ content: `**Sen Yetkilisin, Bırak Adam Kapatsın :)**`, ephemeral: true });

        interaction.channel.permissionOverwrites.edit(interaction.member, {
            SendMessages: false,
            ViewChannel: false,
        });

        const kendiçözdü = new EmbedBuilder()
            .setDescription(`**${interaction.member} Sorununu Kendi Çözdüğünü Söyledi.** \n\n __${interaction.user.tag}'a Kanalı Görmeyi ve Yazmayı Kapattım!__`)
            .setAuthor({ name: `${interaction.member.displayName}`, iconURL: `${interaction.member.displayAvatarURL()}` })
            .setThumbnail(`${interaction.member.displayAvatarURL()}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
        await interaction.reply({ embeds: [kendiçözdü], content: `<@&${config.yetkiliekibi}>` });
    }

    if (interaction.values[0] == "delete") {
        const yetkinyok = new EmbedBuilder()
            .setDescription(`**Kanalı Sadece <@&${config.yetkiliekibi}> Kapatabilir.**`)
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
        if (!interaction.member.roles.cache.has(config.yetkiliekibi)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        const channel = interaction.channel;
        interaction.channel.messages.fetch().then(async (messages) => {
            const Coin = require('./src/models/coin');

            let userID = interaction.member.id;
            const puan = 1;

            let coin = await Coin.findOne({ userID });

            if (!coin) {
                coin = new Coin({ userID, coins: puan });
            } else {
                coin.coins += puan;
            }

            await coin.save();

            try {
                const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('tr-TR')} - **${m.author.tag}:** *${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}*`).join('\n');
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `Ticket Adı: ${interaction.channel.name}`, iconURL: `${sunucuiconurl}` })
                    .setDescription(`> **Ticket Mesajları Aşağıdadır;**\n\n ${output} \n\n **Ticket'ı Kapatan Yetkili ${interaction.user}** \n\n **${interaction.user} Adlı Yetkilinin Ticket Puanı:** __${coin.coins}__`)
                    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
                await client.channels.cache.get(ticketlogu).send(
                    { embeds: [embed], content: `**----------------------------------------------------------**` }
                );

                channel.delete();

            } catch (err) {
                const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('tr-TR')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

                const atc = new AttachmentBuilder(Buffer.from(output), { name: 'hawklog.txt' });

                const embed = new EmbedBuilder()
                    .setAuthor({ name: `Ticket Adı: ${interaction.channel.name}`, iconURL: `${sunucuiconurl}` })
                    .setDescription(`> **Ticket Mesajları Aşağıdadır;**\n\n MESAJLAR ÇOK UZUN OLDUĞUNDAN ALINAMADI BU YÜZDEN TXT OLARAK YOLLADIM! \n\n **Ticket'ı Kapatan Yetkili ${interaction.user}** \n\n **${interaction.user} Adlı Yetkilinin Ticket Puanı:** __${coin.coins}__`)
                    .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });

                client.channels.cache.get(ticketlogu).send({ files: [atc], content: `**----------------------------------------------------------**`, embeds: [embed] });
                channel.delete();
            }
        });
    }
}

if (interaction.values[0] == "Sıfırla") {
    interaction.update({});
    return;
}

if (interaction.customId == "select") {
    if (DejaUnChannel) return interaction.reply({ content: '**❌ Zaten Bir Ticket Talebin Açık.**', ephemeral: true });
    if (interaction.values[0] == "other") {
        await interaction.guild.channels.create({
            type: ChannelType.GuildText,
            name: `ticket-${interaction.user.username}`,
            topic: `${interaction.user.id}`,
            parent: `${ticketkategori}`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: config.yetkiliekibi,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                }
            ]
        }).then((c) => {
            const partenariat = new EmbedBuilder()
                .setTitle(`${diğerkategorileremoji}  Diğer Kategoriler Hakkında Ticket Açtı!`)
                .setDescription('Yaşadığınız Sorunu Anlatır Mısınız?, Resim, Video Atabilirsiniz.')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
            c.send({ embeds: [partenariat], content: `<@&${config.yetkiliekibi}> | ${interaction.user}`, components: [row, addMemberButton] });
            interaction.reply({ content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`, ephemeral: true });
        });
    } else if (interaction.values[0] == "general") {
        await interaction.guild.channels.create({
            type: ChannelType.GuildText,
            name: `ticket-${interaction.user.username}`,
            topic: `${interaction.user.id}`,
            parent: `${ticketkategori}`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: config.yetkiliekibi,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                }
            ]
        }).then((c) => {
            const plainte = new EmbedBuilder()
                .setTitle(`${destekemoji} Destek, Bug & Teknik Sorunlar Hakkında Ticket Açtı!`)
                .setDescription('Yaşadığınız Sorunu Anlatır Mısınız?, Resim, Video Atabilirsiniz.')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
            c.send({ embeds: [plainte], content: `<@&${config.yetkiliekibi}> | ${interaction.user}`, components: [row, addMemberButton] });
            interaction.reply({ content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`, ephemeral: true });
        });
    } else if (interaction.values[0] == "shopping") {
        await interaction.guild.channels.create({
            type: ChannelType.GuildText,
            name: `ticket-${interaction.user.username}`,
            topic: `${interaction.user.id}`,
            parent: `${ticketkategori}`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: config.yetkiliekibi,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                }
            ]
        }).then((c) => {
            const embed = new EmbedBuilder()
                .setTitle(`${donatemoji}  Donate Alımlar & Ödemeler Hakkında Ticket Açtı!`)
                .setDescription('Yetkililer Yazmadan Önce, Detaylı Bilgi Vererek Anlatabilirsin Veya Bekleyebilirsin.')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
            c.send({ embeds: [embed], content: `<@&${config.yetkiliekibi}> | ${interaction.user}`, components: [row, addMemberButton] });
            interaction.reply({ content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`, ephemeral: true });
        });
    } else if (interaction.values[0] == "staff") {
        await interaction.guild.channels.create({
            type: ChannelType.GuildText,
            name: `ticket-${interaction.user.username}`,
            topic: `${interaction.user.id}`,
            parent: `${ticketkategori}`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: config.yetkiliekibi,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                }
            ]
        }).then((c) => {
            const plainte = new EmbedBuilder()
                .setTitle(`${oyuniçisorunemoji}  Oyun içi Sorunlar & Rol Hataları Hakkında Ticket Açtı!`)
                .setDescription('Oyun içi Sorunlar & Rol Hataları Olarak Ne Yaşadınız ?')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
            c.send({ embeds: [plainte], content: `<@&${config.yetkiliekibi}> | ${interaction.user}`, components: [row, addMemberButton] });
            interaction.reply({ content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`, ephemeral: true });
        });
    } else if (interaction.values[0] == "donate") {
        await interaction.guild.channels.create({
            type: ChannelType.GuildText,
            name: `ticket-${interaction.user.username}`,
            topic: `${interaction.user.id}`,
            parent: `${ticketkategori}`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles]
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: `${config.yetkiliekibi}`,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages]
                }
            ]
        }).then((c) => {
            const plainte = new EmbedBuilder()
                .setTitle(`${oyuniçisorunemoji}  Donate Satın Alım & Sorunlar Hakkında Ticket Açtı!`)
                .setDescription('Almak İstediğiniz veya Sorunuz Varsa İlgili Donate ile Bilgi Veriniz.')
                .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` });
            c.send({ embeds: [plainte], content: `<@&${config.yetkiliekibi}> | ${interaction.user}`, components: [row, addMemberButton] });
            interaction.reply({ content: `**✔️ Merhaba! Ticket Oluşturma Talebin Başarıyla Alındı! Kanal:** <#${c.id}>`, ephemeral: true });
        });
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'addMember') {
        // Yetkililik kontrolü
        if (!interaction.member.roles.cache.has(config.yetkiliekibi)) {
            return interaction.reply({ content: 'Bu butonu kullanma yetkiniz yok.', ephemeral: true });
        }

        const modal = new ModalBuilder()
            .setCustomId('addMemberModal')
            .setTitle('Üye Ekle')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('memberId')
                        .setLabel('Eklemek istediğiniz üyenin ID\'sini girin')
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)
                )
            );

        await interaction.showModal(modal);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'addMemberModal') {
        const memberId = interaction.fields.getTextInputValue('memberId');
        const member = await interaction.guild.members.fetch(memberId).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'Geçersiz üye ID\'si. Lütfen tekrar deneyin.', ephemeral: true });
        }

        await interaction.channel.permissionOverwrites.edit(member, {
            ViewChannel: true,
            SendMessages: true,
            AttachFiles: true
        });

        interaction.reply({ content: `${member} kanala eklendi!`, ephemeral: true });
    }
})
});






	  client.on('guildMemberRemove', async member => {
		if(member.roles.cache.has(whitelistpermi))
		{

			const log5 = client.channels.cache.get(whitelistçıkışlog);
			const exampleEmbed = new EmbedBuilder()
	.setThumbnail(member.displayAvatarURL())
	.setColor(renk)
	.setAuthor({ name: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setDescription(`**${member} Adlı Kişi Sunucumuzdan Ayrıldı.** \n\n **Kullanıcının ID'si : **${member.id}`)
	.setTimestamp()
	.setFooter({ text: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})

	log5.send({content: ``, embeds: [exampleEmbed]}); 
		}
		else return;

	  })

	  client.on("guildMemberAdd", async member => {

		const kayıtsızrol = member.guild.roles.cache.get(`1227269077488373861`)

		if(!kayıtsızrol) return console.log(`Kayıtsız Rolü Silinmiş! (Hawk Development)`)

		await member.roles.add(kayıtsızrol)
	  
	  })

	  client.on("guildMemberAdd", async member => {
    
		if (member.user.bot) return;


			let date = moment(member.user.createdAt)
		   const startedAt = Date.parse(date);
		   var msecs = Math.abs(new Date() - startedAt);
			 
		   const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
		   msecs -= years * 1000 * 60 * 60 * 24 * 365;
		   const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
		   msecs -= months * 1000 * 60 * 60 * 24 * 30;
		   const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
		   msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
		   const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
		   msecs -= days * 1000 * 60 * 60 * 24;
		   const hours = Math.floor(msecs / (1000 * 60 * 60));
		   msecs -= hours * 1000 * 60 * 60;
		   const mins = Math.floor((msecs / (1000 * 60)));
		   msecs -= mins * 1000 * 60;
		   const secs = Math.floor(msecs / 1000);
		   msecs -= secs * 1000;
			 
		   var string = "";
		   if (years > 0) string += `${years} yıl ${months} ay`
		   else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
		   else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
		   else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
		   else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
		   else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
		   else if (secs > 0) string += `${secs} saniye`

			 
		   string = string.trim();
	   
		   const log3 = client.channels.cache.get(`${hoşgeldinizlog}`);
		   let endAt = member.user.createdAt
		   let gün = moment(new Date(endAt).toISOString()).format('DD')
		   let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
		   let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
		   let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
		   let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
		
	const exampleEmbed = new EmbedBuilder()
	.setThumbnail(member.displayAvatarURL())
	.setColor(renk)
	.setDescription(`**Sunucumuza hoş geldin!** ${member} \n\n **Kuruluş Tarihi:** \`${kuruluş} (${string})\` önce oluşturulmuş. \n\n **Mülakata Girmeye Hazır Olduğunda <#${sesbildirimlogu}> Kanal'ına Giriş Yaparsan,\n\n <@&${yetkiliekibi}> Sizinle İlgilenecektir.** \n\n **Kişinin ID =** ${member.id}**`)
	.setImage(`${sunucubanner}`)
	.setTimestamp()
	.setFooter({ text: `${member.guild.name}`, iconURL: `${sunucuiconurl}`})
	 

	log3.send({ embeds: [exampleEmbed]});
		
		   
	});


	client.on("voiceStateUpdate", (oldState, newState) => {

		const state = newState || oldState

		if(state.channelId !== `${sesbildirimlogu}`) {
			return;
					}

		const kanal = client.channels.cache.get(sesbildirimlogu);
		const log = client.channels.cache.get(sesbildirimtextkanal)

	

		if (oldState.channel && !newState.channel) return 

		if (oldState.channel && oldState.selfMute && !newState.selfMute) return 
		if (oldState.channel && !oldState.selfMute && newState.selfMute) return 
		if (oldState.channel && oldState.selfDeaf && !newState.selfDeaf) return 
		if (oldState.channel && !oldState.selfDeaf && newState.selfDeaf) return 
		if (oldState.channel && !oldState.streaming && newState.channel && newState.streaming) return 
		if (oldState.channel && oldState.streaming && newState.channel && !newState.streaming) return 
		if (oldState.channel && !oldState.selfVideo && newState.channel && newState.selfVideo) return 
		if (oldState.channel && oldState.selfVideo && newState.channel && !newState.selfVideo) return 


		
		const embed = new EmbedBuilder()
		.setAuthor({name: `${newState.member.displayName}`, iconURL: `${newState.member.displayAvatarURL()}`})
		.setDescription(`**${newState.member} Adlı Kişi Kanala Giriş Yaptı! \n\n ID:** ${newState.member.id}`)
		.setTimestamp()
		.setColor(renk)
		.setFooter({text: `Girilen Kanal: [${kanal.name}]`, iconURL: `${newState.member.displayAvatarURL()}`})

		log.send({embeds: [embed], content: `<@&${yetkiliekibi}> `})
	
	

	
	
	})




	client.on("interactionCreate", async interaction => {
		if (interaction.customId  == "kayıtbuton1") {
			let süre = await db2.get(`butontıklama_${interaction.user.id}`)
				console.log(süre)
				let timeout = 1000 * 60 * 60;

if (süre !== null && (Date.now() - süre) < timeout) {
  let remainingTime = timeout - (Date.now() - süre);
  let minutes = Math.floor(remainingTime / (1000 * 60)); 

  return interaction.reply({ content: `> **Tekrar Yetkililere Bildirim Göndermek İçin Kalan Süre: __${minutes} Dakika__**`, ephemeral: true });
}
	
	
			if(!interaction.member.roles.cache.has(whitelistpermi)) //WH ROLÜ
			{
				var serverIcon = interaction.guild.iconURL({dynamic: true});

	
			client.channels.cache.get(sesbildirimtextkanal).send(`${interaction.member} **Adlı Kişi Butona Bastı! Mülakatta Kayıt İçin Sizi Bekliyor. <@&${yetkiliekibi}> **`)  // Yetkibi Ekibi rolü
	

			const kayıtmesaj = new EmbedBuilder()
			.setTitle(`${interaction.guild.name}`)
			.setDescription(`**Yetkililere bildirimin gönderildi!**\n Merhaba Hoşgeldin! ${interaction.member}\n Bu Sırada Mülakat Kanalına Geçiş Sağlayıp Bekleyebilirsin. \n **-->** <#${sesbildirimlogu}>`)
			.setThumbnail(`${sunucubanner}`)
			.setTimestamp()
			.setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

				 interaction.reply({ embeds: [kayıtmesaj], ephemeral: true });
	
				 
	
			   	 db2.set(`butontıklama_${interaction.user.id}`,Date.now());
			}
			if(interaction.member.roles.cache.has(whitelistpermi))
			return interaction.reply({content:`**Sen zaten kayıtlısın, yetkililere bildirim gönderemezsin!**`,ephemeral:true})
			 
		}            
	});
	
	client.on("messageCreate", async message => {
		if (message.content.toLowerCase() === '!!!!!!!!!!!---------------------------------***buttttttttonnnnnnnnnnnnn') {
		   // if (!message.member.permissions.has("ADMINISTRATOR")) return
		   const kayıtbutonu1 = new ActionRowBuilder()
		   .addComponents(
			new ButtonBuilder()
			.setCustomId("kayıtbuton1")
			.setLabel('Mülakattayım')
			.setEmoji(emoji)
			.setStyle(ButtonStyle.Danger)
		   )
	
		   let embed = new EmbedBuilder()
		   .setColor(renk)
		   .setTitle("Mülakatta Bekliyorsan Butona Tıkla!")
		   .setDescription(`● Öncelikle **${message.guild.name}** Oyuncuları Olmak İçin Hoş Geldiniz. Sizleri Aramızda Görmekten Mutluluk Duyuyoruz.

		   ● Siz Değerli Oyuncularımız İçin En Kaliteli ve Güzel Bir Sunucu Ortamı Kurmaktayız.
		   		   
		   ● Sunucumuz Sosyal Rol Ağırlıklı Olucaktır.(Siz Değerli Oyuncularımız İçin!).
		   
		   ● Mülakatları Geçmek İçin +18 Yaş Ve Kaliteli Rol Bilgisine Sahip Olmanız Gerekmektedir.
		   
		   ● En Kaliteli Roller Ve Anlayışlı Yönetim Ekibimiz Sayesinde Sizi Memnun Etmeyeceğimize Dair Bir Kuşkunuz Kesinlikle Olmasın.
		   
		   ● Oluşan Sorunlarda Hızlı Ve Doğru Kararlar İle İlerlemekteyiz.`)
		   .setImage(`${sunucubanner}`)
		   message.channel.send({content:"||@everyone|| **&** ||@here||", embeds: [embed], components: [ kayıtbutonu1 ]});
		   
		   } });




client.on('messageDelete', async message => {
	if (message.channel.type === 1) {
		return;
	  }

	const { guild, author, content, channel } = message;
  
	const logChannel = guild.channels.cache.get(`${config.mesajlog}`); 
  
	const botUser = await client.users.fetch(`${config.botid}`)


try {
	
    if (message.author === botUser) {
		return;
	  }
  
	  if (author) {
		const user = author.username + '#' + author.discriminator;
  
		const embed = new EmbedBuilder()
		.setAuthor({name: `${message.guild.name}`, iconURL: `${sunucuiconurl}`})
		.setTitle(`Kullanıcı Belirtilen Kanalda Mesaj Sildi!`)
		.setDescription(`> **${message.member}** Tarafından Mesaj Silindi.\n> \n> **Kanal:** <#${channel.id}>\n> \n> **Silinen Mesaj:** ${content} \n> \n> **Kanal ID:** ${channel.id}\n> \n> **Silen Kişi ID:** ${message.member.id} / ${user}`)
		.setThumbnail(`${message.member.displayAvatarURL()}`) 
		.setFooter({text: `${message.member.displayName}`, iconURL: `${message.member.displayAvatarURL()}`}) 
		.setTimestamp()
		.setColor('#000000')
		logChannel.send({embeds: [embed]});
	  } else {
		return;
	  }

} catch (error) {
	const embed2 = new EmbedBuilder()
	.setTitle(`Kullanıcı Belirtilen Kanalda Mesaj Sildi!`)
	.setAuthor({name: `${message.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setColor("#000000")
	.setDescription(`> **Bir Sorun Oluştu Yazıları Alamadım!**`)
	.setTimestamp();

	const logChannel2 = guild.channels.cache.get(`${config.mesajlog}`); 

	if (!logChannel2) return;

	logChannel2.send({ embeds: [embed2] });
}


  });


  client.on("messageUpdate", (oldMessage, newMessage) => {
	if (oldMessage.channel.type === 1) {
		return;
	  }

	  if (newMessage.channel.type === 1) {
		return;
	  }

	const { guild, author, content, channel } = oldMessage;

	const logChannel = guild.channels.cache.get(`${config.mesajlog}`); 
	if (!logChannel) return;

try {
	if(oldMessage.member === client.user && newMessage.member === client.user) return;

	if(oldMessage.author.bot && newMessage.author.bot) return;

	const user = oldMessage.author

	const embed = new EmbedBuilder()
	  .setTitle("Kullanıcı Belirtilen Kanalda Mesaj Düzenledi!")
	  .setAuthor({name: `${oldMessage.guild.name}`, iconURL: `${sunucuiconurl}`})
	  .setColor("#000000")
	  .setThumbnail(`${oldMessage.member.displayAvatarURL()}`) 
	  .setDescription(`> **Kullanıcı:** ${oldMessage.author} \n> \n> **Düzenlenen Kanal:** <#${channel.id}>\n> \n> **Önceki Mesajı:** ${oldMessage.content} \n> \n> **Yeni Mesaj:** ${newMessage.content}\n> \n> **Silen Kişi ID:** ${oldMessage.member.id} / ${oldMessage.author.tag}`)
	  .setFooter({text: `${oldMessage.member.displayName}`, iconURL: `${oldMessage.member.displayAvatarURL()}`}) 
	  .setTimestamp();
  
	logChannel.send({ embeds: [embed] });
} catch (error) {
	const embed2 = new EmbedBuilder()
	.setTitle("Kullanıcı Belirtilen Kanalda Mesaj Düzenledi!")
	.setAuthor({name: `${oldMessage.guild.name}`, iconURL: `${sunucuiconurl}`})
	.setColor("#000000")
	.setDescription(`> **Bir Sorun Oluştu Yazıları Alamadım!**`)
	.setTimestamp();

	const logChannel2 = guild.channels.cache.get(`${config.mesajlog}`); 

	if (!logChannel2) return;

	logChannel2.send({ embeds: [embed2] });

}


	
  });



	client.on("voiceStateUpdate", (oldState, newState) => {

        const log = client.channels.cache.get(sesdeğiştirmelog);
        if (!log) return;
        if (!oldState.channel && newState.channel) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanala girdi!`);
        if (oldState.channel && !newState.channel) return log.send(`${newState.member.displayName} kullanıcısı \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`);
        if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return log.send(`${newState.member.displayName} kullanıcısı ses kanalını değiştirdi! (\`${oldState.channel.name}\` => \`${newState.channel.name}\`)`);
        if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`);
        if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`);
        if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`);
        if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`);
        if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`)
        if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`)
        if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`)
        if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return log.send(`${newState.member.displayName} kullanıcısı \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`)
    
    module.exports.conf = {
        name: "voiceStateUpdate"
    }
    });







	let cooldown2 = new Set();

	client.on("messageCreate", async message => {
	  if (message.channel.type === "DM") return;
	  
	  let data = ["sa", "Sa", "S.a", "s.a", "s.A", "S.A", "sA", "SA", "sea", "Sea", "SEA", "Selamün Aleyküm", "selamün aleyküm", "Selamun Aleykum", "selamun aleykum", "Selamun Aleyküm", "selamun aleykum"];
	  if (data.includes(message.content)) {
		if (cooldown2.has(message.author.id)) return message.delete(); 
		
		cooldown2.add(message.author.id); 
		setTimeout(() => {
		  cooldown2.delete(message.author.id); 
		}, 30000); 
		
		message.reply("**Aleyküm Selam!**");
	  }
	});


	const { Modal, TextInputComponent, showModal } = require('discord-modals') 
	const discordModals = require('discord-modals') 
	discordModals(client); 
	
	
	
	const nrcmodal = new Modal() 
	.setCustomId('narcos-botlist')
	.setTitle(`${config.sunucuismi} Staff Başvuru Formu`)
	.addComponents(
	  new TextInputComponent() 
	  .setCustomId('bot-id')
	  .setLabel('Neden Staff Olmak İstiyorsunuz?')
	  .setStyle('LONG') 
	  .setMinLength(1)
	  .setMaxLength(100)
	  .setPlaceholder('Neden Olmanız Gerektiğini Yazınız.')
	  .setRequired(true)
	)
	.addComponents(
		new TextInputComponent() 
		.setCustomId('bot-yas')
		.setLabel('Yaşınız ?')
		.setStyle('LONG') 
		.setMinLength(1)
		.setMaxLength(50)
		.setPlaceholder('Yaşınızı Yazınız.')
		.setRequired(true)
	  )
	.addComponents(
		new TextInputComponent() 
		.setCustomId('bot-prefix')
		.setLabel('Daha Önce Yetkilik Yaptınız Mı?')
		.setStyle('LONG') 
		.setMinLength(1)
		.setMaxLength(100)
		.setPlaceholder('Yaptıysaınz Hangi Sunucu ve Rütbe Yazınız..')
		.setRequired(true)
	  )
	  .addComponents(
		new TextInputComponent() 
		.setCustomId('bot-destek')
		.setLabel('Destek Kanalında Tartışma Var Naparsınız?')
		.setStyle('LONG') 
		.setMaxLength(100)
		.setMinLength(1)
		.setPlaceholder('Ne Yapmanız Gerektiğini Yazınız.')
		.setRequired(true)
	  )
	  .addComponents(
		new TextInputComponent() 
		.setCustomId('bot-hakkinda')
		.setLabel('Ek Olarak Eklicekleriniz.')
		.setMaxLength(100)
		.setStyle('LONG') 
		.setPlaceholder('Size Yetkilik Süresi Boyunca + Puan Katabilir.')
	  );
	
	
	client.on('interactionCreate', async (interaction) => {
	
		if(interaction.customId === "bot-başvuru"){
			showModal(nrcmodal, {
				client: client, 
				interaction: interaction 
			  })
		}
	
		if(interaction.customId === "botonay"){		
			let sahip = db2.fetch(`onay-red-mesaj_${interaction.message.id}`)
			let botid = db2.fetch(`bot_id_${sahip}`)
	
			const embed = new EmbedBuilder()
			.setColor(renk)
				.setDescription(`
			**${botid}** Başvuru Onaylandı.
			**Onaylayan Yetkili:** <@${interaction.user.id}> (${interaction.user.id})
			`)
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('onaylandı')
			.setLabel('Başvuru Onaylandı.')
			.setStyle(ButtonStyle.Success)
			.setDisabled(true)
			
			);
			await interaction.update({ embeds: [embed] , components: [row] });
			db2.delete(`onay-red-mesaj_${interaction.message.id}`)
			db2.delete(`bot_bilgi_${botid}`)
			db2.delete(`bot_${botid}`)
			db2.delete(`bot_id_${sahip}`)
		
	
		}
	
	});

		  const { joinVoiceChannel } = require('@discordjs/voice');
		  client.on('ready', () => {
			let channel = client.channels.cache.get(`${botbağlanmases}`) 
			
		  
			if(!channel) return;

				const VoiceConnection = joinVoiceChannel({
					channelId: channel.id, 
					guildId: channel.guild.id,
					adapterCreator: channel.guild.voiceAdapterCreator 
			});
		  })


	client.on("messageCreate", async (message) => {
		if (message.channel.id !== `${oyundankareler}`) { 
		  return;
		}
		let owner = await message.guild.fetchOwner()
		if (message.author === client.user) return;
		if(message.content.includes("https://media.discordapp.net/attachments/")) return;
		if (message.attachments.size < 1) {
		  message.delete()
		  message.channel.send(`**${message.author} Bu Kanalda Resim Dışında Başka Bir Şey Atılmıyor!**`)
		  .then(msg => {
			setTimeout(() => msg.delete(), 10000)
		  })
		  .catch(console.error);
		}
	  });

	

	client.on('modalSubmit',async (modal) => {
	
		
	
		if(modal.customId === 'narcos-botlist'){
			const botid = modal.getTextInputValue('bot-id')
			const botprefix = modal.getTextInputValue('bot-prefix')
			const topgg = modal.getTextInputValue('bot-onay')
			const aciklama = modal.getTextInputValue('bot-hakkinda')
			const botdestek = modal.getTextInputValue('bot-destek')
			const botyas = modal.getTextInputValue('bot-yas')

			let kontrol = db2.fetch(`bot_id_${modal.user.id}`)
			await modal.deferReply({ ephemeral: true })
			if(kontrol) return  modal.followUp({ content: `Zaten Başvuru Yapmışsın Onaylanmasını Bekleyiniz.`, ephemeral: true })
			db2.set(`bot_id_${modal.user.id}`, botid)
			db2.set(`bot_${botid}`, modal.user.id)
			db2.set(`bot_bilgi_${botid}`, [])
			db2.push(`bot_bilgi_${botid}`, botprefix)
			db2.push(`bot_bilgi_${botid}`, topgg)
			db2.push(`bot_bilgi_${botid}`, botdestek)
			db2.push(`bot_bilgi_${botid}`, botyas)

			db2.push(`bot_bilgi_${botid}`, aciklama ? aciklama : "açıklama bulunamadı")
			modal.followUp({ content: `**Başarılı Bir Şekilde Staff Başvurun Gönderildi.**`, ephemeral: true })
	
			const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('botonay')
			.setLabel('Başvuruyu Onayla! (Kabul Ediceksen, Adama Özelden Mesaj Yaz.)')
			.setStyle(ButtonStyle.Success),		
		
			);

			const embed = new EmbedBuilder()
			.setColor(renk)
			.setDescription(`
			> **Staff Başvurusu Bilgileri;**\n
			**Neden Staff Olmak İstiyorsunuz? :** \`\`\`\ ${botid}\`\`\`\
			**Daha Önce Yetkilik Yaptınız Mı? (Yetkilide Hedefleriniz Neler?) :** \`\`\`\ ${botprefix}\`\`\`\
			**Yaşınız ?:** \`\`\`\ ${botyas} \`\`\`\
			**Destek Kanalında Tartışma Var Ne Yapardınız ?:** \`\`\`\ ${botdestek}\`\`\`\
			**Ek Açıklama;**
			\`\`\`\ ${aciklama ? aciklama: "Açıklama Bulunamadı."} \`\`\`\
	
			> **Başvuru Gönderen Kullanıcı Bilgileri;**
	
			**İD:** \`${modal.user.id} ${modal.user.username}\`
			**Etiket:** <@${modal.user.id}>
			`)
			.setImage(`${sunucubanner}`)


			try {
				const embed5 = new EmbedBuilder()
				.setColor(renk)
				.setAuthor({name: `${config.sunucuismi}`, iconURL: `${sunucubanner}`})
				.setDescription(`**Başarıyla Yetkili Başvuru Formunu Aldım, Bize Katılmak İstediğin İçin Teşekkürler, En Kısa Zamanda Sana Dönüş Yapıcağız!**`)
				modal.user.send({embeds: [embed5]})

				modal.guild.members.cache.filter(member => member.roles.cache.has(`${config.banhammer}`)).forEach(member => {			
				  member.send({embeds:[embed],components: [row]}).then(c => {
					  db2.set(`onay-red-mesaj_${c.id}`, modal.user.id)
				  })
	

			  });
			} catch (error) {
				return
			  }
		
		  
		}  
	  })








const { AuditLogEvent } = require('discord.js');


		client.on("guildMemberUpdate", (oldMember, newMember) => {
			const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
			const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
			
		  
			let botid = `${config.botid}`
			let rolkanalid = config.rollogu




			if(newMember.id === `${botid}` && oldMember.id === `${botid}`) return; //Bot ID'si 

			addedRoles.forEach(role => {
			  const auditLogEntry = newMember.guild.fetchAuditLogs({
				type: AuditLogEvent.MemberRoleUpdate,
				limit: 1
			  }).then(logs => {
				const log = logs.entries.first();
				const executor = log.executor;
				if(executor.id === `${botid}`) return;
				const embed = new EmbedBuilder()
				.setTitle("Kullanıcıya Rol Eklendi")
				.setAuthor({name: `${newMember.displayName}`, iconURL: `${newMember.displayAvatarURL()}`})
				.setImage(`${sunucubanner}`)
				.setThumbnail(`${newMember.displayAvatarURL()}`)
				.setColor(`Green`)
				.setDescription(`> **Verilen Kullanıcı Bilgileri:** ${newMember}\n \`\`\`${newMember.user.tag} / ${newMember.id}\`\`\`\n> **Verilen Rol ve Rol ID:** ${role} **/** ${role.id}\n> \n> **Veren Kişi Bilgileri:** ${executor} **/** ${executor.id}`)
				.setFooter({text: `Rolü Veren Kişi: ${executor.tag}`, iconURL: `${executor.displayAvatarURL()}`}) 
				newMember.guild.channels.cache.get(`${rolkanalid}`).send({ embeds: [embed] });
			  }).catch(console.error);
			});
		  
			removedRoles.forEach(role => {
			  const auditLogEntry = newMember.guild.fetchAuditLogs({
				type: AuditLogEvent.MemberRoleUpdate,
				limit: 1
			  }).then(logs => {
				const log = logs.entries.first();
				const executor = log.executor;
				if(executor.id === `${botid}`) return;
				const embed = new EmbedBuilder()
				  .setTitle("Kullanıcıdan Rol Alındı")
				  .setAuthor({name: `${newMember.displayName}`, iconURL: `${newMember.displayAvatarURL()}`})
				  .setImage(`${sunucubanner}`)
				  .setThumbnail(`${newMember.displayAvatarURL()}`)
				  .setColor(`#000000`)
				  .setDescription(`> **Alınan Kullanıcı Bilgileri:** ${newMember}\n \`\`\`${newMember.user.tag} / ${newMember.id}\`\`\`\n> **Alınan Rol ve Rol ID:** ${role} **/** ${role.id}\n> \n> **Alan Kişi Bilgileri:** ${executor} **/** ${executor.id}`)
				  .setFooter({text: `Rolü Alan Kişi: ${executor.tag}`, iconURL: `${executor.displayAvatarURL()}`}) 
				newMember.guild.channels.cache.get(`${rolkanalid}`).send({ embeds: [embed] });
			  }).catch(console.error);
			});
		  });





		  const VoiceStatModel = require('./src/models/VoiceStatModel');
const { exec } = require("child_process");

const voiceStats = {};

client.on('voiceStateUpdate', async (oldState, newState) => {
  const guildId = newState.guild.id;
  const userId = newState.member.user.id;
  const voiceChannel = newState.channel;

  const roleId = `${yetkiliekibi}`; 

  if (newState.member.roles.cache.has(roleId)) {
    if (voiceChannel) {
      console.log(`${newState.member} Sesli Kanala Katıldı!`)
      const startTime = moment();
      await VoiceStatModel.updateOne(
        { userId },
        { $setOnInsert: { userId }, $inc: { duration: 0 } },
        { upsert: true }
      );
      voiceStats[userId] = startTime;
    } else {
      console.log(`${newState.member} Sesli Kanaldan Ayrıldı!`)

      // Kullanıcı bir sesli kanaldan ayrıldı
      const endTime = moment();
      const startTime = voiceStats[userId];
      if (startTime) {
        const duration = endTime.diff(startTime, 'seconds');
        await VoiceStatModel.updateOne(
          { userId },
          { $inc: { duration } }
        );
        delete voiceStats[userId];
      }
    }
  }
});
		  

//////    SUNUCUYA GIRENLERIN ISIMLERINI DEGISTIRME   \\\\\\\\\

client.on('guildMemberAdd', async (member) => {
    const icIsim = "IC ISIM";
    const oocIsim = "OOC ISIM";
    const yeniIsim = `${icIsim} | ${oocIsim}`;
    const welcomeLogChannel = member.guild.channels.cache.get(hoşgeldinizlog);

    try {
        await member.setNickname(yeniIsim);
        console.log(`${member.user.tag} isimli kullanıcının ismi "${yeniIsim}" olarak değiştirildi.`);
    } catch (error) {
        console.error(`${member.user.tag} isimli kullanıcının ismi değiştirilemedi. Hata: ${error}`);
        if (welcomeLogChannel) {
            welcomeLogChannel.send(`${member.user.tag} isimli kullanıcının ismi değiştirilemedi. Hata: ${error}`);
        }
    }
});



client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    // Kullanıcının ses kanalına katıldığını kontrol et
    if (oldState.channelId !== config.destekkanali && newState.channelId === config.destekkanali) {
        const destekduyuru = config.destekduyuru; // Bildirimin gönderileceği kanalın ID'si
        const yetkiliekibi = config.yetkiliekibi; // Etiketlenecek rolün ID'si
        
        const announcementChannel = newState.guild.channels.cache.get(destekduyuru);
        if (announcementChannel) {
            announcementChannel.send(
                `<@&${yetkiliekibi}> Destek odasında, destek bekleyen bir üye var!: <@${newState.member.id}>`
            );
        }
    }
});






client.login(token)
