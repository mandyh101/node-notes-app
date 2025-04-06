// code for the CLI
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'Note to be created'
    })
  }, (argv) =>{
    console.info(argv.note)
  })
  .option('tag', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note'
  })
  .demandCommand(1)
  .parse()