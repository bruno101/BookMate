//Por enquanto supomos que o idioma nativo (para o qual se traduz) é o português
global.nativeLanguage = { name: "Portuguese", code: "pt"}

//Essa é uma lista hipotética de livros do usuário com seus dados para exibição
//Provavelmente vamos ter que armazenar um índice, o título, o autor, a capa, a uri (o caminho para onde o livro importado está salvo) e as "locations" (conjunto de EpubCfis que determinam quais são as páginas do livro - uma EpubCfi é um código que identifica um trecho do livro, usado para determinar o que deve ser exibido em uma página)
global.bookIndex = [
    { bookKey: 1, title: "Swiss Fairy Tale", author: "William Elliot Griffis", srcBookCover: "https://www.gutenberg.org/cache/epub/69739/pg69739.cover.medium.jpg", uri: "", locations: {} },
    { bookKey: 2, title: "The Little Glass Vial", author: "Nick Carter", srcBookCover: "https://www.gutenberg.org/cache/epub/69735/pg69735.cover.medium.jpg", uri: "", locations: {} },
    { bookKey: 3, title: "Alice in Wonderland", author: "Lewis Carroll", srcBookCover: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg", uri: "", locations: {} }
]
