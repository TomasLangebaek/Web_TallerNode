const http = require("http");
const axios = require("axios").default;
var fs = require("fs");

var port = 8081;
var host = "localhost";
var primero = true;
var primero2 = true;

var server = http.createServer(async function (req, res) {
  if (req.url === "/clientes") {
    if (primero) {
      await getClientes();
      primero = false;
    }
    fs.readFile("clientes.html", "utf8", function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.end(data);
      }
    });
  }
  if (req.url === "/proveedores") {
    if (primero2) {
      await getProveedores();
      primero2 = false;
    }
    fs.readFile("proveedores.html", "utf8", function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.end(data);
      }
    });
  }
});

server.listen(port, host, function () {
  console.log(`Listening at http://${host}:${port}`);
});

async function getClientes() {
  var response = await axios.get(
    "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json "
  );
  var json = response.data;
  html =
    '<html lang="en">  <head>    <meta charset="UTF-8" />    <meta http-equiv="X-UA-Compatible" content="IE=edge" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <title>Clientes</title>    <link      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"      rel="stylesheet"      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"      crossorigin="anonymous"    />  </head>  <body>    <main>      <h1>Clientes</h1>    <table class="table table-striped">        <thead>          <tr>            <th scope="col">ID</th>            <th scope="col">Nombre</th>            <th scope="col">Contacto</th>          </tr>        </thead>        <tbody id="clientes">';
  for (var i = 0; i < json.length; i++) {
    var obj = json[i];

    let id = obj.idCliente;
    let compania = obj.NombreCompania;
    let contacto = obj.NombreContacto;

    html += '<tr><th scope="row">';
    html += id;
    html += "</th><td>";
    html += compania;
    html += "</th><td>";
    html += contacto;
    html += "</td></tr>";
  }

  html += "</tbody>      </table>    </main>     </body></html>";
  await fs.writeFile("clientes.html", html, "utf8", function (err) {
    if (err) throw err;
  });
}

async function getProveedores() {
  var response = await axios.get(
    "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
  );
  var json = response.data;
  html =
    '<html lang="en">  <head>    <meta charset="UTF-8" />    <meta http-equiv="X-UA-Compatible" content="IE=edge" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <title>Proveedores</title>    <link      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"      rel="stylesheet"      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"      crossorigin="anonymous"    />  </head>  <body>    <main>      <h1>Proveedores</h1>    <table class="table table-striped">        <thead>          <tr>            <th scope="col">ID</th>            <th scope="col">Nombre</th>            <th scope="col">Contacto</th>          </tr>        </thead>        <tbody id="clientes">';
  for (var i = 0; i < json.length; i++) {
    var obj = json[i];

    let id = obj.idproveedor;
    let compania = obj.nombrecompania;
    let contacto = obj.nombrecontacto;

    html += '<tr><th scope="row">';
    html += id;
    html += "</th><td>";
    html += compania;
    html += "</th><td>";
    html += contacto;
    html += "</td></tr>";
  }

  html += "</tbody>      </table>    </main>     </body></html>";
  await fs.writeFile("proveedores.html", html, "utf8", function (err) {
    if (err) throw err;
  });
}
