import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const getBookIndex = async () => {

    //Essa é uma lista hipotética de livros do usuário com seus dados para exibição
    //Provavelmente vamos ter que armazenar um índice, o título, o autor, a capa, o nome com o que o arquivo foi salvo no diretório da aplicação e as "locations" (conjunto de EpubCfis que determinam quais são as páginas do livro - uma EpubCfi é um código que identifica um trecho do livro, usado para determinar o que deve ser exibido em uma página), assim a última Location aberta pelo usuário

    /*const bookIndex = [
        { bookKey: 1, title: "Swiss Fairy Tale", author: "William Elliot Griffis", srcBookCover: "https://www.gutenberg.org/cache/epub/69739/pg69739.cover.medium.jpg", fileName: "", locations: {}, lastLocationOpened: 1 },
        { bookKey: 2, title: "The Little Glass Vial", author: "Nick Carter", srcBookCover: "https://www.gutenberg.org/cache/epub/69735/pg69735.cover.medium.jpg", fileName: "", locations: {}, lastLocationOpened: 1 },
        { bookKey: 3, title: "Alice in Wonderland", author: "Lewis Carroll", srcBookCover: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg", fileName: "", locations: {}, lastLocationOpened: 1 }
    ]*/

    try {

        const jsonValue = await AsyncStorage.getItem('bookIndex')
        return jsonValue != null ? JSON.parse(jsonValue) : [];

    } catch (e) {

        return []

    }

}

export const setBookIndex = async (bookIndex) => {

    try {

        const jsonValue = JSON.stringify(bookIndex)
        await AsyncStorage.setItem('bookIndex', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

const removeObjectWithBookKey = (arr, bookKey) => {

    const objWithBookKey = arr.findIndex((obj) => obj.bookKey === bookKey);

    if (objWithBookKey > -1) {
        arr.splice(objWithBookKey, 1);
    }

    return arr;

}

//Deve deletar um livro, deletando o arquivo no diretório apropriado e o livro na base de dados
export const deleteBook = async (bookKey, fileName) => {

    try {

        const bookIndex = await getBookIndex()
        const filePath = RNFS.DocumentDirectoryPath + "/" + fileName;
        let newBookIndex = removeObjectWithBookKey(bookIndex, bookKey)
        setBookIndex(newBookIndex)

        console.log("filepath: ", filePath)

        RNFS.unlink(filePath).then(() => {

            RNFS.scanFile(filePath);
            console.log("Deleted.")

        })

        console.log(newBookIndex)

    } catch (e) {

        console.log(e)

    }

}

//Deve importar um livro, salvando o arquivo no diretório apropriado e o livro na base de dados; retorna o item adicionado
export const importBook = async (bookUri, name) => {

    try {

        const bookIndex = await getBookIndex()
        const bookKey = bookIndex.length == 0 ? 0 : bookIndex[bookIndex.length - 1].bookKey + 1

        var fileName = `book${bookKey}.epub`
        var newUri = RNFS.DocumentDirectoryPath + "/" + fileName;

        const newItem = await RNFS.copyFile(bookUri, newUri).then(async (success) => {

            var newItem = { bookKey: bookKey, title: name.split('.')[0], author: "", srcBookCover: "https://icon-library.com/images/white-book-icon/white-book-icon-15.jpg", fileName: fileName, locations: {}, lastLocationOpened: 1 }

            bookIndex.push(newItem)
            setBookIndex(bookIndex)

            return newItem

        })
            .catch((err) => {
                console.log(err.message);
            });

        return newItem


    } catch (e) {

        console.log(e)

    }
}

export const saveBookMetadata = async (bookKey, metadata) => {

    const bookIndex = await getBookIndex()
    const objWithBookKey = bookIndex.findIndex((obj) => obj.bookKey === bookKey);

    bookIndex[objWithBookKey].title = metadata.title
    bookIndex[objWithBookKey].author = metadata.author
    bookIndex[objWithBookKey].srcBookCover = 'data:image/png;base64,' + metadata.srcBookCover

    setBookIndex(bookIndex)

}

export const getCurrentlyReading = async () => {

    //Deve retornar o índice do último livro aberto pelo usuário, por enquanto retornamos um número aleatório
    return 0

}

export const getNativeLanguage = async () => {

    //Por enquanto supomos que o idioma nativo (para o qual se traduz) é o português
    const nativeLanguage = { name: "Portuguese", code: "pt" }
    return nativeLanguage

}

export const getWordList = async () => {

    //Vamos supor que os dados de palavras a serem mostrados são os descritos abaixo
    const wordListData = [
        { id: 1, word: 'залив', translation: 'bay', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.' },
        { id: 2, word: 'toujours', translation: 'always', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie." },
        { id: 3, word: '她', translation: 'she', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。" },
        { id: 4, word: 'Из', translation: 'from', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.' },
        { id: 5, word: 'gens', translation: 'people', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie." },
        { id: 6, word: '缘', translation: 'edge', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。" },
        { id: 7, word: 'пристань', translation: 'wharf', language: { name: 'Russian', code: 'ru' }, fullPhrase: 'Из другого открывается прекрасный вид на залив и небольшую частную пристань, принадлежащую поместью.' },
        { id: 8, word: 'voir', translation: 'to see', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie." },
        { id: 9, word: '视', translation: 'to see', language: { name: 'Chinese', code: 'zh' }, fullPhrase: "她紧张地凝视着边缘。" },
        { id: 10, word: 'marcher', translation: 'walk', language: { name: 'French', code: 'fr' }, fullPhrase: "J'ai toujours l'impression de voir des gens marcher dans ces nombreux sentiers et tonnelles, mais John m'a averti de ne pas céder le moins du monde à la fantaisie." },
        { id: 11, word: 'إنهم', translation: 'that they', language: { name: 'Arabic', code: 'ar' }, fullPhrase: "إنهم يتجادلون. في حين أن الحجة تبدو مختلفة ، إلا أن الحقيقة هي نفسها دائمًا." }
    ]

    return wordListData

}