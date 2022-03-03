const {Telegraf , Composer , WizardScene , Stage , session } = require('micro-bot')
const mongoose = require('mongoose')

const userModel = require('./userModel')

// const bot = new Telegraf('5270362344:AAF3M1d97iUdCFCzACGGl0eTU2_MiQNc78Q')
const bot = new Composer()

mongoose.connect('mongodb+srv://Dexberry1234:Dexberry1234@dexberrywhitelist.8fzh6.mongodb.net/dexberry',{useNewUrlParser:true,useUnifiedTopology:true}).catch((e)=>{
        console.log(e)
}).then((d)=>console.log('Database connected')).catch((e)=>console.log(e))

bot.use(session())

bot.start(ctx=>{

        userModel.find({userId: ctx.from.id},(e,data)=>{
                if (e) {
                        console.log(e)
                } else {
                        const finalData = data.length
                        if (finalData > 0) {

                                ctx.telegram.sendMessage(ctx.chat.id, `That’s it! We’re going to the moon 🚀 \n\n 🚨 SPECIAL ANNOUNCEMENT! 🚨 \n\n Whitelist sales from Saturday 26th, 2022 @ 1.00 am EST \nJoin @ sales@dexberry.org \nOnly 1000 spots available! \nFirst come First served! \n\nFor Guaranteed spots, \nA. Join our discord server today! \nhttps://discord.gg/2sdPG4zXSW \nB. Level ⬆️ \nC. Contact @dexberrynetwork with wallet address.\n\n🚨 PLS NOTE! 🚨 \nGet your wallets Whitelisted before Feb 25th.`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))  
                                
                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.chat.first_name} \nPlease choose a language...`,{
                                        reply_markup:{
                                                keyboard:[
                                                        [{text: "English"}],[{text: "中国人"}]
                                                ],
                                                resize_keyboard:true
                                        }
                                })
                        }
                }
        })
        
})







const enWizard = new WizardScene('en-wizard',

        (ctx)=>{
                ctx.session.user = {}
                ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 1:</b> \n\nPlease type your name and last-name \n\nC. Tap on “done” when completed`,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "Done"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },

        (ctx)=>{
                ctx.session.user.name = ctx.update.message.text

                ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 2:</b> \n\Kindly provide your email Address for updates \n\nC. Tap on “done” when completed`,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "Done"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },

        (ctx)=>{

                ctx.session.user.email = ctx.update.message.text

                ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 3:</b> \n\nA. Kindly Join our telegram group \nhttps://t.me/dexberry \n\nB. Type in group: “Whitelist"  ( non case sensitive) \n\nC. Tap on “done” when completed`,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "Done"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },
        (ctx)=>{

                userModel.find({userId: ctx.from.id}, (e,data)=>{
                        if (e) {
                             console.log(e)   
                        } else {
                             const count = data.length
                             if (count>0) {
                                        ctx.reply('Congratulations! You have been Whitelisted! \n\n')
                                        ctx.telegram.sendMessage(ctx.chat.id, `Please submit your wallet address`,{
                                                reply_markup:{
                                                        remove_keyboard: true
                                                },
                                                parse_mode: 'HTML'
                                        }).catch((e)=>ctx.reply("Something is wrong"))
                                        
                                        return ctx.wizard.next()

                             } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `Kindly join our telegram group \nhttps://t.me/dexberry`,{
                                        reply_markup:{
                                                keyboard: [
                                                        [{text: "Try again"}]
                                                ],
                                                resize_keyboard:true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))

                                return ctx.wizard.back()     
                             }   
                        }
                })
        },

        (ctx)=>{

                const address = ctx.update.message.text

                const dataUpdate = {
                        wallet: address,
                        input_name: ctx.session.user.name,
                        email: ctx.session.user.email
                }
                userModel.updateOne({userId: ctx.from.id},dataUpdate,(e,data)=>{
                        if (e) {
                             console.log(e)   
                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `Indicate BNB contribution amount`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))
                                
                                return ctx.wizard.next()
                        }
                })
        },

        (ctx)=>{
                const BNB = ctx.update.message.text

                const dataUpdate = {
                        BNB: BNB
                }
                userModel.updateOne({userId: ctx.from.id},dataUpdate,(e,data)=>{
                        if (e) {
                             console.log(e)   
                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `That’s it! We’re going to the moon 🚀 \n\n 🚨 SPECIAL ANNOUNCEMENT! 🚨 \n\n Whitelist sales from Saturday 26th, 2022 @ 1.00 am EST \nJoin @ sales@dexberry.org \nOnly 1000 spots available! \nFirst come First served! \n\nFor Guaranteed spots, \nA. Join our discord server today! \nhttps://discord.gg/2sdPG4zXSW \nB. Level ⬆️ \nC. Contact @dexberrynetwork with wallet address.\n\n🚨 PLS NOTE! 🚨 \nGet your wallets Whitelisted before Feb 25th.`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong")).then(()=>{return ctx.scene.leave()})
                                
                        }
                })

        }



)
















const cnWizard = new WizardScene('cn-wizard',
        (ctx)=>{

                ctx.session.user = {}

                ctx.telegram.sendMessage(ctx.chat.id, `<b>任务1：</b> 请输入您的姓名和姓氏 \n\nC. 完成后点击“完成”
                `,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "完成"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },
        (ctx)=>{

                ctx.session.user.name = ctx.update.message.text

                ctx.telegram.sendMessage(ctx.chat.id, `<b>任务2：</b> 请提供您的电子邮件地址以获取更新 \n\nC. 完成后点击“完成”
                `,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "完成"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },
        (ctx)=>{

                ctx.session.user.email = ctx.update.message.text

                ctx.telegram.sendMessage(ctx.chat.id, `<b>任务3：</b> A. 请加入我们的电报群 \nhttps://t.me/dexberryChinese \n\nB. 输入组：“白名单” \n\nC. 完成后点击“完成”
                `,{
                        reply_markup:{
                                keyboard: [
                                        [{text: "完成"}]
                                ],
                                resize_keyboard:true
                        },
                        parse_mode: 'HTML'
                }).catch((e)=>ctx.reply("Something is wrong"))

                return ctx.wizard.next()
                
        },
        (ctx)=>{

                userModel.find({userId: ctx.from.id}, (e,data)=>{
                        if (e) {
                        console.log(e)   
                        } else {
                        const count = data.length
                        if (count>0) {

                                ctx.reply('恭喜！您已被列入白名单！ \n\n')

                                ctx.telegram.sendMessage(ctx.chat.id, `请提交您的钱包地址`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))
                                
                                return ctx.wizard.next()

                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `欢迎加入我们的电报群 \nhttps://t.me/dexberryChinese`,{
                                        reply_markup:{
                                                keyboard: [
                                                        [{text: "再试一次"}]
                                                ],
                                                resize_keyboard:true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))

                                return ctx.wizard.back()     
                        }   
                        }
                })
        },

        (ctx)=>{

                const address = ctx.update.message.text

                const dataUpdate = {
                        wallet: address,
                        input_name : ctx.session.user.name,
                        email : ctx.session.user.email
                }
                userModel.updateOne({userId: ctx.from.id},dataUpdate,(e,data)=>{
                        if (e) {
                        console.log(e)   
                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `注明 BNB 供款金额`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong"))
                                
                                return ctx.wizard.next()
                        }
                })
        },

        (ctx)=>{
                const BNB = ctx.update.message.text

                const dataUpdate = {
                        BNB: BNB
                }
                userModel.updateOne({userId: ctx.from.id},dataUpdate,(e,data)=>{
                        if (e) {
                        console.log(e)   
                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `而已！我们要去月球🚀 \n\n 🚨 特别公告！ 🚨 \n\n 2022 年 2 月 26 日星期六 @ 东部标准时间上午 1 点开始的白名单销售 \n加入 @sales@dexberry.org \n只有 1000 个名额！ \n先到先得！ \n\n对于保证点，\nA。立即加入我们的不和谐服务器！ \nhttps://discord.gg/2sdPG4zXSW \nB。等级⬆️ \nC。联系@dexberrynetwork 并提供钱包地址。\n\n🚨 请注意！ 🚨 \n在 2 月 25 日之前将你的钱包列入白名单。`,{
                                        reply_markup:{
                                                remove_keyboard: true
                                        },
                                        parse_mode: 'HTML'
                                }).catch((e)=>ctx.reply("Something is wrong")).then(()=>{return ctx.scene.leave()})
                                
                        }
                })

        }
)

const stage = new Stage([enWizard,cnWizard])

bot.use(stage.middleware())

bot.hears('English', Stage.enter('en-wizard'))

bot.hears('中国人',Stage.enter('cn-wizard'))






bot.on('text',ctx=>{

        const message = ctx.update.message.text

        const r = /Whitelist/gi
        const c = /白名单/gi

        if ( message.match(r) || message.match(c) ) {


                userModel.find({userId: ctx.from.id}, (e,data)=>{
                        if (e) {
                             throw e;   
                        } else {
                            if (data.length > 0) {
                                    console.log("User Already Added")
                            } else {

                                const data = new userModel({
                                        userId: ctx.from.id,
                                        name: ctx.from.first_name,
                                        wallet: '0',
                                        BNB: '0'
                                })
                                data.save((e)=>console.log(e))
                            }    
                        }
                })
                
        }

})

// bot.launch()
module.exports = bot