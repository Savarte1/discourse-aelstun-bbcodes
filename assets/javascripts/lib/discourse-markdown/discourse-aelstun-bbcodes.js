function setupMarkdownIt(md){
    const inline_ruler = md.inline.bbcode.ruler;
    const block_ruler = md.block.bbcode.ruler;

    block_ruler.push('box', {
        tag: 'box',
        wrap: 'div.af-box'
    });

    inline_ruler.push('nation', {
        tag: 'nation',
        wrap: function(startToken, endToken, tagInfo, content) {
           const url = (content).trim();
           startToken.type = 'link_open';
           startToken.tag = 'a';
           startToken.attrs = [['href', 'https://www.nationstates.net/nation=' + url], ['data-bbcode', 'true']];
           startToken.content = '';
           startToken.nesting = 1;

           endToken.type = 'link_close';
           endToken.tag = 'a';
           endToken.content = '';
           endToken.nesting = -1;
        }
    });

    inline_ruler.push('region', {
        tag: 'region',
        wrap: function(startToken, endToken, tagInfo, content) {
           const url = (content).trim();
           startToken.type = 'link_open';
           startToken.tag = 'a';
           startToken.attrs = [['href', 'https://www.nationstates.net/region=' + url], ['data-bbcode', 'true']];
           startToken.content = '';
           startToken.nesting = 1;

           endToken.type = 'link_close';
           endToken.tag = 'a';
           endToken.content = '';
           endToken.nesting = -1;
        }
    });

    inline_ruler.push('align', {
        tag: 'align',
        wrap: function(startToken, endToken, tagInfo) {
            const align = (tagInfo.attrs['_default']).trim();
            startToken.type = 'align_open';
            startToken.tag = 'div';
            startToken.attrs = [["style", "text-align:" + align]];
            startToken.content = '';
            startToken.nesting = 1;

            endToken.type = 'align_close';
            endToken.tag = 'div';
            endToken.content = '';
            endToken.nesting = -1;
        }
    });

    md.core.textPostProcess.ruler.push('hr', {
        matcher: /(\[hr\])/,
        onMatch: function(buffer, matches, state) {
            let token = new state.Token('hr_inline', 'hr', 0);
            buffer.push(token);
        }
    });

}

export function setup(helper) {
    if(!helper.markdownIt) { return; }

    helper.registerOptions((opts) => {
        opts.features["aelstun-bbcodes"] = true;
    });

    helper.allowList([
        'div.af-box',
        'hr',
    ]);

    helper.registerPlugin(setupMarkdownIt);
}
