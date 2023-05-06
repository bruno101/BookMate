const webviewHtmlContent = (bookUrl, initialLocation) => {

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
        height: '100%'

    });

    window.rendition.on('started', () => {

        window.rendition.display("${initialLocation}");

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

            window.ReactNativeWebView.postMessage(

                JSON.stringify({
                    type: 'selected',
                    coordinates: window.rendition.manager.getContents()[0].window.getSelection().getRangeAt(0).getClientRects(),
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