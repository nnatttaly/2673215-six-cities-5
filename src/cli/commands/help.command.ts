import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(): Promise<void> {
    console.info(`
${chalk.magenta.bold('Программа для подготовки данных для REST API сервера.')}

${chalk.bold.underline('Пример:')} cli.js ${chalk.cyan('--command')} [${chalk.blue('--arguments')}]

${chalk.bold.underline('Команды:')}

    ${chalk.cyan('--version')}                     ${chalk.magenta('# выводит номер версии')}
    ${chalk.cyan('--help')}                        ${chalk.magenta('# печатает этот текст')}
    ${chalk.cyan('--import')} ${chalk.blue('<path>')}               ${chalk.magenta('# импортирует данные из TSV')}
    ${chalk.cyan('--generate')} ${chalk.blue('<n> <path> <url>')}   ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
`);
  }

}
