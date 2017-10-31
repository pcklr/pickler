import acorn from 'acorn-jsx';

const commentHandler = comments => (block, text, start, end, loc, range) => {
  if (text.match(/^\s*\ud83e\udd52/)) {
    const comment = text.replace(/^\s*\ud83e\udd52/, '');
    comments.push({ comment, start, end, loc });
  }
};

const formatGherkin = gherkin => {
  const doc = [];
  const indent = '  ';
  let i = 0;
  return gherkin.map(statement => {
    if (statement.comment.match(/^\s*Feature:/)) {
      i = i ? --i : 0;
      return `\n\n${indent.repeat(i++)}${statement.comment}`;
    } else if (statement.comment.match(/^\s*Scenario:/)) {
      i = i ? --i : 0;
      return `\n${indent.repeat(i++)}${statement.comment}`;
    } else {
      return `\n${indent.repeat(i ? i : 0)}${statement.comment}`;
    }
  });
};

export default function pickler( input, output ) {
  const comments = [];
  const ast = acorn.parse(input, {
    locations: true,
    onComment: commentHandler(comments),
    ranges: true,
    plugins: { jsx: true }
  });

  return formatGherkin(comments);
}
