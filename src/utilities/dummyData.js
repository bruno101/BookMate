//Por enquanto supomos que o idioma nativo (para o qual se traduz) � o portugu�s
global.nativeLanguage = { name: "Portuguese", code: "pt"}

//Essa � uma lista hipot�tica de livros do usu�rio com seus dados para exibi��o
//Provavelmente vamos ter que armazenar um �ndice, o t�tulo, o autor, a capa, a uri (o caminho para onde o livro importado est� salvo) e as "locations" (conjunto de EpubCfis que determinam quais s�o as p�ginas do livro - uma EpubCfi � um c�digo que identifica um trecho do livro, usado para determinar o que deve ser exibido em uma p�gina)
global.bookIndex = [
    { bookKey: 1, title: "Swiss Fairy Tale", author: "William Elliot Griffis", srcBookCover: "https://www.gutenberg.org/cache/epub/69739/pg69739.cover.medium.jpg", uri: "", locations: {} },
    { bookKey: 2, title: "The Little Glass Vial", author: "Nick Carter", srcBookCover: "https://www.gutenberg.org/cache/epub/69735/pg69735.cover.medium.jpg", uri: "", locations: {} },
    { bookKey: 3, title: "Alice in Wonderland", author: "Lewis Carroll", srcBookCover: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg", uri: "", locations: {} }
]
