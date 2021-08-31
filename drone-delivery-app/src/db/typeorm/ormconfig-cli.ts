/**
 * Arquivo para que o comando typeorm do cli.
 * O objetivo é exportar o objeto com as configurações já preparadas para o CLI ler.
 */
import * as config from './ormconfig';

export = config();
