# INDICE

[Introducción a React](##Introducción-a-React)
[Componentes](##Componentes)
[JSX](##JSX)


# Introducción a React

Ahora comenzaremos a familiarizarnos con probablemente el tema más importante de este curso, es decir, la biblioteca React. Comencemos con la creación de una aplicación React simple y con el conocimiento de los conceptos básicos de React.

La forma más fácil de empezar es utilizando una herramienta llamada Vite.

Comencemos creando una aplización llamada part1, navegar a este direcctorio e instalando las librerias:

```bash
# npm 6.x (desactualizado, pero aun en uso por algunos):
npm create vite@latest part1 --template react

# npm 7+, el doble guión adicional es necesario:
npm create vite@latest part1 -- --template react

# Nos movemos a la carpeta del proyecto
cd part1

# Instalamos las dependencias
pnpm install

# Iniciamos la aplicacion
pnpm run dev
```

La consola indica que la aplicación ha iniciado en localhost, puerto 5173, es decir la dirección http://localhost:5173/:

Vite inicia la aplicación por defecto en el puerto 5173. Si este no está libre, Vite utiliza el siguiente numero de puerto libre.

Abre el navegador y un editor de código para que puedas ver el código y el navegador al mismo tiempo en la pantalla:

El código de la aplicación se encuentra en la carpeta src. Simplifiquemos el código predeterminado de tal modo que el archivo main.jsx se vea así:

```bash
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

y el archivo App.jsx se vea así:

```js
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

export default App
```
Los archivos App.css y index.css, y el directorio assets pueden eliminarse ya que nos son necesarios en nuestra aplicación por ahora.

## Componentes

El archivo App.js ahora define un componente de React con el nombre App. El comando en la línea final del archivo main.jsx

```js
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

renderiza su contenido dentro del elemento div, definido en el archivo index.html, que tiene el valor 'root' en el atributo id.

De forma predeterminada, el archivo index.html no contiene ningún marcado HTML que sea visible para nosotros en el navegador.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Puedes intentar agregar algo de HTML al archivo. Sin embargo, cuando se usa React, todo el contenido que necesita ser renderizado es generalmente definido como componentes de React.

Echemos un vistazo mas de cerca al código que define el componente:

```js
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```

Como probablemente adivinaste, el componente se rendizará como una etiqueta div, que envuelve una etiqueta p que contiene el texto Hello world.

Técnicamente, el componente se define como una función de JavaScript. La siguiente es una función (que no recibe ningún parámetro):

```js
() => (
  <div>
    <p>Hello world</p>
  </div>
)
```

La función luego se asigna a un variable constante App:
```js
const App = ...
```

Hay algunas formas de definir funciones en JavaScript. Aquí utilizaremos funciones de flecha, que se describen en una versión más reciente de JavaScript conocida como ECMAScript 6, también llamada ES6.

Debido a que la función consta de una sola expresión, hemos utilizado una abreviatura, que representa este fragmento de código:

```js
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```
En otras palabras, la función devuelve el valor de la expresión.

La función que define el componente puede contener cualquier tipo de código JavaScript. Modifica tu componente para que sea de la siguiente manera:

```js
const App = () => {
  console.log('Hello from component')
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

export default App

```

También es posible renderizar contenido dinámico dentro de un componente.

Modifiqua el componente de la siguiente manera:

```js
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

Cualquier código de JavaScript entre llaves es evaluado y el resultado de esta evaluación se incrusta en el lugar definido en el HTML producido por el componente.

Recuerda que no deberías eliminar la línea al final del componente

```js
export default App
```

El export no se muestra en la mayoría de los ejemplos del material de este curso. Sin este export el componente y la aplicación completa se romperían.

¿Reduerdas que prometiste dejar la consola abierta? ¿Qué se imprimió allí?

## JSX

Parece que los componentes de React están devolviendo marcado HTML. Sin embargo, éste no es el caso. El diseño de los componentes de React se escribe principalmente usando JSX. Aunque JSX se parece a HTML, en realidad estamos tratando con una forma de escribir JavaScript. Bajo el capó, el JSX devuelto por los componentes de React se compila en JavaScript.

Después de compilar, nuestra aplicación se ve así:

```js
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```

La compilación está a cargo de Babel. Los proyectos creados con create-react-app o vite están configurados para compilarse automáticamente. Aprenderemos más sobre este tema en la parte 7 de este curso.

También es posible escribir React como "JavaScript puro" sin usar JSX. Aunque, nadie con una mente sana lo haría realmente.

En la práctica, JSX se parece mucho a HTML con la distinción de que con JSX puede incrustar fácilmente contenido dinámico escribiendo JavaScript apropiado entre llaves. La idea de JSX es bastante similar a muchos lenguajes de plantillas, como Thymeleaf, que se utiliza junto con Java Spring, que se utiliza en servidores.

JSX es similar a XML, lo que significa que todas las etiquetas deben cerrarse. Por ejemplo, una nueva línea es un elemento vacío, que en HTML se puede escribir de la siguiente manera:

```html
<br>
```
pero al escribir JSX, la etiqueta debe estar cerrada:

```html
<br />
```

Componentes múltiples
Modifiquemos el archivo App.jsx de la siguiente manera:

```js
const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
    </div>
  )
}
```

Hemos definido un nuevo componente Hello y lo usamos dentro del componente App. Naturalmente, un componente se puede usar múltiples veces:

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}
```

Nota: El export al final se omite en estos ejemplos ahora y en el futuro. Todavía será necesario para que el código funcione.

Escribir componentes con React es fácil, y al combinar componentes, incluso una aplicación más compleja puede ser bastante fácil de mantener. De hecho, una filosofía central de React es componer aplicaciones a partir de muchos componentes reutilizables especializados.

Otra fuerte convención es la idea de un componente raíz llamado App en la parte superior del árbol de componentes de la aplicación. Sin embargo, como aprenderemos en la parte 6, hay situaciones en las que el componente App no es exactamente la raíz, sino que está incluido en un componente de utilidad apropiado.

## props: Pasar datos entre los componentes

Es posible pasar datos a componentes usando los llamados props.

Modifiquemos el componente Hello de la siguiente manera:

```js
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
```
Ahora la función que define el componente tiene un parámetro props. Como argumento, el parámetro recibe un objeto, que tiene campos correspondientes a todos los "props" ("accesorios") que el usuario del componente define.

Los props se definen de la siguiente manera:
```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' />
      <Hello name='Daisy' />
    </div>
  )
}
```
Puede haber un número arbitrario de props y sus valores pueden ser strings "incrustados en el código" ("hard coded") o resultados de expresiones JavaScript. Si el valor del prop se logra usando JavaScript, debe estar envuelto con llaves.

Modifiquemos el código para que el componente Hello use dos props:

```js
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```
Los props enviados por el componente App son los valores de las variables, el resultado de la evaluación de la expresión de suma y un string regular.

# No renderizar objetos
Considera una aplicación que imprime en pantalla los nombres y edades de nuestros amigos:

```js
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}

export default App
```

La raíz del problema es Objects are not valid as a React child (Los objetos no son válidos como elementos hijos de React), es decir, la aplicación intentó renderizar objetos y falló nuevamente.

El código trató de renderizar la información de un amigo de la siguiente manera:

```js
<p>{friends[0]}</p>
```

y esto causó un problema porque el item a ser renderizado en las llaves es un objeto.
```js
{ name: 'Peter', age: 4 }
```

En React, las cosas individuales a ser renderizadas dentro de llaves deben ser valores primitivos, como números o cadenas.

La solución es la siguiente:

```js
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App
```
Ahora el nombre del amigo es renderizado dentro de las llaves de manera separada.
```js
{friends[0].name}
```
y la edad
```js
{friends[0].age}
```
Después de corregir el error, tu deberías limpiar los mensajes de la consola presionando el botón 🚫 y luego recargando el contenido de la página, y asegurarte de que no se están mostrando mensajes de error.

Una pequeña nota adicional a la anterior. React también permite renderizar arreglos si el arreglo contiene valores que son elegibles para renderizar (como números y cadenas). Así que el siguiente programa funcionaría, aunque el resultado no ser el que queremos:

```js
const App = () => {
  const friends = [ 'Peter', 'Maya']

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}
```
En esta parte, ni siquiera vale la pena intentar utilizar la renderización directa de las tablas; volveremos a ello en la siguiente parte.