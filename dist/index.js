'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    }
  };
};