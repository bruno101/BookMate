const webviewHtmlContent = (bookUrl, locations, initialLocation, saveMetadata) => {

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
            width: 50vw;
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

    window.book = ePub("${bookUrl}");

    window.rendition = window.book.renderTo(document.getElementById('reader'), {

        width: '100%',
        height: '100%',

    });

    window.book.ready.then((book) => {

        if (${JSON.stringify(locations)}.length == 0) {

            //Gerando e salvando Locations
            window.book.locations.generate().then(locations => {

                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'locations',
                        locations: locations
                    })

                );

            });

        }

    })

    window.rendition.on('started', () => {

        if (${saveMetadata}) {

            const title = window.book.package.metadata.title
            const author = window.book.package.metadata.creator

        try {

            //Salvando a imagem da capa em formato "base64", e então enviando os metadados
            window.book.archive.createUrl(window.book.cover).then((url) => {
                fetch(url)
                    .then((response) => response.blob()
                        .then((blob) => {

                            blob.arrayBuffer().then((buffer) => {
                                const array = new Uint8Array(buffer);
                                var binary = '';
                                var len = array.byteLength;
                                for (var i = 0; i < len; i++) {
                                    binary += String.fromCharCode( array[ i ] );
                                }

                                var srcBookCover = btoa(binary);
                                window.ReactNativeWebView.postMessage(
                                    JSON.stringify({
                                        type: 'metadata',
                                        srcBookCover: srcBookCover,
                                        title: title,
                                        author: author
                                    })
                                );
                               window.rendition.display("${initialLocation}");

                            })
                        })
                    )

            })


        } catch (e) {

                console.log(e)

                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'metadata',
                        title: title,
                        author: author
                    })
                );

                window.rendition.display("${initialLocation}");

            }
           

        } else {
            window.rendition.display("${initialLocation}");
        }

    })

    window.rendition.on('selected', () => {

        let selected = window.rendition.manager && window.rendition.manager.getContents().length > 0
            ? window.rendition.manager
					.getContents()[0]
					.window.getSelection()
					.toString()
					.trim()
            : '';

        if (selected) {

            //Código para obter a frase completa de uma palavra da seleção; vamos pegando o pai de cada "node" até encontrarmos um do tipo "parágrafo" (ou quando o pai for "BODY" ou "DIV")

            phraseText: ""

            try {

                //Identificamos o parágrafo
                node = window.rendition.manager.getContents()[0].window.getSelection().anchorNode
                while ( !( node.nodeName == "P" || node.parentNode.nodeName == "BODY" || node.parentNode.nodeName == "DIV") ) { node = node.parentNode }
                paragraphText = node.textContent

                //Encontramos a posição da palavra no parágrafo
                var range = window.rendition.manager.getContents()[0].window.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(node);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
                console.log(paragraphText, caretOffset)

                //Identificamos a frase em que a palavra está
                var sentences = paragraphText.split(/[.!?。？！]/);

                for (var i = 0; i < sentences.length; i++) {

                   var sentence = sentences[i].trim();
                   var startIndex = paragraphText.indexOf(sentence);

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

            window.ReactNativeWebView.postMessage(

                JSON.stringify({
                    type: 'selected',
                    coordinates: window.rendition.manager.getContents()[0].window.getSelection().getRangeAt(0).getClientRects(),
                    fullPhrase: phraseText.replace(/\\n/g, " "),
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