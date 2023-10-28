/*
  <div id='parent'>
    <div id='child'>
      <h1> i am h1 tag </h1>
    </div>
  </div>

*/
/*to create above structure */

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am h1 tag"),
    React.createElement("h2", {}, "I am h2 tag"),
  ]),
  React.createElement(
    "div",
    { id: "parent" },
    React.createElement("div", { id: "child" }, [
      React.createElement("h1", {}, "I am h1 tag"),
      React.createElement("h2", {}, "I am h2 tag"),
    ])
  )
);
// ReactElement(object)=> html(browser understands)
// --------------------------------------------------

const heading = React.createElement(
  "h1",
  { id: "heading" },
  "hello World by react"
); //h1 element is created here

console.log(heading); //returns an object
const root = ReactDOM.createRoot(document.getElementById("root")); // root is created
root.render(heading); // heading is rendered in div id-root   --it converts object to tag
