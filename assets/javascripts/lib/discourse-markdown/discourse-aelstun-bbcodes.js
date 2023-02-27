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
           const url = (tagInfo.attrs['_default'] || content).trim();
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
           const url = (tagInfo.attrs['_default'] || content).trim();
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

}

export function setup(helper) {
    if(!helper.markdownIt) { return; }

    helper.registerOptions((opts, siteSettings) => {
        opts.features["aelstun-bbcodes"] = !!siteSettings.enable_aelstun_bbcodes;
    });

    helper.allowList([
        'div.af-box'
    ]);

    helper.registerPlugin(setupMarkdownIt);
}
