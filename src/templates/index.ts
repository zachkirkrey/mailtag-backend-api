import fs from 'fs';
import Mustache from 'mustache';
import pathMapping from './pathMapping';

const configData = '';

const renderEngine = (template, variables) => {
  return Mustache.render(fs.readFileSync(pathMapping(template)).toString(), variables);
};

function renderMeta(meta) {
  return renderEngine('meta.mustache', meta);
}

function renderScript(script) {
  return renderEngine('script.mustache', script);
}

function renderStyle(style) {
  return renderEngine('style.mustache', style);
}

function renderHeader(header) {
  return renderEngine('header.mustache', header);
}

function renderFooter(footer) {
  return renderEngine('footer.mustache', footer);
}

function renderContent(contentTemplateName, content) {
  return renderEngine(`${contentTemplateName}.mustache`, configData + content);
}

function renderHidden(hidden) {
  return renderEngine('hidden.mustache', hidden);
}

function renderPage(contentTemplateName, layout) {
  return renderEngine('layout.mustache', {
    meta: renderMeta(layout['meta']),
    style: renderStyle(layout['style']),
    script: renderScript(layout['script']),
    header: renderHeader(layout['header']),
    content: renderContent(contentTemplateName, layout['content']),
    footer: renderFooter(layout['footer']),
  });
}
function renderHomePage(data) {
  return renderEngine('home.mustache', configData + data);
}

export default {
  renderPage,
  renderContent,
  renderHidden,
  renderHomePage,
};
