# Swagger Editor Server

## Docker

Build the image

     docker build -t swagger-server .

Run the container 

     docker run --rm --name swagger-server -d -p 3000:3000 swagger-server

## Swagger Editor changes

Intended as a simple file-storage solution for Swagger Editor. To use it
you'll need to make the following changes to `index.html` of the Swagger
Editor.


```
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const SpecUpdateListenerPlugin = function() {
    return {
      statePlugins: {
        spec: {
          wrapActions: {
            updateSpec: function(oriAction) {
              return function(spec) {
                var url = getParameterByName('url');
                var xhr = new XMLHttpRequest();
                xhr.open('PUT', url, false);
                xhr.send(spec);

                if (xhr.status < 200 || xhr.status >= 300) {
                  alert('There was an error saving the swagger file');
                  console.log( xhr.status + ': ' + xhr.statusText );
                }
                return oriAction(spec);
              };
            }
          }
        }
      }
    }
  }

  window.onload = function() {
    // Build a system
    const editor = SwaggerEditorBundle({
      dom_id: '#swagger-editor',
      layout: 'StandaloneLayout',
      presets: [
        SwaggerEditorStandalonePreset
      ],
      plugins: [
        SpecUpdateListenerPlugin
      ]
    });

    window.editor = editor;
  }

```
