import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  public Mensagem : String;

  db : SQLiteObject = null;
  constructor(private sqlite: SQLite) {
    console.log('Hello DbProvider Provider');
    this.Mensagem = "";
  }

  public getBanco(){

    this.Mensagem = this.Mensagem + "</br>Dentro do método Get";

    return this.sqlite.create(
      {
        name: 'data.db',
        location: 'default'
      }
    ).then((db: SQLiteObject)=> {
       this.Mensagem = this.Mensagem + "</br>O banco foi criado";
       this.db = db;
    });
  }

  public createBancoDeDados()
  {
    this.Mensagem = this.Mensagem + "</br>Antes GEt";
     this.getBanco();
     this.Mensagem = this.Mensagem + "</br>Apos Get";
     this.criarTabelaCategoria();
     this.Mensagem = this.Mensagem + "</br>Apos Criar Tabela";
  }

  private criarTabelaCategoria(){
    
     this.Mensagem = this.Mensagem + "</br>Vai criar a tabela";
     
     var comandoSQL = 'create table if not exists categoria (IdCategoria integer primary key autoincrement, Descricao varchar(100) not null)';
     console.log(comandoSQL);
     return this.db.executeSql(comandoSQL,{})
            .then(() => this.Mensagem = this.Mensagem + "</br>Tabela Criada")
            .catch(e => this.Mensagem = this.Mensagem + "</br>Erro" + e);
  }

  
}
