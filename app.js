let editorElement = document.getElementById('editor');
let previewElement = document.getElementById("preview");
let expandButtons = document.querySelectorAll('.expandButton');

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

editorElement.value = placeholder;

marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  });

/**
 * Parse all the Markdown
 * Render the parsed string
 * 
 * @param {*} content 
 * @returns 
 */
const parseMarkdown = (content) => previewElement.innerHTML = marked.parse(content);

// Parse the content
// Of the textarea
// Om page load
parseMarkdown(editorElement.value);

// Parse the markdown
// Each time someone type into the textarea
editorElement.addEventListener('keyup', (e) => { parseMarkdown(editorElement.value); });

// Maximize
// The sections
expandButtons.forEach(button => {

    button.addEventListener('click', (e) => {
      
      let target = e.currentTarget;
      let targetClassess = target.classList;
      
      targetClassess.contains("fa-compress") ? targetClassess.replace("fa-compress", "fa-arrows-alt") : targetClassess.replace("fa-arrows-alt", "fa-compress");
      
      let parentTarget = target.parentNode.parentNode.querySelector('.to-maximized');
  
      parentTarget.classList.toggle('maximized');
      
      parentTarget === previewElement ? document.querySelector('.section-editor').classList.toggle('hide') : document.querySelector('.section-preview').classList.toggle('hide');
    });

});