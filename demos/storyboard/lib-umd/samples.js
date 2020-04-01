(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-ignore
    exports.samples = {
        "Covid-19": "# Covid-19\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\nSome of the topics covered are:\n* Fetching data from:\n* An arbitrary source\n* HIPIE Marshaller \n* Visualizing data with [@hpcc-js](https://github.com/hpcc-systems/Visualization) visualizations\n* Enabling interactivity between the visualizations\n\n## Arbitrary data\n_Fist grab some arbitrary data, in this case its some Covid-19 data from https://covid19js.com.  This dataset is being updated daily and currently has ${covid19.length} rows!_\n\n```\ncovid19JS = require(\"https://covid19js.com/dist/covid19.js?\"+new Date().getTime());\ncovid19 = covid19JS.data(); \n```\n\nA quick peek at the raw data:\n```\nviewof covid19Table = table({height:140});\nviewof covid19Table.data(filteredCovid19);\n``` \n\n### Calculate Deaths + Confirmed By Date.\n_Lets reuse some hipie logic to performa a Group By_\n\n``` \nbyDate = hipie.groupBy(covid19, [\"date\"], [\n    {type: \"sum\", fieldID: \"Confirmed\", inFieldID: \"confirmed\"},\n    {type: \"sum\", fieldID: \"Recovered\", inFieldID: \"recovered\"},\n    {type: \"sum\", fieldID: \"Deaths\", inFieldID: \"deaths\"}\n]);\nbyCountry = hipie.groupBy(covid19, [\"country_iso2\"], [\n    {type: \"sum\", fieldID: \"Confirmed\", inFieldID: \"confirmed\"},\n    {type: \"sum\", fieldID: \"Recovered\", inFieldID: \"recovered\"},\n    {type: \"sum\", fieldID: \"Deaths\", inFieldID: \"deaths\"}\n]);\n```\n\nWhich we can render into a Line Chart: \n```\npalID = chart.createOrdinalPalette({Deaths:\"red\", Confirmed: \"Orange\", Recovered: \"Green\"})\nviewof line = chart.line({title:\"By Date\", height:240, legendVisible:true, xAxisType:\"time\", paletteID: palID});\nviewof line.data(byDate); \n```\n\n### Filtered Data\n_Next we filter the orig data by date, based on the current line selection: \"${line && line.row.date}\", if nothing is selected, then we include all rows, which currently includes ${filteredCovid19.length} rows._\n\n```\nfilteredCovid19 = covid19.filter(row => line === null || row.date === line.row.date);\n```\n\n## Slidy data\n_Creating a HTML slider is straightforward and we can use \"byDate\" dataset to translate it to a valid date: **${sliderDate}**!  Here we can visualize the spread of the virus over time._\n\n```\nviewof slider = html`<input type=range min=0 max=${byDate.length-1} step=1 value=0>`\nsliderDate = byDate[slider].date;\ncovid19ByDate = covid19.filter(row=>row.date === sliderDate);\ngeoData = covid19ByDate.map(row=>({lat:row.lat, lng:row.lng, icon:\"fa-plus\", color:\"green\", popup:JSON.stringify(row, undefined, \"  \")}));\nviewof map = geospatial.clusterPins();\nviewof map.data(geoData);\n```\n",
        "ECL Playground": "# ECL Playground\n\n_A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n## 1 - An ECL Editor\n\n```\nviewof eclEditor = editor.ecl();\nviewof eclEditor.text(`\\\n\nLayout_Person := RECORD\n  UNSIGNED1 PersonID;\n  STRING15  FirstName;\n  STRING25  LastName;\nEND;\n\nallPeople := DATASET([ {1,'Fred','Smith'},\n                       {2,'Joe','Blow'},\n                       {3,'Jane','Smith'}],Layout_Person);\n\nsomePeople := allPeople(LastName = 'Smith');\n\n//  Outputs  ---\nsomePeople;\n`)\n```\n\n## 2 - A Submit Button\n\n```\nviewof eclToSubmit = {\n    const button = html`<button>Submit</button>`;\n    button.onclick = () => {\n        button.value = eclEditor;\n        button.dispatchEvent(new CustomEvent(\"input\"));\n    }\n    return button;\n}\n```\n\n## 3 - A HPCC Platform\n\n* **Platform**:  ${platform.url} \n\n```\nplatform = esp(\"https://play.hpccsystems.com:18010\");\nresults = platform.submit(eclToSubmit);\n```\n\n## 4 - Render results in a Table\n\n```\nviewof resultsTable = table({height:140});\nviewof resultsTable.data(results);\n``` \n",
        "Five-Minute Introduction": "# Five-Minute Introduction\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n---\n&uarr; <i class=\"fa fa-bug fa-lg\" style=\"color:darkgray\"></i> This document is best viewed with the \"Show Developer Info\" enabled above <i class=\"fa fa-bug fa-lg\" style=\"color:darkgray\"></i> &uarr;\n\n---\n\nWelcome! This notebook gives a quick overview of \"Observable Markdown\" a mashup of the excellent [Observable HQ](https://observablehq.com) + regular Markdown.  Here follows a quick introduction to Observable.  For a more technical introduction, see [Observable’s not JavaScript](/@observablehq/observables-not-javascript). For hands-on, see our [introductory tutorial series](/collection/@observablehq/introduction). To watch rather than read, see our [short introductory video](https://www.youtube.com/watch?v=uEmDwflQ3xE)!\n\nIts also very easy to embed a value:  **${i}** inside the Markdown!!!\n\nObservable Markdown consists of a single markdown document with live \"code\" sections.\n\n```\n2 * 3 * 7\n{\n  let sum = 0;\n  for (let i = 0; i <= 100; ++i) {\n    sum += i;\n  }\n  return sum;\n}\n```\n\nCells can have names. This allows a cell’s value to be referenced by other cells.\n\n```\ncolor = \"red\";\n`My favorite color is ${color}.`\n```\n\nA cell referencing another cell is re-evaluated automatically when the referenced value changes. Try editing the definition of color above and shift-return to re-evaluate.\n\nCells can generate DOM (HTML, SVG, Canvas, WebGL, etc.). You can use the standard DOM API like document.createElement, or use the built-in html tagged template literal:\n\n```\nhtml`<span style=\"background:yellow;\">\n  My favorite language is <i>HTML</i>.\n</span>`\n```\n\nThere’s a Markdown tagged template literal, too. (This notebook is written in Markdown.)\n\n```\nmd`My favorite language is *Markdown*.`\n```\n\nDOM can be made reactive simply by referring to other cells. The next cell refers to color. (Try editing the definition of color above.)\n\n```\nhtml`My favorite color is <i style=\"background:${color};\">${color}</i>.`\n```\n\nSometimes you need to load data from a remote server, or compute something expensive in a web worker. For that, cells can be defined asynchronously using [promises](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Using_promises):\n\n```\nstatus = new Promise(resolve => {\n  setTimeout(() => {\n    resolve({resolved: new Date});\n  }, 2000);\n})\n```\n\nA cell that refers to a promise cell sees the value when it is resolved; this implicit await means that referencing cells don’t care whether the value is synchronous or not. Edit the status cell above to see the cell below update after two seconds.\n\n```\nstatus\n```\n\nPromises are also useful for loading libraries from npm. Below, require returns a promise that resolves to the d3-fetch library:\n\n```\nd3 = require(\"d3-fetch@1\")\n```\n\nIf you prefer, you can use async and await explicitly (not this ):\n\n```\ncountries = (await d3.tsv(\"https://cdn.jsdelivr.net/npm/world-atlas@1/world/110m.tsv\"))\n    .sort((a, b) => b.pop_est - a.pop_est) // Sort by descending estimated population.\n    .slice(0, 10) // Take the top ten.\n```\n\nCells can be defined as [generators](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators); a value is yielded up to sixty times a second.\n\n```\ni = {\n  let i = 0;\n  while (true) {\n    yield ++i;\n  }\n}\n`The current value of i is ${i}.`\n```\n\nAny cell that refers to a generator cell sees its current value; the referencing cell is re-evaluated whenever the generator yields a new value. As you might guess, a generator can yield promises for [async iteration](https://github.com/tc39/proposal-async-iteration); referencing cells see the current resolved value.\n\n```\ndate = {\n  while (true) {\n    yield new Promise(resolve => {\n      setTimeout(() => resolve(new Date), 1000);\n    });\n  }\n}\n```\n\nCombining these primitives—promises, generators and DOM—you can build custom user interfaces. Here’s a slider and a generator that yields the slider’s value:\n\n```\nslider = html`<input type=range>`\nsliderValue = Generators.input(slider)\n```\n\nGenerators.input returns a generator that yields promises. The promise resolves whenever the associated input element emits an input event. You don’t need to implement that generator by hand, though. There’s a builtin viewof operator which exposes the current value of a given input element:\n\n```\nviewof value = html`<input type=range>`\nvalue\n```\n\nYou can import cells from other notebooks. To demonstrate how custom user interfaces can expose arbitrary values to other cells, here’s a brushable scatterplot of cars showing the inverse relationship between horsepower and fuel efficiency.\n\n```\nimport {viewof selection as cars} from \"@d3/brushable-scatterplot\";\nviewof cars;\ncars\n```\n",
        "Hello World": "# Hello World - ${mol}!\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n* <i class=\"fa fa-arrow-right fa-lg\" style=\"color:darkgray\"></i> - Render Page (`ctrl+s`)\n* <i class=\"fa fa-bug fa-lg\" style=\"color:darkgray\"></i> - Show Developer Info - _the live code values_.\n* <i class=\"fa fa-code fa-lg\" style=\"color:darkgray\"></i> - Show Code Inline - _the code which is creating the live values_.\n* Samples Drop Down - _expect frequent updates, while the plugins get updated with new functionality_\n\nVery Quick Start:\n1. Edit the Markdown on the left\n2. Click the \"Render\" <i class=\"fa fa-arrow-right fa-lg\" style=\"color:darkgray\"></i> button (or press `Ctrl+S`).\n3. Explore the samples in the drop down (top right).\n\n```\nmol = 6 * 7;  // mol - get it?\n```\n",
        "Import": "# Imports\n\n_A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\nLibraries can be imported directly from [ObservableHQ](https://observablehq.com/)\n\n```\nimport {viewof selection as cars} from \"@d3/brushable-scatterplot\"\nviewof cars\nsel = JSON.stringify(cars, undefined, 2)\n```\n### Selection:\n```json\n${sel}\n```\n",
        "Inline Editor Demo": "# Inline Editor Demo\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n* Full list of editors:\n${mdFormatted}\n\n```\nmdFormatted = Object.keys(editor).map(k => \"  * \" + k).join(\"\\n\");\n```\n\n---\n\n## ECL Editor\n_Creating widgets is always broken into two steps, this allows the content of the widget to be modified, without re-rendering the entire widget_\n\n```javascript\n// First Create ECL Editor instance\nviewof eclEditor = editor.ecl();\n\n// Next assign some text:\nviewof eclEditor.text(`a := 'aaa';`)\n\n// The current content will always be available in \"eclEditor\"\neclEditor;\n\n```\n\n```\n// First Create ECL Editor instance\nviewof eclEditor = editor.ecl();\n\n// Next assign some text:\nviewof eclEditor.text(`a := 'aaa';\\n//  TYPE HERE NOW!!!`)\n\n// The current content will always be available in \"eclEditor\"\neclEditor;\n```\nTotal characters Entered = ${eclEditor.length}.\n\n...and the actual text:\n\n```ecl\n${eclEditor}\n```\n\n---\n\n## JavaScript\n_A Javascript Editor_\n\n```\nfunction add(a, b) {\n  return a + b;\n}\nviewof js = editor.javascript();\nviewof js.text(`function add(a, b) {\n  return a + b;\n}\n\nadd(40, 2);\n`);\n```\n\n",
        "Markdown Quick Reference": "Markdown Quick Reference\n========================\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\nThis guide is a very brief overview, with examples, of the syntax that [Markdown] supports.  It is itself written in Markdown and you can copy the samples over to the left-hand pane for experimentation.  It's shown as *text* and not *rendered HTML*.\n\n[Markdown]: http://daringfireball.net/projects/markdown/\n\n\nSimple Text Formatting\n======================\n\nFirst thing is first.  You can use *stars* or _underscores_ for italics.  **Double stars** and __double underscores__ do bold.  ***Three together*** do ___both___.\n\nParagraphs are pretty easy too.  Just have a blank line between chunks of text.\n\n> This chunk of text is in a block quote.  Its multiple lines will all be\n> indended a bit from the rest of the text.\n>\n> > Multiple levels of block quotes also work.\n\nSometimes you want to include some code, such as when you are explaining how `<h1>` HTML tags work, or maybe you are a programmer and you are discussing `someMethod()`.\n\nIf you want to include some code and have\nnewlines preserved, indent the line with a tab\nor at least four spaces.\n    Extra spaces work here too.\nThis is also called preformatted text and it is useful for showing examples.\nThe text will stay as text, so any *markdown* or <u>HTML</u> you add will\nnot show up formatted.  This way you can show markdown examples in a\nmarkdown document.\n\n>     You can also use preformatted text with your blockquotes\n>     as long as you add at least five spaces.\n\n\nHeadings\n========\n\nThere are a couple of ways to make headings.  Using three or more equals signs on a line under a heading makes it into an \"h1\" style.  Three or more hyphens under a line makes it \"h2\" (slightly smaller).  You can also use multiple pound symbols before and after a heading.  Pounds after the title are ignored.  Here's some examples:\n\nThis is H1\n==========\n\nThis is H2\n----------\n\n# This is H1\n## This is H2\n### This is H3 with some extra pounds ###\n#### You get the idea ####\n##### I don't need extra pounds at the end\n###### H6 is the max\n\n\nLinks\n=====\n\nLet's link to a few sites.  First, let's use the bare URL, like <http://www.github.com>.  Great for text, but ugly for HTML.\nNext is an inline link to [Google](http://www.google.com).  A little nicer.\nThis is a reference-style link to [Wikipedia] [1].\nLastly, here's a pretty link to [Yahoo].  The reference-style and pretty links both automatically use the links defined below, but they could be defined *anywhere* in the markdown and are removed from the HTML.  The names are also case insensitive, so you can use [YaHoO] and have it link properly.\n\n[1]: http://www.wikipedia.org/\n[Yahoo]: http://www.yahoo.com/\n\nTitle attributes may be added to links by adding text after a link.\nThis is the [inline link](http://www.bing.com \"Bing\") with a \"Bing\" title.\nYou can also go to [W3C] [2] and maybe visit a [friend].\n\n[2]: http://w3c.org (The W3C puts out specs for web-based things)\n[Friend]: http://facebook.com/ \"Facebook!\"\n\nEmail addresses in plain text are not linked: test@example.com.\nEmail addresses wrapped in angle brackets are linked: <test@example.com>.\nThey are also obfuscated so that email harvesting spam robots hopefully won't get them.\n\n\nLists\n=====\n\n* This is a bulleted list\n* Great for shopping lists\n- You can also use hyphens\n+ Or plus symbols\n\nThe above is an \"unordered\" list.  Now, on for a bit of order.\n\n1. Numbered lists are also easy\n2. Just start with a number\n3738762. However, the actual number doesn't matter when converted to HTML.\n1.  This will still show up as 4.\n\nYou might want a few advanced lists:\n\n- This top-level list is wrapped in paragraph tags\n- This generates an extra space between each top-level item.\n\n- You do it by adding a blank line\n\n- This nested list also has blank lines between the list items.\n\n- How to create nested lists\n1.  Start your regular list\n2.  Indent nested lists with four spaces\n3.  Further nesting means you should indent with four more spaces\n    * This line is indented with eight spaces.\n\n- List items can be quite lengthy.  You can keep typing and either continue\nthem on the next line with no indentation.\n\n- Alternately, if that looks ugly, you can also\nindent the next line a bit for a prettier look.\n\n- You can put large blocks of text in your list by just indenting with four spaces.\n\nThis is formatted the same as code, but you can inspect the HTML\nand find that it's just wrapped in a `<p>` tag and *won't* be shown\nas preformatted text.\n\nYou can keep adding more and more paragraphs to a single\nlist item by adding the traditional blank line and then keep\non indenting the paragraphs with four spaces.  You really need\nto only indent the first line, but that looks ugly.\n\n- Lists support blockquotes\n\n> Just like this example here.  By the way, you can\n> nest lists inside blockquotes!\n> - Fantastic!\n\n- Lists support preformatted text\n\n        You just need to indent eight spaces.\n\n\nEven More\n=========\n\nHorizontal Rule\n---------------\n\nIf you need a horizontal rule you just need to put at least three hyphens, asterisks, or underscores on a line by themselves.  You can also even put spaces between the characters.\n\n---\n****************************\n_ _ _ _ _ _ _\n\nThose three all produced horizontal lines.  Keep in mind that three hyphens under any text turns that text into a heading, so add a blank like if you use hyphens.\n\nImages\n------\n\nImages work exactly like links, but they have exclamation points in front.  They work with references and titles too.\n\n![Google Logo](http://www.google.com/images/errors/logo_sm.gif) and ![Happy].\n\n[Happy]: https://s.gravatar.com/avatar/3c5e768a35943391075225aea03443a3?size=64&default=retro (\"Smiley face\")\n\n\nInline HTML\n-----------\n\nIf markdown is too limiting, you can just insert your own <strike>crazy</strike> HTML.  Span-level HTML <u>can *still* use markdown</u>.  Block level elements must be separated from text by a blank line and must not have any spaces before the opening and closing HTML.\n\n<div style='font-family: \"Comic Sans\", sans-serif;'>\nIt is a pity, but markdown does **not** work in here for most markdown parsers.  [Marked] handles it pretty well.\n</div>\n",
        "Observable's not JavaScript": "# Observable’s not JavaScript\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n---\n&uarr; <i class=\"fa fa-bug fa-lg\" style=\"color:darkgray\"></i> This document is best viewed with the \"Show Developer Info\" enabled above <i class=\"fa fa-bug fa-lg\" style=\"color:darkgray\"></i> &uarr;\n\n---\n\nAt first glance, Observable appears to be vanilla JavaScript. This is intentional: by building on the native language of the web, Observable is more familiar and you can use the libraries you know and love, such as D3, Three, and TensorFlow. Yet for [dataflow](/@observablehq/how-observable-runs), Observable needed to change JavaScript in a few ways.\n\nHere’s a quick overview of what’s different.\n\n(We’ve also shared our [grammar](/@observablehq/observable-grammar) and [parser](https://github.com/observablehq/parser).)\n\n### Cells are separate scripts.\n\nEach cell in a notebook is a separate script that runs independently. A syntax error in one cell won’t prevent other cells from running.\n\n```\nThis is English, not JavaScript.\n```\n\nSame with a runtime error.\n\n```\n{ throw new Error(\"oopsie\"); }\n```\n\nLikewise, local variables are only visible to the cell that defines them.\n\n```\n{ var local = \"I am a local variable.\"; }\n```\n\n### Cells run in topological order.\n\nIn vanilla JavaScript, code runs from top to bottom. Not so here; Observable runs [like a spreadsheet](/@observablehq/how-observable-runs), so you can define your cells in whatever order makes sense.\n\n```\na + 2 // a is defined below\n```\n\n```\na = 1\n```\n\nBy extension, circular definitions are not allowed.\n\n```\nc1 = c2 - 1\n```\n\n```\nc2 = c1 + 1\n```\n\n### Cells re-run when any referenced cell changes.\n\nYou don’t have to run cells explicitly when you edit or interact—the notebook updates automatically. Run the cell below by clicking the play button <svg width=\"16\" height=\"16\" class=\"db bump\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\" fill=\"none\"><path d=\"M4 3L12 8L4 13Z\"></path></svg>, or by focusing and hitting Shift-Enter. Only the referencing cells run, then *their* referencing cells, and so on—other cells are unaffected.\n\n```\nb = Math.random()\n```\n\n```\nb * b // updates automatically!\n```\n\nIf a cell allocates resources that won’t be automatically cleaned up by the garbage collector, such as an animation loop or event listener, use the [invalidation promise](/@observablehq/invalidation) to dispose of these resources manually and avoid leaks.\n\n```\n{ invalidation.then(() => console.log(\"I was invalidated.\")); }\n```\n\n### Cells implicitly await promises.\n\nYou can define a cell whose value is a promise.\n\n```\nhello = new Promise(resolve => {\n  setTimeout(() => {\n    resolve(\"hello there\");\n  }, 30000);\n})\n```\n\nIf you reference such a cell, you don’t need to await; the referencing cell won’t run until the value resolves.\n\n```\nc = {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n```\n\n```\nc\n```\n\nAlso, yields occur no more than once every animation frame: typically sixty times a second, which makes generators handy for [animation](/@mbostock/animation-loops). If you yield a DOM element, it will be added to the DOM before the generator resumes.\n\n### Named cells are declarations, not assignments.\n\nNamed cells look like, and function *almost* like, assignment expressions in vanilla JavaScript. But cells can be defined in any order, so think of them as hoisted function declarations.\n\n```\nfoo = 2\n```\n\nYou can’t assign the value of another cell (though see mutables below).\n\n```\n{ foo = 3; } // not allowed\n```\n\nCell names must also be unique. If two or more cells share the same name, they will all error.\n\n```\ndup = 1\n```\n\n```\ndup = 2\n```\n\n(Observable doesn’t yet support destructuring assignment to declare multiple names, but we hope to add that soon.)\n\n### Statements need curly braces, and return (or yield).\n\nA cell body can be a simple expression, such as a number or string literal, or a function call. But sometimes you want statements, such as for loops. For that you’ll need curly braces, and a return statement to give the cell a value. Think of a cell as a function, except the function has no arguments.\n\n```\n{\n  let sum = 0;\n  for (let i = 0; i < 10; ++i) {\n    sum += i;\n  }\n  return sum;\n}\n```\n\nFor the same reason, you’ll need to wrap object literals in parentheses, or use a block statement with a return.\n\n```\nlabel = {foo: \"bar\"}\n```\n\n```\nblock = { return {foo: \"bar\"}; }\n```\n\n### Cells can be views.\n\nObservable has a special [`viewof` operator](https://observablehq.com/@observablehq/introduction-to-views) which lets you define interactive values. A view is a cell with two faces: its user interface, and its programmatic value. Try editing the input below, and note that the referencing cell runs automatically.\n\n```\nviewof text = html`<input value=\"edit me\">`\n```\n\n```\ntext\n```\n\n### Cells can be mutables.\n\nObservable has a special [`mutable` operator](/@observablehq/introduction-to-mutable-state) so you can opt-in to mutable state: you can set the value of a mutable from another cell.\n\n```\nmutable thing = 0\n```\n\n```\n++mutable thing // mutates thing\n```\n\n### Observable has a standard library.\n\nObservable provides a small [standard library](https://github.com/observablehq/stdlib/blob/master/README.md) for essential features, such as Markdown tagged template literals and reactive width.\n\n```\nmd`Hello, I’m *Markdown*!`\n```\n\n### Static ES imports are not supported; use dynamic imports.\n\nSince everything in Observable is inherently dynamic, there’s not really a need for static ES imports—though, we might add support in the future. Note that only the most-recent browsers support dynamic imports, so you might consider using require for now.\n\n```\n_ = import(\"https://cdn.pika.dev/lodash-es/v4\")\n```\n\n```\n_.camelCase(\"lodash was here\")\n```\n\n### require is AMD, not CommonJS.\n\n[Observable’s require](/@observablehq/introduction-to-require) looks a lot like CommonJS because cells implicitly await promises. But under the hood it uses the [Asynchronous Module Definition (AMD)](https://requirejs.org/docs/whyamd.html). This convention will eventually be replaced with modern ES modules and imports, but it’s still useful for the present as many library authors are not yet shipping ES modules.\n\nWe recommend pinning major versions.\n\n```\nd3 = require(\"d3@5\")\n```\n",
        "Roxie Demo": "# Roxie Demo\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n## Calling a Roxie Service\n_For this example we will be calling the following Roxie Service_\n\n* **baseUrl:**  \"${baseUrl}\"\n* **querySet:**  \"${querySet}\"\n* **querID:**  \"${queryID}\"\n\n```\n//  Initialize Target\nbaseUrl = \"https://play.hpccsystems.com:18002\";\nquerySet = \"roxie\";\nqueryID = \"covid19_by_us_states\";\n\n//  Initialize Roxie\nr = roxie(\"https://play.hpccsystems.com:18002\");\nq = r.query(\"roxie\", \"covid19_by_countries\");\nrequestFields = q.requestFields();\nresponseFields = q.responseFields();\n```\n\nOnce connected to the server we can query the service for its request/response schemas:\n\n* Request Schema: \n```json\n${JSON.stringify(requestFields, undefined, \"    \")}\n```\n\n* Response Schema:\n```json\n${JSON.stringify(responseFields, undefined, \"    \")}\n```\n\nAt which point we can make some actual REST requests:\n\n```javascript\nq.submit({\n    countriesfilter: \"FRANCE\"\n});\n```\n\n```\nresponse = q.submit({\n    countriesfilter: \"FRANCE\"\n});\n```\n\nActual Response:\n```json\n${JSON.stringify(response, undefined, \"    \")} \n```\n",
        "Workunit Demo": "# Workunit Demo\n\n_ A [@hpcc-js/observable-md](https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md) demo..._\n\n## Attach to a WU on a HPCC-Platform \n* **Platform**:  ${platform.url} \n* **WU**: ${wu.wuid}\n* **Result Count**: ${results.length}\n* **Result Names**:\n${fromattedResults}\n\n```\nplatform = esp(\"https://play.hpccsystems.com:18010\");\nwu = platform.wu(\"W20200328-033611\");\nresults = wu.results();\nfromattedResults = results.map(r => `  * ${r.name}\\n`);\n```\n\nIts easy to browse the first result **`${results[0].name}`**:\n```\nresults[0].table(); \n```\n"
    };
});
//# sourceMappingURL=samples.js.map