const rewards = {
  exp: 9000000000,
  money: 900000000,
  potion: 900000000,
  legendary: 9000000,
  mythic: 9000000000,
}
const cooldown = 86400000
let handler = async (m,{ conn} ) => {
  let user = global.db.data.users[m.qsender]
  if (new Date - user.lastclaim < cooldown) throw `You have already claimed this daily claim!, wait for *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  conn.sendButton(m.chat,'*––––––『 DAILY 』––––––*', text.trim(), null, [['Inventory', '.inv'], ['Weekly', '.weekly']],m)
  user.lastclaim = new Date * 1
}
handler.help = ['ownerclaim', 'oc']
handler.tags = ['owner']
handler.command = /^(ownerclaim)$/i
handler.owner = true

handler.cooldown = cooldown

export default handler
