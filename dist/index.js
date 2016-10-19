'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tagStripSerializer = function tagStripSerializer(element, content) {
  return (0, _striptags2.default)(content);
};

exports.default = function (prismic) {
  return {
    getImage: function getImage(image) {
      return prismic.getImage(image) && prismic.getImage(image).main;
    },
    getText: function getText(text) {
      return prismic.getText(text) || '';
    },
    getStructuredText: function getStructuredText(text, htmlSerializer) {
      return prismic.getStructuredText(text) && prismic.getStructuredText(text).asHtml({}, htmlSerializer) || '';
    },
    getCleanStructuredText: function getCleanStructuredText(text) {
      return prismic.getStructuredText(text) && prismic.getStructuredText(text).asHtml({}, tagStripSerializer) || '';
    },
    getColor: function getColor(color) {
      return prismic.getColor(color) || '#000';
    },
    getSlices: function getSlices(slices) {
      return prismic.getSliceZone(slices) ? prismic.getSliceZone(slices).slices : [];
    },
    getGroup: function getGroup(group) {
      return prismic.getGroup(group) ? prismic.getGroup(group).toArray() : [];
    },
    getLink: function getLink(link) {
      return prismic.getLink(link) ? prismic.getLink(link).value.url : '';
    },
    getSelect: function getSelect(select) {
      return prismic.fragments[select] ? prismic.fragments[select].value : '';
    },
    getEmbed: function getEmbed(embed) {
      var video = prismic.get(embed);
      return video ? video.asHtml() : '';
    }
  };
};