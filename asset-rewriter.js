'use strict';

var _ = require('lodash');
var fileMatches = require('file-matches');

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
  options = _.extend({
    prependPrefix: '',
    stripPrefix: _.result(this.options, 'src')
  }, options);

  var stripPrefix = new RegExp('^' + options.stripPrefix);
  return options.prependPrefix + filepath.replace(stripPrefix, '');
};

module.exports = AssetRewriter;
