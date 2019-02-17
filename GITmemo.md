# GITmemo

git の機能やファイルを保持しておく、いわゆる備忘録。

## .gitignore

指定したファイルやディレクトリをレポジトリに入れない。  

* /directory , /file
  * .gitignoreのあるディレクトリ内の指定したディレクトリ、若しくはファイルを無視する
* directory , file
  * .gitignoreのあるディレクトリ**以下**の指定したディレクトリ、若しくはファイルを無視する
* directory/
  * .gitignore以下の指定したディレクトリを無視する
* !directory
  * 上の.gitignoreで無視したディレクトリ、ファイルを元に戻す
