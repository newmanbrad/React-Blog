import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? renderToString(component) : '';

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="//cdn.quilljs.com/0.20.1/quill.snow.css" />
          
          <link rel="stylesheet" href="../../../../node_modules/font-awesome/css/font-awesome.min.css"/>
              
          {DocumentMeta.renderAsReact()}
          {/* OVERRIDE Styles - styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div style={{display: 'none'}} dangerouslySetInnerHTML={{__html:
            `<!--[if lt IE 9]>
              <script src="/static/scripts/html5.js"></script>
              <script src="/static/scripts/css3-mediaqueries.min.js"></script>
            <![endif]-->`
          }} />
          <div id="app" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}/>
          {Object.keys(assets.javascript).map((script, key) =>
            <script src={assets.javascript[script]} key={key}/>
          )}
        </body>
      </html>
    );
  }
}
