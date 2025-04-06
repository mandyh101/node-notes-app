// code for the CLI
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      describe: 'The content of the note to create'
    })
  }, (argv) =>{
    console.info(argv.note)
  })
  .option('tag', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async(argv) => {
    // WIP
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      type: 'string',
      describe: 'The search term to filter notes.content by'
    })
  }, async(argv) => {
      //WIP
  })
  .command('remove', '<id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'string',
      describe: 'The id of the note to remove'
    })
  }, async(argv) => {
    //WIP
  })
  .command('web [port]', 'Launch the web interface to see notes', yargs => {
    return yargs.positional('port', {
      type: 'number',
      describe: 'The port to launch the web interface on',
      default: 5000,
    })
  }, async(argv) => {
    //WIP
  })
  .command('clean', 'Delete all notes', () => {}, async(argv) => {
    //WIP
  })
  .demandCommand(1)
  .parse()