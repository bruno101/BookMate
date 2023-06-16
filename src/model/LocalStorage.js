import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

//Retorna a lista de livros
export const getBookIndex = async () => {

    try {

        const jsonValue = await AsyncStorage.getItem('bookIndex')
        return jsonValue != null ? JSON.parse(jsonValue) : [];

    } catch (e) {

        return []

    }

}

//Salva a lista de livros passada como parâmetro
export const setBookIndex = async (bookIndex) => {

    try {

        const jsonValue = JSON.stringify(bookIndex)
        await AsyncStorage.setItem('bookIndex', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Função auxiliar para remover um objeto com uma certa chave
const removeObjectWithBookKey = (arr, bookKey) => {

    const objWithBookKey = arr.findIndex((obj) => obj.bookKey === bookKey);

    if (objWithBookKey > -1) {
        arr.splice(objWithBookKey, 1);
    }

    return arr;

}

//Deleta um livro
export const deleteBook = async (bookKey, fileName) => {

    try {

        //Tomamos o índice de livros
        const bookIndex = await getBookIndex()

        //Definimos o novo índice de livros
        let newBookIndex = removeObjectWithBookKey(bookIndex, bookKey)
        setBookIndex(newBookIndex)

        //Deletamos o livro do diretório em que ele havia sido salvo (que é o DocumentDirectory)
        const filePath = RNFS.DocumentDirectoryPath + "/" + fileName;

        RNFS.unlink(filePath).then(() => {

            RNFS.scanFile(filePath);
        })

    } catch (e) {

        console.log(e)

    }

}

//Importa um livro
export const importBook = async (bookUri, name) => {

    try {

        //Tomamos o índice de livros
        const bookIndex = await getBookIndex()
        //Escolhemos uma chave única para esse livro (no caso, é a maior chave que há no momento somada a 1)
        const bookKey = bookIndex.length == 0 ? 0 : bookIndex[bookIndex.length - 1].bookKey + 1
        //Salvamos o arquivo no DocumentDirectory com o nome abaixo
        var fileName = `book${bookKey}.epub`
        var newUri = RNFS.DocumentDirectoryPath + "/" + fileName;

        const newItem = await RNFS.copyFile(bookUri, newUri).then(async (success) => {

            //Após salvarmos o arquivo, adicionamos ela ao nosso banco de dados (a princípio, sem os metadados)
            var newItem = { bookKey: bookKey, title: name.split('.')[0], author: "", srcBookCover: "https://icon-library.com/images/white-book-icon/white-book-icon-15.jpg", fileName: fileName, locations: [], lastLocationOpened: "-1" }

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

//Salva os metadados do livro
export const saveBookMetadata = async (bookKey, metadata) => {

    const bookIndex = await getBookIndex()
    const objWithBookKey = bookIndex.findIndex((obj) => obj.bookKey === bookKey);

    bookIndex[objWithBookKey].title = metadata.title
    bookIndex[objWithBookKey].author = metadata.author

    if (metadata.hasOwnProperty('srcBookCover')) {

        //Note que salvamos a capa do livro no formato "base64"
        bookIndex[objWithBookKey].srcBookCover = 'data:image/png;base64,' + metadata.srcBookCover

    }

    setBookIndex(bookIndex)

}

//Salva as Locations de um livro
export const saveBookLocations = async (bookKey, locations) => {

    const bookIndex = await getBookIndex()
    const objWithBookKey = bookIndex.findIndex((obj) => obj.bookKey === bookKey);

    bookIndex[objWithBookKey].locations = locations

    setBookIndex(bookIndex)

}


//Salva o índice do último livro aberto
export const setCurrentlyReading = async (bookKey) => {

    try {

        const jsonValue = JSON.stringify(bookKey)
        await AsyncStorage.setItem('currentlyReading', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Retorna o índice do último livro aberto
export const getCurrentlyReading = async () => {

    try {

        const jsonValue = await AsyncStorage.getItem('currentlyReading')
        return jsonValue != null ? JSON.parse(jsonValue) : -1;

    } catch (e) {

        return -1

    }

}

//Salva a localizãção da última página lida
export const setLastLocationOpened = async (bookKey, location) => {

    const bookIndex = await getBookIndex()
    const objWithBookKey = bookIndex.findIndex((obj) => obj.bookKey === bookKey);

    bookIndex[objWithBookKey].lastLocationOpened = location

    await setBookIndex(bookIndex)

    

}

//Retorna o idioma nativo do usuário; por padrão, português
export const getNativeLanguage = async () => {

    const jsonValue = await AsyncStorage.getItem('nativeLanguage')

    return jsonValue != null ? JSON.parse(jsonValue) : { name: "Portuguese", code: "pt" };

}

//Salva o idioma nativo do usuário
export const setNativeLanguage = async (language) => {

    try {

        const jsonValue = JSON.stringify(language)
        await AsyncStorage.setItem('nativeLanguage', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Retorna a lista de palavras para revisão
export const getWordList = async () => {

    try {

        const jsonValue = await AsyncStorage.getItem('wordList')

        return jsonValue != null ? JSON.parse(jsonValue) : [];

    } catch (e) {

        return []

    }

}

//Salva uma nova lista de palavras
export const setWordList = async (wordList) => {

    try {

        const jsonValue = JSON.stringify(wordList)
        await AsyncStorage.setItem('wordList', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Adiciona à lista de palavras já existente
export const addToWordList = async (newWord, fullPhrase) => {

    try {

        const wordList = await getWordList()

        //Checamos se a palavra já existe
        if (!wordList.find(e => e.word === newWord)) {

            //Escolhemos uma chave única para essa palavra (no caso, é a maior chave que há no momento somada a 1)
            const wordId = wordList.length == 0 ? 0 : wordList[wordList.length - 1].id + 1

            var newItem = { id: wordId, word: newWord, translation: '', language: { name: '', code: '' }, fullPhrase: fullPhrase }
            wordList.push(newItem)

            setWordList(wordList)

        }


    } catch (e) {

        console.log(e)

    }

}

//Remove a última palavra adicionada à lista de palavras
export const popFromWordList = async () => {

    try {

        const wordList = await getWordList()
        if (wordList.length > 0) { wordList.pop()}
        setWordList(wordList)

    } catch (e) {

        console.log(e)

    }

}

//Salva uma tradução para uma palavra na lista de palavras salvas
export const updateWordTranslation = async (word, translation, translationLanguage) => {

    try {

        const wordList = await getWordList()

        objIndex = wordList.findIndex((obj => obj.word == word));
        wordList[objIndex].translation = translation
        wordList[objIndex].language = translationLanguage

        setWordList(wordList)

    } catch (e) {

        console.log(e)

    }

}

//Retorna "true" se o modo noturno está selecionado
export const getNightMode = async () => {

    try {

        const jsonValue = await AsyncStorage.getItem('nightMode')

        return jsonValue != null ? JSON.parse(jsonValue) : false;

    } catch (e) {

        return false

    }

}

//Salva o tema escolhido (modo noturno ou normal)
export const setNightMode = async (nightMode) => {

    try {

        const jsonValue = JSON.stringify(nightMode)
        await AsyncStorage.setItem('nightMode', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Retorna a fonte escolhida para o texto do livro
export const getFont = async () => {

    try {

        const jsonValue = await AsyncStorage.getItem('font')

        return jsonValue != null ? JSON.parse(jsonValue) : { fontSize: "14", fontFamily: "" };

    } catch (e) {

        return { fontSize: "14", fontFamily: "" }

    }

}

//Salva a escolha de fonte
export const setFont = async (font) => {

    try {

        const jsonValue = JSON.stringify(font)
        await AsyncStorage.setItem('font', jsonValue)

    } catch (e) {
        console.log(e)
    }

}

//Salva o tamanho da fonte escolhido
export const setFontSize = async (fontSize) => {

    setFont({ fontSize: fontSize, fontFamily: (await getFont()).fontFamily })

}

//Salva a família da fonte escolhida
export const setFontFamily = async (fontFamily) => {

    setFont({ fontSize: (await getFont()).fontSize, fontFamily: fontFamily })

}