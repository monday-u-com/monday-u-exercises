import observe from 'inquirer/lib/utils/events.js';
import list from 'inquirer/lib/prompts/list.js'
import input from 'inquirer/lib/prompts/input.js'
import number from 'inquirer/lib/prompts/number.js'
import confirm from 'inquirer/lib/prompts/confirm.js'
import rawlist from 'inquirer/lib/prompts/rawlist.js'
import expand from 'inquirer/lib/prompts/expand.js'
import checkbox from 'inquirer/lib/prompts/checkbox.js'
import password from 'inquirer/lib/prompts/password.js'
import editor from 'inquirer/lib/prompts/editor.js'

const EVENT_INTERRUPTED_SYMBOL = Symbol('EVENT_INTERRUPTED_SYMBOL')

const rejectIfInterrupted = (event, hotkey, reject) => {
    if (event.key.name === hotkey) reject(InterruptedPrompt.EVENT_INTERRUPTED)
}

const InterruptedPrompt = {
    EVENT_INTERRUPTED: EVENT_INTERRUPTED_SYMBOL,
    from: (basePrompt) => {
        class IntrPrompt extends basePrompt {
            run(cb) {
                const intrKeyName = this.opt.interruptedKeyName || this.opt.interruptedKeyname || 'escape'
                return new Promise((resolve, reject) => {
                    const events = observe(this.rl);
                    events.keypress.pipe().forEach(e => rejectIfInterrupted(e, intrKeyName, reject));
                    super.run(cb).then(resolve, reject);
                })
            }
        }
        return IntrPrompt;
    },
    replaceAllDefaults: (inquirer) => {
        inquirer.registerPrompt('list', InterruptedPrompt.from(list));
        inquirer.registerPrompt('input', InterruptedPrompt.from(input));
        inquirer.registerPrompt('number', InterruptedPrompt.from(number));
        inquirer.registerPrompt('confirm', InterruptedPrompt.from(confirm));
        inquirer.registerPrompt('rawlist', InterruptedPrompt.from(rawlist));
        inquirer.registerPrompt('expand', InterruptedPrompt.from(expand));
        inquirer.registerPrompt('checkbox', InterruptedPrompt.from(checkbox));
        inquirer.registerPrompt('password', InterruptedPrompt.from(password));
        inquirer.registerPrompt('editor', InterruptedPrompt.from(editor));
    }
}



export { EVENT_INTERRUPTED_SYMBOL, InterruptedPrompt }