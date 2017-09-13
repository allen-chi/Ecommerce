import * as jsdom from 'jsdom';

process.env.NODE_ENV = 'test';
const globalAny: any = global;
const dom = new jsdom.JSDOM('');
const exposedProperties = ['window', 'navigator', 'document'];

globalAny.document = dom.window.document;
globalAny.window = document.defaultView;
globalAny.navigator = globalAny.window.navigator;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

require.extensions['.css'] = () => {return;};
require.extensions['.jpg'] = () => {return;};
require.extensions['.png'] = () => {return;};
require.extensions['.scss'] = () => {return;};
require.extensions['.md'] = () => {return;};
require.extensions['.svg'] = () => {return;};
require.extensions['.jpeg'] = () => {return;};
require.extensions['.gif'] = () => {return;};
