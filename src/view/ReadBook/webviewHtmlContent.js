const webviewHtmlContent = (bookUrl, locations, initialLocation, saveMetadata, nightMode, font) => {
    //Essa função gera o conteúdo em html que deve ser mostrado na Webview
    //Usamos a biblioteca "epub.js", para JavaScript
    //Quando o texto é selecionado, mandamos uma mensagem em json para a Webview, incluído as coordenadas da seleção e o conteúdo
    return (`

<html lang="en">

<head>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
    <style>
        body {
            margin: 0;
        }

        #reader {
            height: 100vh;
            width: 100vw;
            overflow: hidden !important;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>

</head>

<body>

    <div id="reader"></div>

</body>

<script>

    //Criamos o livro (a partir da URL para onde ele está sendo servido)
    window.book = ePub("${bookUrl}");

    //Renderizamos o livro
    window.rendition = window.book.renderTo(document.getElementById('reader'), {

        width: '100%',
        height: '100%'

    });

    //Definimos o tema
    window.rendition.themes.register("selected-theme", { "body": { ${nightMode ? '"background": "#1d1f2b", "color": "white",' : "" } "font-size": "${font.fontSize}pt !important", "font-family": "${font.fontFamily} !important", }});
    window.rendition.themes.select("selected-theme");

    //Se o livro ainda não tiver "Locations", as geramos e salvamos
    window.book.ready.then((book) => {

        if (${locations.length} == 0) {

           //Gerando e salvando Locations
           window.book.locations.generate(1200).then(locations => {

           //Enviamos a lista de Locations, a Location atual e o índice da Location atual na lista de Locations

           var currentLocation = '-1'
           var newLocationIndex = '-1'

           if (window.rendition.currentLocation().start != undefined) {

                currentLocation = window.rendition.currentLocation().start.cfi
                newLocationIndex = window.book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)

           }

                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'locations',
                        locations: locations,
                        currentLocation: currentLocation,
                        newLocationIndex: newLocationIndex
                    })

                );

            });

        } 
        
    })

    //Função para comparar duas EpubCFIs; retorna -1 se a primeira vem primeiro, 0 se elas são iguais, e 1 se a segunda vem primeiro

    compareEPUBCFIs = (cfi1, cfi2) => {
      // Remove the "epubcfi(" prefix and ")" suffix from both CFIs
      cfi1 = cfi1.replace("epubcfi(", "").replace(")", "");
      cfi2 = cfi2.replace("epubcfi(", "").replace(")", "");

      // Remove the "!" elements from both CFIs
      cfi1 = cfi1.replace(/!/g, "");
      cfi2 = cfi2.replace(/!/g, "");

      // Remove the "[...]" elements from both CFIs
      cfi1 = cfi1.replace(/\\[.*?\\]/g, "");
      cfi2 = cfi2.replace(/\\[.*?\\]/g, "");

      // Split the CFIs into their individual parts using both "/" and ":"
      const parts1 = cfi1.split(/[/:]/);
      const parts2 = cfi2.split(/[/:]/);

      // Compare each part of the CFIs
      for (let i = 0; i < Math.min(parts1.length, parts2.length); i++) {
        const part1 = parts1[i];
        const part2 = parts2[i];

        // Compare the parts
        if (part1 !== part2) {
          // Parts are different, determine the ordering
          return parseInt(part1) < parseInt(part2) ? -1 : 1;
        }
      }

      // All parts are equal or one CFI is a subset of the other
      if (parts1.length === parts2.length) {
        // Both CFIs are equal
        return 0;
      } else {
        // One CFI is a subset of the other
        return parts1.length < parts2.length ? -1 : 1;
      }
    }

    //Função para buscar a página correta a ser mostrada (caso o método "display" não tenha funcionado corretamente)
    const searchRightPage = async (numberOfAttempts) => {

        //Se o número de tentativas esgotar, desistimos
        if (numberOfAttempts == 0) {

            window.display("${initialLocation}")
            finishedLoading()

        } else {

            //Se não, comparamos a localização atual com a localização correta, e de acordo com o resultado vamos para a próxima página ou para a anterior
            var comparisonStart = compareEPUBCFIs(window.rendition.currentLocation().start.cfi, "${initialLocation}")
            var comparisonEnd = compareEPUBCFIs(window.rendition.currentLocation().end.cfi, "${initialLocation}")

            if (comparisonStart === -1 && comparisonEnd === -1) {

                window.rendition.next().then(() => { searchRightPage(numberOfAttempts - 1) })

            } else if (comparisonStart === 1 && comparisonEnd === 1) {

                window.rendition.prev().then(() => { searchRightPage(numberOfAttempts - 1) })

            } else {

                finishedLoading()

            }

        }

    }

    //Manda uma mensagem informando a Location atual e o índice dela (para mostrar no Slider) quando a página é encontrada
    const sendNewPageMessage = () => {

        if (${locations.length} != 0) {

                window.book.locations.load(${JSON.stringify(locations)})

                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({
                                        type: 'newPage',
                                        location: window.rendition.currentLocation().start.cfi,
                                        newLocationIndex: window.book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)
                                    })
                                );

            }

    }

    //Manda uma mensagem informando que a página buscada foi carregada
    const finishedLoading = () => {

        const newLocationIndex = window.book.locations.locationFromCfi(window.rendition.currentLocation().start.cfi)

        window.ReactNativeWebView.postMessage(
                                        JSON.stringify({
                                            type: 'loaded'
                                        })

                                    );

        sendNewPageMessage()

    }

    var firstTimeRendering = true;

    //Quando o livro foi renderizado, carregamos a lista de "Locations" (se ela já existir) e enviamos a Location atual e o índice da Location atual
    window.rendition.on('rendered', async () => {

        if (firstTimeRendering) {

            //Esse "if" tenta resolver um bug no qual a biblioteca abre o livro em uma localização diferente da indicada (frequentemente a página anterior ou posterior)
            if ("${initialLocation}" != "-1") {

                if (window.rendition.currentLocation().start.cfi != "${initialLocation}") {

                    //Se a biblioteca abriu o texto na localização errada, tentamos encontrar a correta
                    searchRightPage(10)

                } else {

                    finishedLoading()

                }

            } else {

                finishedLoading()

            }

            firstTimeRendering = false

        }

    })

    window.rendition.on('started', () => {

        //Mostramos a página definida por "initialLocation"
        window.rendition.display(${initialLocation === "-1" ? `` : `'${initialLocation}'`})

        //Se o atributo "saveMetadata" for verdadeiro, obtemos e enviamos os metadados
        if (${saveMetadata}) {

            //Obtemos o título do livro e o autor
            const title = window.book.package.metadata.title
            const author = window.book.package.metadata.creator

            //O código abaixo obtem a imagem a capa do livro (se houver)
            //Salvamos a imagem da capa em formato "base64", e então enviando os metadados
            try {

                //Obtemos o conteúdo da imagem a partir da URL
                window.book.archive.createUrl(window.book.cover).then((url) => {
                    fetch(url)
                        .then((response) => response.blob()
                            .then((blob) => {

                                //Convertemos o resultado obtido para o formato "base64"
                                blob.arrayBuffer().then((buffer) => {

                                    const array = new Uint8Array(buffer);
                                    var binary = '';
                                    var len = array.byteLength;
                                    for (var i = 0; i < len; i++) {
                                        binary += String.fromCharCode( array[ i ] );
                                    }

                                    var srcBookCover = btoa(binary);

                                    //Enviamos a mensagem com todos os metadados
                                    window.ReactNativeWebView.postMessage(
                                        JSON.stringify({
                                            type: 'metadata',
                                            srcBookCover: srcBookCover,
                                            title: title,
                                            author: author
                                        })

                                    );

                                })
                            })
                        )

                })


            } catch (e) {

                    console.log(e)

                    //Se a imagem não existir, salvamos apenas os outros metadados
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                            type: 'metadata',
                            title: title,
                            author: author
                        })
                    );

                }
           

        } 

    })

    //Esse evento ocorre quando o usuário seleciona texto
    window.rendition.on('selected', () => {

        //Obtemos o texto selecionado
        let selected = window.rendition.manager && window.rendition.manager.getContents().length > 0
            ? window.rendition.manager
					.getContents()[0]
					.window.getSelection()
					.toString()
					.trim()
            : '';

        if (selected) {

            //Código para obter a frase completa de uma palavra da seleção

            phraseText: ""

            try {

                //Identificamos o parágrafo
                //Tomamos o pai de cada "node" até encontrarmos um do tipo "parágrafo" (ou até o pai ser "BODY" ou "DIV")
                node = window.rendition.manager.getContents()[0].window.getSelection().anchorNode
                while ( !( node.nodeName == "P" || node.parentNode.nodeName == "BODY" || node.parentNode.nodeName == "DIV") ) { node = node.parentNode }
                paragraphText = node.textContent

                //Encontramos a posição da palavra (caretOffset) no parágrafo
                var range = window.rendition.manager.getContents()[0].window.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(node);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;

                //Identificamos a frase em que a palavra está
                //Primeiro separamos o texto em sentenças
                var sentences = paragraphText.split(/[.!?。？！]/);

                //Iteramos pelas sentenças
                for (var i = 0; i < sentences.length; i++) {

                   var sentence = sentences[i].trim();
                   var startIndex = paragraphText.indexOf(sentence);

                   //Se o índice do 'caretOffset' estiver na sentença, adicionamos o sinal de pontuação do fim da frase e definimos essa como a sentença buscada
                   if (startIndex <= caretOffset && startIndex + sentence.length >= caretOffset) {

                        var punctuationIndex = startIndex + sentence.length;
                        if (punctuationIndex < paragraphText.length) {
                            phraseText = sentence + paragraphText.charAt(punctuationIndex)
                        } else {
                            phraseText = sentence;
                        }

                   }

                }                

            } catch (e) {
                console.log(e)
            }

            //Enviamos as coordenadas da seleção, a frase encontrada, e o texto da seleção
            window.ReactNativeWebView.postMessage(

                JSON.stringify({
                    type: 'selected',
                    coordinates: window.rendition.manager.getContents()[0].window.getSelection().getRangeAt(0).getClientRects(),
                    fullPhrase: phraseText.replace(/\\n/g, " ").replace(/ +(?= )/g,''),
                    selected
                })

            );

        }

		});


</script>

</html>

`)

}

export default webviewHtmlContent;