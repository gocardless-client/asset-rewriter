'use strict';

var _ = require('lodash');
var fileMatches = require('file-matches');
var url = require('url');
var path = require('path');

/**
 * AssetRewriter
 * @param {Object=} options Rewrite options
 */
function AssetRewriter(options) {
  /* @type {Object.<string>} */
  this.options = _.extend({
    src: '',
    dest: '',
    server: ''
  }, options);
}

var fn = AssetRewriter.prototype;

/**
 * Replaces .scss with .css
 * @param  {String} filepath
 * @return {String}
 */
fn.sassToCss = function sassToCss(filepath) {
  return filepath.replace(fileMatches.scss.match, fileMatches.css.ext);
};

/**
 * Replaces .html.js with .html
 * @param  {String} filepath
 * @return {String}
 */
fn.htmlToTemlate = function htmlToTemlate(filepath) {
  return filepath.replace(fileMatches.html.match, fileMatches.template.ext);
};

/**
 * Replaces src with dest
 * @param  {String} filepath
 * @return {String}
 */
fn.assetBuildDest = function assetBuildDest(filepath) {
  return filepath.replace(
    _.result(this.options, 'src'), _.result(this.options, 'dest')
  );
};

/**
 * Strips src and prepends server
 * @param  {String} filepath
 * @param  {Object=} options
 * @return {String}
 */
fn.assetServerDest = function assetServerDest(filepath, options) {
  options = _.defaults({}, options, {
    prependPrefix: '',
    stripPrefix: _.result(this.options, 'src')
  });

  var stripPrefix = new RegExp('^' + options.stripPrefix);
  filepath = filepath.replace(stripPrefix, '');
  if (url.parse(options.prependPrefix).protocol) {
    return url.resolve(options.prependPrefix, filepath);
  } else {
    return path.join(options.prependPrefix, filepath);
  }
};

module.exports = AssetRewriter;
