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
                        if (data.length > 0) {

                                ctx.telegram.sendMessage(ctx.chat.id, `That’s it! We’re going to the moon 🚀 \n\n 🚨 SPECIAL ANNOUNCEMENT! 🚨 \n\n Whitelist sales from Saturday 26th, 2022 @ 1.00 am EST \nJoin @ sales@dexberry.org \nOnly 1000 spots available! \nFirst come First served! \n\nFor Guaranteed spots, \nA. Join our discord server today! \nhttps://discord.gg/2sdPG4zXSW \nB. Level ⬆️ \nC. Contact @dexberrynetwork with wallet address.\n\n🚨 PLS NOTE! 🚨
                                Get your wallets Whitelisted before Feb 25th.`,{
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
                ctx.telegram.sendMessage(ctx.chat.id, `<b>Task 1:</b> \n\nA. Kindly Join our telegram group \nhttps://t.me/dexberry \n\nB. Type in group: “I want to be Whitelisted" \n\nC. Tap on “done” when completed`,{
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
                                        ctx.telegram.sendMessage(ctx.chat.id, `Please submit your wallet address`,{
                                                reply_markup:{
                                                        remove_keyboard: true
                                                },
                                                parse_mode: 'HTML'
                                        }).catch((e)=>ctx.reply("Something is wrong"))
                                        
                                        return ctx.wizard.next()

                             } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `Kindly join our telegram group`,{
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
                        wallet: address
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
                                ctx.telegram.sendMessage(ctx.chat.id, `That’s it! We’re going to the moon 🚀\n\n🚨 SPECIAL ANNOUNCEMENT! 🚨 \n\n Whitelist sales from Saturday 26th, 2022 @ 1.00 am EST \nJoin @ sales@dexberry.org \nOnly 1000 spots available! \nFirst come First served! \n\nFor Guaranteed spots, \nA. Join our discord server today! \nhttps://discord.gg/2sdPG4zXSW \nB. Level ⬆️ \nC. Contact @dexberrynetwork with wallet address.\n\n🚨 PLS NOTE! 🚨
                                Get your wallets Whitelisted before Feb 25th.`,{
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
                ctx.telegram.sendMessage(ctx.chat.id, `<b>任务1：</b> A. 请加入我们的电报群 \nhttps://t.me/dexberryChinese \n\nB. 输入组：“我想被列入白名单” \n\nC. 完成后点击“完成”
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
                                        ctx.telegram.sendMessage(ctx.chat.id, `请提交您的钱包地址`,{
                                                reply_markup:{
                                                        remove_keyboard: true
                                                },
                                                parse_mode: 'HTML'
                                        }).catch((e)=>ctx.reply("Something is wrong"))
                                        
                                        return ctx.wizard.next()

                        } else {
                                ctx.telegram.sendMessage(ctx.chat.id, `欢迎加入我们的电报群`,{
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
                        wallet: address
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
                                ctx.telegram.sendMessage(ctx.chat.id, `您已经提交了您的数据\n\n就是这样！我们要登月了 🚀 \n特别公告！\n从 2022 年 2 月 26 日星期六 @ 东部标准时间上午 1 点开始的销售白名单\n加入 @sales@dexberry.org \n只有 1000 个名额！ \n先到先得！ \n\n对于有保证的名额，\n今天就加入我们的 discord 服务器吧！ \nhttps://discord.gg/2sdPG4zXSW \nLevel ⬆️ \n联系@dexberrynetwork 并提供钱包地址。 \n\n请注意！在 2 月 25 日之前将您的钱包列入白名单。`,{
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

        if ( message == "I want to be Whitelisted" || message == "我想被列入白名单") {
                
                const data = new userModel({
                        userId: ctx.from.id,
                        name: ctx.from.first_name
                })
                data.save((e)=>console.log(e))
        }

})

// bot.launch()
module.exports = bot